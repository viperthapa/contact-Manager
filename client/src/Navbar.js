import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { getCurrentUser } from "./services/auth-service";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Navbar = () => {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    //logout the user
    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";

    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">

            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                        <h3 className="navbar-element">Home</h3>
                    </Link>
                </li>

            </div>
            {currentUser ? (
                <div className="navbar-nav" style={{ marginLeft: "80rem" }}>
                    <li className="nav-item">
                        <div className="nav-link">
                            <h4 className="navbar-element">Welcome:{currentUser.full_name}</h4>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">
                            <button className="navbar-element" onClick={() => logout()}><a><h5>Logout</h5></a></button>
                        </a>
                    </li>
                </div>
            ) : (
                <div className="navbar-nav" style={{ marginLeft: "100rem" }}>
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link">
                            <h4>Login</h4>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/register"} className="nav-link">
                            <h4>Sign Up</h4>
                        </Link>
                    </li>
                </div>
            )}
        </nav>
    )

}