import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { getCurrentUser } from "./services/auth-service";
import "./App.css";

export const Navbar = () => {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);


    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">

            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                        <h3>Home</h3>
                    </Link>
                </li>

            </div>
            {currentUser ? (
                <div className="navbar-nav" style={{ marginLeft: "80rem" }}>
                    <li className="nav-item">
                        <Link className="nav-link">
                            <h4>Welcome:{currentUser.email}</h4>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">
                            <h4>Logout</h4>
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