import { promisify } from 'util';
import * as Axios from 'axios';
import { Request, Response, NextFunction } from "express";
import * as jsonwebtoken from 'jsonwebtoken';
const jwkToPem = require('jwk-to-pem');
let memoizedVal: MapOfKidToPublicKey | undefined;
let callCounter: number = 1;

interface ClaimVerifyRequest {
    [x: string]: any;
    readonly token?: string;
}

interface ClaimVerifyResult {
    readonly userName: string;
    readonly isValid: boolean;
    readonly error?: any;
    readonly email: string;
}

interface TokenHeader {
    kid: string;
    alg: string;
}
interface PublicKey {
    alg: string;
    e: string;
    kid: string;
    kty: string;
    n: string;
    use: string;
}
interface PublicKeyMeta {
    instance: PublicKey;
    pem: string;
}

interface PublicKeys {
    keys: PublicKey[];
}

interface MapOfKidToPublicKey {
    [key: string]: PublicKeyMeta;
}

interface Claim {
    token_use: string;
    auth_time: number;
    iss: string;
    exp: number;
    username: string;
    client_id: string;
    email: string;
}



export const checkJwtCognito = async (request: ClaimVerifyRequest, res: Response, next: NextFunction) => {
    // console.log('checkJwtCognito middleware called')
    const cognitoPoolId = process.env.COGNITO_USER_POOL_ID || '';
    if (!cognitoPoolId) {
        throw new Error('env var required for cognito pool');
    }
    const cognitoIssuer = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${cognitoPoolId}`;

    const getPublicKeys = async (): Promise<MapOfKidToPublicKey> => {
        // console.log(`1- Checking cache for public keys..`);
        if (memoizedVal !== undefined) {
            // console.log('1- from cache')
            return memoizedVal
        } else {
            const url = `${cognitoIssuer}/.well-known/jwks.json`;
            // console.log(`2- Fetching public keys..`);
            const publicKeys = await Axios.default.get<PublicKeys>(url);

            memoizedVal = publicKeys.data.keys.reduce((agg, current) => {
                const pem = jwkToPem(current);
                agg[current.kid] = { instance: current, pem };
                return agg;
            }
                , {} as MapOfKidToPublicKey);
            // console.log(`3- memoizedVal is ${memoizedVal}`);
            return memoizedVal;
        }

    };

    const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));
    let result: ClaimVerifyResult;
    // console.log(` 0- Checking token..`);
    let email: string;
    try {
        const access_token = request.headers.authorization.split("Bearer ")[1];
        const access_tokenSections = (access_token || '').split('.');
        const x_id_token = request.headers.x_id_token;
        if (!x_id_token) {
            // console.log('x_id_token header not found');
        } else {
            // console.log(`x_id_token: ${x_id_token}`);
                    //isolate email from x_id_token
        const x_id_tokenSections = (x_id_token || '').split('.');
        const x_id_tokenJSON = Buffer.from(x_id_tokenSections[1], 'base64').toString('utf8');
        const x_id_tokenClaim = JSON.parse(x_id_tokenJSON) as Claim;
        // console.table(`x_id_tokenClaim: ${x_id_tokenClaim}`);
        email = x_id_tokenClaim.email;
        // console.log(`x_id_tokenClaim.email: ${email}`);
        }


        if (access_tokenSections.length < 2) {
            throw new Error('requested token is invalid');
        }
        const headerJSON = Buffer.from(access_tokenSections[0], 'base64').toString('utf8');
        const header = JSON.parse(headerJSON) as TokenHeader;

        // console.log(`Number of calls for public keys: ${callCounter}`);
        // console.time('call duration')
        const keys = await getPublicKeys();
        // console.timeEnd('call duration')
        callCounter++;

        const key = await keys[header.kid];
        if (key === undefined) {
            throw new Error('claim made for unknown kid');
        }
        const claim = await verifyPromised(access_token, key.pem) as Claim;
        const currentSeconds = Math.floor((new Date()).valueOf() / 1000);
        if (currentSeconds > claim.exp || currentSeconds < claim.auth_time - 5) {
            // console.log('currentSeconds: ', currentSeconds, 'claim.exp: ', claim.exp, 'claim.auth_time: ', claim.auth_time);
            throw new Error('claim is expired or invalid');
        }
        if (claim.iss !== cognitoIssuer) {
            throw new Error('claim issuer is invalid');
        }
        if (claim.token_use !== 'access') {
            throw new Error('claim use is not access');
        }
        // console.log(`claim confirmed for ${claim.username}`);
        result = { userName: claim.username, isValid: true, email: email };
        res.locals.result = result;

    } catch (error) {
        console.log(`error: ${error}`);
        res.status(401).send(`unauthorized ${error}`);
        return;

    }

    //Call the next middleware or controller
    next();

};



