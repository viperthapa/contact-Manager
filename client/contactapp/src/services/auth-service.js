import axios from 'axios';
const API_URL = "http://localhost:5000/"

//register the user
export const register = (email, password) => {
    return axios.post(API_URL + "user/register/", {
        email,
        password
    });
};

//login the user
export const login = (email, password) => {
    return axios.post(API_URL + "user/login", {
        email,
        password
    }).then((res) => {
        //get the token and save it into localstorage 
        if (res.data.token) {
            localStorage.setItem("user_data", JSON.stringify(res.data));
        }
        return res.data

    });
};

//logout the user
export const logout = () => {
    localStorage.removeItem("user_data");
}

//get the currently logged in user
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user_data"))
}

