
import axios from "axios";
// import {
//   CognitoUser,
//   AuthenticationDetails,
//   CognitoUserPool,
// } from "amazon-cognito-identity-js";

//creat new axios instance
export const myApi = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
//set up axiosApi interceptors to add the token to the request and refresh the token if it is expired
myApi.interceptors.request.use(async (config) => {
  let token = await getAccessToken();
  if (isTokenExpired(token)) {
    console.log("token expired");
    
      token = await refreshAccessToken();
      localStorage.setItem("access_token", token);
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("no token");
    console.log("user is not logged in");
    delete config.headers.Authorization;
  }
  return config;
});

//Check Token Expiry Before Making a Request
function isTokenExpired(token: string): boolean {
  const { exp } = JSON.parse(atob(token.split(".")[1]));
  return Date.now() >= exp * 1000;
}

//refresh the access token
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
      console.log("no refresh token");
        return null;
    }
    const { exp } = JSON.parse(atob(refreshToken.split(".")[1]));
  if (Date.now() >= exp * 1000) {
      console.log("refresh token expired");
        return null;
  }
  console.log("calling backend/refreshing token");
    const { data } = await myApi.post("/refresh", { refresh_token: refreshToken });
    localStorage.setItem("access_token", data.access_token);
    return data.access_token;
}

//get the access token from the local storage
export const getAccessToken = async () => {
  const tokens = localStorage.getItem("tokens");
  const token = tokens ? JSON.parse(tokens).access_token : null;

  if (!token) {
    return null;
  }
  return token;
};

//get the user from the local storage
export const getUser = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }
  return JSON.parse(user);
};
//set the user to the local storage
export const setUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};
//remove the user from the local storage
const removeUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
};

//remove the access token from the local storage
const removeTokens = () => {
  localStorage.removeItem("tokens");
};
//remove the user and the tokens from the local storage
export const logout = () => {
  removeUser();
  removeTokens();
};
//clear game data from the local storage
export const clearGameData = () => {
  const whitelistKeys = [
    "user",
    "tokens",
    "isLoggedIn",
    "online",
    "onlineUser",
  ];

  for (const key in localStorage) {
    if (!whitelistKeys.includes(key)) {
      localStorage.removeItem(key);
    }
  }
};
//update the user profile
const updateProfile = async (profile: any) => {
  try {
    const { data } = await myApi.put("/profile", profile);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
//delete the user profile
const deleteProfile = async () => {
  try {
    const { data } = await myApi.delete("/profile");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
//update the user password with AWS Cognito

