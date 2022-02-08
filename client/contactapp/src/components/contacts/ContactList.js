import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { retrieveContacts } from "../../actions/contacts";

export const ContactList = () => {
    const contacts = useSelector((state) => state.contactReducer)
    console.log("contact", contacts)
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

    return (
        <div className="list">
            <br></br>
            <div className="col-md-6">
                <h4>Contact List</h4>
                <Link to='/add-contact'><button class="btn btn-success">Add</button></Link>
            </div>

            <div className="col-md-6">
                <h4>Tutorial</h4>
                {isLogin ? (
                    contacts.retreieve_data.map((item, index) => (
                        <div>

                            <div>
                                <label>
                                    <strong>Phone:</strong>
                                </label>
                                <div>
                                    {item.phone}
                                    <button class="btn btn-primary" onClick={() => contactPage(item)}>view</button>
                                    <button class="btn btn-secondary" onClick={() => contactPage(item)}>Edit</button>
                                </div>
                            </div>


                        </div>
                    ))

                ) : (
                    <div>
                        <br />
                        <p>Please login...</p>
                    </div>
                )}
            </div>
            <div>
                {detail && <ul>
                    <li>
                        {detail.email}

                    </li>
                    <li>
                        {detail.phone}

                    </li>
                    <li>
                        {detail.name}

                    </li>

                </ul>}

            </div>
        </div >
    );
};

