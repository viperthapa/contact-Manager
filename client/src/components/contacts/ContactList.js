import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { deleteContacts, retrieveContacts } from "../../actions/contacts";

export const ContactList = (props) => {
    const contacts = useSelector((state) => state.contactReducer)
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);
    const [detail, setDetail] = useState(null);

    const checkLogin = () => {
        const getToken = JSON.parse(localStorage.getItem("user_data"));
        setIsLogin(getToken ? true : false)
    }

    useEffect(() => {
        checkLogin();
        dispatch(retrieveContacts());
    }, []);

    const contactPage = (value) => {
        setDetail(value)

    }

    const removeContact = (value) => {
        dispatch(deleteContacts(value._id))
            .then(() => {
                props.history.push("/");
                window.location.reload();

            })
            .catch(e => {
                console.log(e);
            });
    };


    return (
        <div>
            {(isLogin) ?
                <div>
                    <h4>Contact List</h4>
                    <Link to='/add-contact'><button class="btn btn-success">Add</button></Link>
                </div> :
                <h2>Please login to continue.........</h2>
            }

            <div className="list row">

                <div className="col-md-6">
                    <ul className="list-group" style={{ width: "100%" }}>
                        {isLogin &&
                            contacts.retreieve_data.map((item, index) => (

                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    {item.name}({item.phone})
                                    <div className="w-20">
                                        <button className="btn btn-primary mr-2" onClick={() => contactPage(item)}>view</button>
                                        <Link to={'/update-contact/' + item._id}><button className="btn btn-secondary ml-4">Update</button></Link>
                                        <button className="btn btn-danger" onClick={() => removeContact(item)}>Delete</button>
                                    </div>
                                </li>



                            ))}
                    </ul>

                </div>
                <div className="col-md-6">
                    {detail ? (
                        <div>
                            <h4>Contact</h4>
                            <div>
                                {detail && <ul>
                                    <li>
                                        <label>
                                            <strong>Email:
                                                {detail.email}
                                            </strong>
                                        </label>

                                    </li>
                                    <li>
                                        <label>
                                            <strong>Name:
                                                {detail.name}
                                            </strong>
                                        </label>

                                    </li>
                                    <li>
                                        <label>
                                            <strong>Phone:
                                                {detail.phone}
                                            </strong>
                                        </label>

                                    </li>
                                    <li>
                                        <label>
                                            <strong>Address:
                                                {detail.address}
                                            </strong>
                                        </label>

                                    </li>

                                </ul>}

                            </div>
                        </div>
                    ) : (
                        <div>
                            <br />
                        </div>
                    )}
                </div>
            </div>
        </div >


    );
};

