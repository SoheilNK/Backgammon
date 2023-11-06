import axios from "axios";
import redirectToLogin from "../components/Register";
import { parse } from "dotenv";

//read apiUrl from Vite env
const apiUrl = import.meta.env.VITE_API_URL;

//creat new axios instance
export const myApi = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
//set up axiosApi interceptors to add the token to the request and refresh the token if it is expired
myApi.interceptors.request.use(async (config) => {
  //check if the body contains a refresh token
  if (config.data && config.data.refresh_token) {
    console.log("refresh token in the body");
    return config;
  }
  let token = await getAccessToken();
  if (isTokenExpired(token)) {
    console.log("token expired");

    token = await refreshAccessToken(); // refresh access token
    //print token
    // console.log(token);
    // localStorage.setItem("access_token", token);
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
  let tokens = localStorage.getItem("tokens");
  const refreshToken = tokens ? JSON.parse(tokens).refresh_token : null;
  const username = getUser().username;
  console.log("refresh token", "...refreshToken");
  if (!refreshToken) {
    console.log("no refresh token");
    return null;
  }
  console.log("calling backend/refreshing token");

  try {
    const { data } = await myApi.post("/auth/refresh", {
      refresh_token: refreshToken,
      user_name: username,
    });
    if (!data) {
      console.log("no data");
      return null;
    }
    if (data.error) {
      console.log("error");
      console.log("need to log out....", data.error);
      //logout();
      return null;
    }
    console.log("token refreshed...data", data);
    tokens = data;
    console.log("token refreshed...tokens", tokens);
    localStorage.setItem("tokens", JSON.stringify(tokens));

    return data.access_token;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log("Refresh token expired. Logging out...");
    } else {
      console.error("Error refreshing token:", error);
    }
    logout();
    redirectToLogin();

    // return null;
  }
};
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

interface ProfileUpdateValues {
  name: string;
  email: string;
}

interface PasswordChangeValues {
  username: string;
  newPassword: string;
}

interface DeleteProfileValues {
  username: string;
}



/**
 * Change the user's password
 */
const changePassword = async (values: PasswordChangeValues) => {
  try {
    const username = getUser().username;
    values.username = username;
    const response = await myApi.post("/user/change-password", values);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete the user's profile
 */
const deleteProfile = async () => {
  try {
    const username = getUser().username;
    const values: DeleteProfileValues = { username: username };
    const response = await myApi.delete("/user/delete-profile", { data: values });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { changePassword, deleteProfile };
