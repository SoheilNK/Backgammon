import axios from "axios";
import { Alert } from "../components/Alert";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000/api/auth/";

export const register = (username: string, email: string, password: string) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

export const login = (username: string, password: string) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};


export const logout = () => {
    const navigate = useNavigate();

    if (confirm("Your going to sign out!\nAre you sure?") == true) {
        localStorage.removeItem("user");
        navigate("/signin");
    };
    return;

}

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
};