/*
We will import all the list of actions from type.js and make asynchronous requests and that triggers the dispatch method

*/
import {
    CREATE_CONTACTS,
    RETRIEVE_CONTACTS,
    UPDATE_CONTACTS,
    DELETE_CONTACTS,
} from "./types"
import { create, getContacts, update, remove } from "../services/ contact-service";

//create 
export const createContact = (name, phone, email, address, isFavourite,profile) => async (dispatch) => {
        const res = await create(name, phone, email, address, isFavourite,profile);
        dispatch({
            type: CREATE_CONTACTS,
            payload: res.data
        });
        return res
}

//update contacts
export const updateContact = (id, data) => async (dispatch) => {
    console.log("data",data)
    try{
    const res = await update(id, data);
    console.log("res",res)
    dispatch({
        type: UPDATE_CONTACTS,
        payload: res.data
    });
    console.log("res",res)
    return res
    } catch(err){
        console.log("err",err)
        return err
    }
}

//get contacts
export const retrieveContacts = () => async (dispatch) => {
    try {
        const res = await getContacts();
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
        await remove(id);
        dispatch({
            type: DELETE_CONTACTS,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};