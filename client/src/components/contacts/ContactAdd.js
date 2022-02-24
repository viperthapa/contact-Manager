import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "../../actions/contacts";



export const AddContact = (props) => {
    const intialContactState = {
        name: "",
        phone: "",
        email: "",
        address: "",
        isFavourite: false,

    }
    const [contact, setContact] = useState(intialContactState);
    const dispatch = useDispatch();
    const handleInputChange = event => {
        const { name, value } = event.target;
        setContact({ ...contact, [name]: name === "isFavourite" ? !contact.isFavourite : value });

    };

    const saveContact = (e) => {
        e.preventDefault();
        const { name, phone, email, address, isFavourite } = contact;
        console.log("favourite11", isFavourite)
        dispatch(createContact(name, phone, email, address, isFavourite))
            .then(data => {
                props.history.push("/");
            })
            .catch(e => {
                console.log("error", e);
            });
    }

    return (
        <div className="submit-form">
            <div className="w-25 p-3">
                <h2>Add contact</h2>
                <div className="form-group">
                    <label htmlFor="title">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={contact.name}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={contact.phone}
                        onChange={handleInputChange}
                        name="phone"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={contact.email}
                        onChange={handleInputChange}
                        name="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        required
                        value={contact.address}
                        onChange={handleInputChange}
                        name="address"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Favourite</label>
                    <input type="checkbox" name="isFavourite" value={contact.isFavourite} onChange={handleInputChange}
                    />

                </div>
                <button onClick={saveContact} className="btn btn-success">
                    Submit
                </button>
            </div>
        </div>
    );
}

