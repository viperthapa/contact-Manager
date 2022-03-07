import axios from "axios";
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { async } from "@firebase/util";

const baseURL = "http://localhost:5000/api/"

let authTokens = localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data')) : null
console.log("auth tokens",authTokens)

const axiosInstance = axios.create({
    baseURL,
    // headers:{Authorization: `Bearer ${authTokens?.access_token}`}
});



axiosInstance.interceptors.request.use(async req => {

    if(!authTokens){
        console.log("not auth tokens")
        return req
    }
    authTokens = await localStorage.getItem('user_data') ?  JSON.parse(await localStorage.getItem('user_data')) : null
    req.headers.Authorization = 'Bearer ' + authTokens.access_token
    //decode the jwt and check if the token is expired or not
    const user = jwt_decode(authTokens.access_token)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1; 
    if (isExpired){
        const res = await axios.post(baseURL+'token/',{
            token:authTokens.refresh_token
        })
        if (res.status == 200){
            const newToken = JSON.parse(localStorage.getItem("user_data"));
            console.log("new token",newToken)
            req.headers.Authorization = 'Bearer ' + res.data.accessToken

            let user = JSON.parse(localStorage.getItem("user_data"));
            user.accessToken = res.data.accessToken;
            localStorage.setItem("user_data", JSON.stringify(user));

        }
    }
    
    return req

})

export default axiosInstance;
