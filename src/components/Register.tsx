import { cognitoLoginUrl, clientId } from "../../cognitoConfig";
import axios from "axios";
//creat new axios instance
const axoisApi = axios.create({
  baseURL: "http://localhost:8000/api/user",
  headers: {
    "Content-Type": "application/json",
  },
});
//set up axiosApi interceptors to add the token to the request and refresh the token if it is expired
axoisApi.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
  // (error) => {
  //   return Promise.reject(error);
  // }
);
//get the access token from the local storage
const getAccessToken = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return null;
  }
  const { exp } = JSON.parse(atob(token.split(".")[1]));
  if (Date.now() >= exp * 1000) {
    return null;
  }
  return token;
}
//refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    return null;
  }
  const { exp } = JSON.parse(atob(refreshToken.split(".")[1]));
  if (Date.now() >= exp * 1000) {
    return null;
  }
  const { data } = await axoisApi.post("/refresh", { refresh_token: refreshToken });
  localStorage.setItem("access_token", data.access_token);
  return data.access_token;
}
//get the user from the local storage
const getUser = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }
  return JSON.parse(user);
}
//set the user to the local storage
const setUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
}
//remove the user from the local storage
const removeUser = () => {
  localStorage.removeItem("user");
}
//remove the access token from the local storage
const removeAccessToken = () => {
  localStorage.removeItem("access_token");
}
//remove the refresh token from the local storage 
const removeRefreshToken = () => {
  localStorage.removeItem("refresh_token");
}
//remove the user and the tokens from the local storage
const logout = () => {  
  removeUser();
  removeAccessToken();
  removeRefreshToken();
}
//login the user
const login = async (email: string, password: string) => {
  try {
    const { data } = await axoisApi.post("/login", { email, password });
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    setUser(data.user);
    return data.user;
  } catch (error) {
    return Promise.reject(error);
  }
}
//register the user
const register = async (email: string, password: string) => {
  try {
    const { data } = await axoisApi.post("/register", { email, password });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
//get the user profile
const getProfile = async () => {
  try {
    const { data } = await axoisApi.get("/profile");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
//update the user profile
const updateProfile = async (profile: any) => {
  try {
    const { data } = await axoisApi.put("/profile", profile);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
//delete the user profile
const deleteProfile = async () => {
  try {
    const { data } = await axoisApi.delete("/profile");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
//get the user friends  
const getFriends = async () => {
  try {
    const { data } = await axoisApi.get("/friends");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
//add a friend to the user friends
const addFriend = async (friendId: string) => {
  try {
    const { data } = await axoisApi.post("/friends", { friendId });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
//remove a friend from the user friends
const removeFriend = async (friendId: string) => {
  try {
    const { data } = await axoisApi.delete(`/friends/${friendId}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
//get the user friend requests
const getFriendRequests = async () => {
  try {
    const { data } = await axoisApi.get("/friend-requests");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
//send a friend request to a user
const sendFriendRequest = async (friendId: string) => {
  try {
    const { data } = await axoisApi.post("/friend-requests", { friendId });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
//accept a friend request from a user
const acceptFriendRequest = async (friendId: string) => {
  try {
    const { data } = await axoisApi.put("/friend-requests", { friendId });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
//reject a friend request from a user
const rejectFriendRequest = async (friendId: string) => {
  try {
    const { data } = await axoisApi.delete(`/friend-requests/${friendId}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}




const Register = async () => {
  const API_URL = "http://localhost:8000/api/user";

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
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      // console.log(response);
      apiResp = response.data;
      // console.log(apiResp);

      if (apiResp.isValid) {
        console.log(`You are signed in as ${apiResp.userName}`); //review
        localStorage.setItem("user", JSON.stringify(apiResp.userName));
        // setMessage(`You are signed in as ${apiResp.userName}`);
        // reload page
        window.location.href = "http://localhost:5173/Backgammon";
      } else {
        `Failed to get userid. Are you logged in with a valid token?`;
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
        window.location.href = "http://localhost:5173/Backgammon/signup";
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
