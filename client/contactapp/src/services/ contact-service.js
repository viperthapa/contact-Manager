import axios from 'axios';
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/"

//get all contact list
export const getContacts = () => {
    return axios.get(API_URL + "api/contacts/", { headers: authHeader() });
}

//detail page of contact
export const getContactObj = (id) => {
    const res = axios.get(API_URL + "api/contacts/" + id, { headers: authHeader() })
    return res
}

//create contact
export const create = (name, phone, email, address) => {
    const res = axios.post(API_URL + "api/contacts/", {
        name, phone, email, address
    }, { headers: authHeader() });
    return res.data
}

//update contact
export const update = (id, data) => {
    console.log("id", id)
    const res = axios.put(API_URL + "api/contacts/" + id, data, { headers: authHeader() });
    console.log("res", res.data)
};

//delete contact
export const remove = (id) => {
    return axios.delete(API_URL + "api/contacts/" + id, { headers: authHeader() });
};