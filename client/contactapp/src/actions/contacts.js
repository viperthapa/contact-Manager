/*
We will import all the list of actions from type.js and make asynchronous requests and that triggers the dispatch method

*/
import {
    CREATE_CONTACTS,
    RETRIEVE_CONTACTS,
    UPDATE_CONTACTS,
    DELETE_CONTACTS,
} from "./types"
import { create, getContacts, getContactsId, update, remove } from "../services/ contact-service";

//create 
export const createContact = (name, phone, email, address) => async (dispatch) => {
    try {
        const res = await create(name, phone, email, address);
        dispatch({
            type: CREATE_CONTACTS,
            payload: res.data
        });
        return Promise.data(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

//update contacts
export const updateContact = (id, data) => async (dispatch) => {
    try {
        console.log("res", id, data)
        const res = await update(id, data);
        dispatch({
            type: UPDATE_CONTACTS,
            payload: res.data
        });
        return Promise.data(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

//get contacts
export const retrieveContacts = () => async (dispatch) => {
    try {
        const res = await getContacts();
        console.log("res", res.data)
        dispatch({
            type: RETRIEVE_CONTACTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}

//delete contacts
export const deleteContacts = (id) => async (dispatch) => {
    try {
        const res = await remove(id);
        dispatch({
            type: DELETE_CONTACTS,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};