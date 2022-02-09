import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../../actions/contacts";
import { getContactObj } from "../../services/ contact-service";

export const UpdateContact = (props) => {
    const intialContactState = {
        name: "",
        phone: "",
        email: "",
        address: "",

    }

    const [contact, setContact] = useState(intialContactState);
    const dispatch = useDispatch();

    const getContact = (id) => {
        getContactObj(id).then(res => {
            setContact(res.data);

        }).catch(e => {
            console.log(e);
        });
    }
    useEffect(() => {
        getContact(props.match.params.id);

    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setContact({ ...contact, [name]: value });
    };


    const saveContact = () => {
        const data = {
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            address: contact.address
        };
        dispatch(updateContact(contact._id, data))
            .then(response => {
                props.history.push("/");
                // window.location.reload();
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="submit-form">
            <div className="w-25 p-3">
                <h2>Update contact</h2>
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
                <button className="btn btn-success" onClick={saveContact}>
                    Submit
                </button>
            </div>
        </div>
    );
}

