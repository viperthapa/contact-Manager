import { authHeader } from "./auth-header";
import axios from "axios";
import axiosInstance from './axiosInstance'

const API_URL = "http://localhost:5000/api/"

//get all contact list

export const getContacts = async() => {
    const res = await axiosInstance.get("contacts/");
    return res;
}

//detail page of contact
export const getContactObj =async(id) => {
    const res = await axiosInstance.get("contacts/" + id)
    return res
}

//create contact
export const create = async (name, phone, email, address, isFavourite, profile) => {
        const res = await axiosInstance.post("contacts/", {
            name, phone, email, address, isFavourite,profile
        }, { headers: authHeader() })
        return res
};

//update contact
export const update = async (id, data) => {
        console.log("data",data)
        const res = await axios.put(API_URL + "contacts/" + id, data);
        console.log("res in api",res)
        return res
};

//delete contact
export const remove = async (id) => {
    return await axiosInstance.delete("contacts/" + id, { headers: authHeader() });
};

export const getToken = async (token) => {
    return await axios.post(API_URL + "token/",token, { headers: "*"});
};
