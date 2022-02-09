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
export const create = async (name, phone, email, address, isFavourite) => {
    try {
        const res = await axios.post(API_URL + "api/contacts/", {
            name, phone, email, address, isFavourite
        }, { headers: authHeader() })
        return res
    } catch (error) {
        console.log(error)
    }

};


//update contact
export const update = async (id, data) => {
    return await axios.put(API_URL + "api/contacts/" + id, data, { headers: authHeader() });
};

//delete contact
export const remove = (id) => {
    return axios.delete(API_URL + "api/contacts/" + id, { headers: authHeader() });
};