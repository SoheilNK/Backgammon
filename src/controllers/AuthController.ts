import { Request, Response } from "express";
import {
  CognitoUserPool,
  CognitoUser,
  CognitoRefreshToken,
} from "amazon-cognito-identity-js";

// Assuming you have a Cognito configuration
const cognitoConfig = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  ClientId: process.env.COGNITO_CLIENT_ID,
};

export class AuthController {
  public async refreshTokens(req: Request, res: Response) {
    const refreshToken = req.body.refresh_token;
    //read the username from the  req.body
    const username = req.body.user_name;

    if (!refreshToken) {
      return res.status(400).send({ message: "Refresh token is required" });
    }

    const userPool = new CognitoUserPool(cognitoConfig);
    // // Assuming you have a way to retrieve the username associated with the refresh token
    // const username = "REPLACE_WITH_USERNAME"; // Replace this with actual username retrieval logic
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    const refreshCognitoToken = new CognitoRefreshToken({
      RefreshToken: refreshToken,
    });

    cognitoUser.refreshSession(refreshCognitoToken, (err, session) => {
      if (err) {
        console.error(err);
        if (err.code === "NotAuthorizedException") {
          return res.status(401).send({ message: "Refresh token has expired" });
        } else {
          return res.status(500).send({ message: "Failed to refresh tokens" });
        }
      }
      const tokens = {
        id_token: session.getIdToken().getJwtToken(),
        access_token: session.getAccessToken().getJwtToken(),
        refresh_token: session.getRefreshToken().getToken(),
      };
      return res.json(tokens);
    }
    );
  }

  //     const idToken = session.getIdToken().getJwtToken();
  //     const accessToken = session.getAccessToken().getJwtToken();
  //     const newRefreshToken = session.getRefreshToken().getToken();

  //     res.status(200).send({
  //       idToken,
  //       accessToken,
  //       refreshToken: newRefreshToken,
  //     });
  //   });
  // }

  // Other methods and actions of the AuthController can be added here
  // ...
}
