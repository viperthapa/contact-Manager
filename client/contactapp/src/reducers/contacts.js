import {
    CREATE_CONTACTS,
    RETRIEVE_CONTACTS,
    UPDATE_CONTACTS,
    DELETE_CONTACTS,
} from "../actions/types"

const intialstate = { "loading": true, "retreieve_data": [] };
function contactReducer(contacts = intialstate, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_CONTACTS:
            return { ...contacts, retreieve_data: [...contacts.retreieve_data, payload] }


        case RETRIEVE_CONTACTS:
            return { ...contacts, retreieve_data: payload, loading: false }
        default:
            return contacts
    }
};

export default contactReducer;