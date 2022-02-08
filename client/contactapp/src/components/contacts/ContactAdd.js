import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "../../actions/contacts"



export const AddContact = (props) => {

    const intialContactState = {
        name: "",
        phone: "",
        email: "",
        address: "",

    }

    const [contact, setContact] = useState(intialContactState);
    const dispatch = useDispatch();
    const handleInputChange = event => {
        const { name, value } = event.target;
        setContact({ ...contact, [name]: value });
    };

    const saveContact = () => {
        console.log("eneterd", contact)
        const { name, phone, email, address } = contact;
        dispatch(createContact(name, phone, email, address))
            .then(data => {
                console.log("data", data)
                setContact({
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    address: data.address
                })
                props.history.push("/")
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
                        value={contact.title}
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
                <button onClick={saveContact} className="btn btn-success">
                    Submit
                </button>
            </div>
        </div>
    );
}

