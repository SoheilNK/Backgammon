import { cognitoLoginUrl, clientId } from "../../cognitoConfig";
import {myApi} from "../services/user.service"
import { setUser } from "../services/user.service";




const Register = async () => {

  const sha256 = async (str: string): Promise<ArrayBuffer> => {
    return await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  };

  const generateNonce = async (): Promise<string> => {
    const hash = await sha256(
      crypto.getRandomValues(new Uint32Array(4)).toString()
    );
    const hashArray = Array.from(new Uint8Array(hash));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const base64URLEncode = (arrayBuffer: ArrayBuffer): string => {
    const uint8Array = new Uint8Array(arrayBuffer);
    const base64String = btoa(String.fromCharCode(...uint8Array));
    return base64String
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  const redirectToLogin = async (): Promise<void> => {
    const state = await generateNonce();
    const codeVerifier = await generateNonce();
    sessionStorage.setItem(`codeVerifier-${state}`, codeVerifier);
    const codeChallenge = base64URLEncode(await sha256(codeVerifier));
    window.location.href = `${cognitoLoginUrl}/login?response_type=code&client_id=${clientId}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=http://localhost:5173/Backgammon`;
  };

  const init = async (tokens: any): Promise<void> => {
    // console.log(tokens);
    const id_token = tokens.id_token;
    let apiResp: any;
    try {
      //send id_token in headers for one time to get user id
      myApi.defaults.headers.common["x_id_token"] = id_token;   
      const response = await myApi.get("/user");
      // console.log(response);
      apiResp = response.data;
      // console.log(apiResp);

      if (apiResp.id) {
        console.log(`You are signed in as ${apiResp.username}`); //review
        setUser(apiResp);
        //go to myprofile page
        window.location.href = "http://localhost:5173/Backgammon#/myprofile";
      } else {
        console.log(
          `Failed to get userid. Are you logged in with a valid token?`
        );
      }
    } catch (error: any) {
      // console.log(apiResp);
      console.log(error.request.response);
      // handle expired token
      if (error.request.response.includes("Access token has expired")) {
        console.log("Access token has expired");
        // setMessage("Access token has expired");
        localStorage.removeItem("tokens");
        // reload page
        window.location.href = "http://localhost:5173/Backgammon";
      }
    }
  };

  //------------------------------STARTS HERE-------------------------------------
  const searchParams = new URL(location.href).searchParams;

  if (searchParams.get("code") !== null) {
    window.history.replaceState({}, document.title, "/Backgammon/");
    const state = searchParams.get("state");
    const codeVerifier = sessionStorage.getItem(`codeVerifier-${state}`);
    sessionStorage.removeItem(`codeVerifier-${state}`);
    if (codeVerifier === null) {
      throw new Error("Unexpected code");
    }
    const res = await fetch(`${cognitoLoginUrl}/oauth2/token`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/x-www-form-urlencoded",
      }),
      body: Object.entries({
        grant_type: "authorization_code",
        client_id: clientId,
        code: searchParams.get("code")!,
        code_verifier: codeVerifier,
        redirect_uri: "http://localhost:5173/Backgammon",
      })
        .map(([k, v]) => `${k}=${v}`)
        .join("&"),
    });
    if (!res.ok) {
      throw new Error(await res.json());
    }
    const tokens = await res.json();
    localStorage.setItem("tokens", JSON.stringify(tokens));

    init(tokens);
  } else {
    if (localStorage.getItem("tokens")) {
      const tokens = JSON.parse(localStorage.getItem("tokens")!);
      init(tokens);
    } else {
      redirectToLogin();
    }
  }
};

export default Register;
