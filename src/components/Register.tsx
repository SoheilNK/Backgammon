import React from "react";
import { cognitoLoginUrl, clientId } from "../../cognitoConfig";
import {myApi} from "../services/user.service"
import { useNavigate } from "react-router-dom";




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
    // const url = `${cognitoLoginUrl}/login?response_type=code&client_id=${clientId}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=${window.location.origin}`;
    // console.log(url);
    // alert(url);
    window.location.href = `${cognitoLoginUrl}/login?response_type=code&client_id=${clientId}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=http://localhost:5173/Backgammon`;
    // window.location.href =
    //   `https://sosepbackgammon.auth.ca-central-1.amazoncognito.com/login?response_type=code&client_id=35r5v11v77trsrts6b7lmebupn&redirect_uri=http://localhost:5173/Backgammon/signup&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
  };

  // document.querySelector("#loginButton")?.addEventListener("click", () => {
  //   redirectToLogin();
  // });

  const init = async (tokens: any): Promise<void> => {
    // console.log(tokens);
    const access_token = tokens.access_token;
    let apiResp: any;
    try {
      const response = await myApi.get("/user");
      // console.log(response);
      apiResp = response.data;
      // console.log(apiResp);

      if (apiResp.id) {
        console.log(`You are signed in as ${apiResp.username}`); //review
        localStorage.setItem("user", JSON.stringify(apiResp.username));
        // setMessage(`You are signed in as ${apiResp.username}`);
        // redirect to home page
        // navigate("/");
        // reload page
        window.location.href = "http://localhost:5173/Backgammon";
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
      //if user not found in db, redirect to signup page
      if (error.request.response.includes("User not found")) {
        console.log("User not found");
        localStorage.removeItem("tokens");

        // setMessage("User not found");
        // redirect to signup page
        // window.location.href = "http://localhost:5173/Backgammon/signup";
      }

      //use refresh token to get new access token
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
        // redirect_uri: window.location.origin,
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
