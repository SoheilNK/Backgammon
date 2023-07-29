import axios from "axios";
//creat new axios instance
export const myApi = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});
//set up axiosApi interceptors to add the token to the request and refresh the token if it is expired
myApi.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }
        
        return config;
    }
);

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
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    if (Date.now() >= exp * 1000) {
        console.log("token expired");
        console.log("refreshing token");
        const newToken = await refreshAccessToken();
        if (!newToken) {
            console.log("refresh token expired");
            console.log("logging out");
            logout();
        } else {
            console.log("token refreshed");
            return newToken;
        }
        return null;
    }
    return token;
}
//get the user from the local storage
export const getUser = () => {
    const user = localStorage.getItem("user");
    if (!user) {
        return null;
    }
    return JSON.parse(user);
}
//set the user to the local storage
export const setUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
}
//remove the user from the local storage
const removeUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
}
// export const getTokens = () => {
//     const tokens = localStorage.getItem("tokens");
//     if (!tokens) {
//         return null;
//     }
//     return JSON.parse(tokens);
// }
// //set the tokens to the local storage
// export const setTokens = (tokens: any) => {
//     localStorage.setItem("tokens", JSON.stringify(tokens));
// }

//remove the access token from the local storage
const removeTokens = () => {
    localStorage.removeItem("tokens");
}
//remove the user and the tokens from the local storage
export const logout = () => {
    removeUser();
    removeTokens();
}
//clear game data from the local storage
export const clearGameData = () => {
    // let allItems = getAllLocalStorageItems();
    // console.log("All items: ", allItems);
    // for (let key in allItems) {
    //     if (key !== "user" && key !== "tokens" && key !== "isLoggedIn" && key !== "online") {
    //         localStorage.removeItem(key);
    //     }
    // }
    const whitelistKeys = ["user", "tokens", "isLoggedIn", "online"];

    for (const key in localStorage) {
        if (!whitelistKeys.includes(key)) {
            localStorage.removeItem(key);
        }
    }

}
//Using a loop to iterate through all keys in localStorage and return an object with all key/value pairs
// function getAllLocalStorageItems(): { [key: string]: string } {
//     const allItems: { [key: string]: string } = {};

//     for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i);
//         if (key !== null) {
//             const value = localStorage.getItem(key);
//             allItems[key] = value || '';
//         }
//     }

//     return allItems;
// }

//login the user
// const login = async (email: string, password: string) => {
//     try {
//         const { data } = await myApi.post("/login", { email, password });
//         localStorage.setItem("access_token", data.access_token);
//         localStorage.setItem("refresh_token", data.refresh_token);
//         setUser(data.user);
//         return data.user;
//     } catch (error) {
//         return Promise.reject(error);
//     }
// }
//update the user profile
const updateProfile = async (profile: any) => {
    try {
        const { data } = await myApi.put("/profile", profile);
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}
//delete the user profile
const deleteProfile = async () => {
    try {
        const { data } = await myApi.delete("/profile");
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}
//get the user friends  
const getFriends = async () => {
    try {
        const { data } = await myApi.get("/friends");
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}
//add a friend to the user friends
const addFriend = async (friendId: string) => {
    try {
        const { data } = await myApi.post("/friends", { friendId });
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}
//remove a friend from the user friends
const removeFriend = async (friendId: string) => {
    try {
        const { data } = await myApi.delete(`/friends/${friendId}`);
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}
//get the user friend requests
const getFriendRequests = async () => {
    try {
        const { data } = await myApi.get("/friend-requests");
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}
//send a friend request to a user
const sendFriendRequest = async (friendId: string) => {
    try {
        const { data } = await myApi.post("/friend-requests", { friendId });
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}
//accept a friend request from a user
const acceptFriendRequest = async (friendId: string) => {
    try {
        const { data } = await myApi.put("/friend-requests", { friendId });
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}
//reject a friend request from a user
const rejectFriendRequest = async (friendId: string) => {
    try {
        const { data } = await myApi.delete(`/friend-requests/${friendId}`);
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}
