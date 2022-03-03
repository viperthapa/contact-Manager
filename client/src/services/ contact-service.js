import axios from 'axios'
import { authHeader } from "./auth-header";
const API_URL = "http://localhost:5000/api/"

//get all contact list
export const getContacts = () => {
    console.log("auth header",authHeader)
    const res = axios.get(API_URL + "contacts/", { headers: authHeader() });
    return res;
}

//detail page of contact
export const getContactObj = (id) => {
    const res = axios.get(API_URL + "contacts/" + id, { headers: authHeader() })
    return res
}

//create contact
export const create = async (name, phone, email, address, isFavourite, profile) => {
    try {
        const res = await axios.post(API_URL + "contacts/", {
            name, phone, email, address, isFavourite,profile
        }, { headers: authHeader() })
        return res
    } catch (error) {
        console.log("error",error)
    }

};


//update contact
export const update = async (id, data) => {
    return await axios.put(API_URL + "contacts/" + id, data, { headers: authHeader() });
};

//delete contact
export const remove = (id) => {
    return axios.delete(API_URL + "contacts/" + id, { headers: authHeader() });
};

export const getToken = async (token) => {
    return await axios.post(API_URL + "token/",token, { headers: "*"});
};
