import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route, Switch, Link } from "react-router-dom";
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import { ContactList } from "./components/contacts/ContactList";
import { ContactListNew } from "./components/contacts/ContactListNew";
import { AddContact } from "./components/contacts/ContactAdd";
import { UpdateContact } from "./components/contacts/ContactUpdate";
import { Error } from './error'
import "./App.css";
import requireAuth from "./RequireAuth";
const rootElement = document.getElementById("root");

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path={["/",]} component={requireAuth(ContactListNew)}/>
        <Route exact path={["/login"]} component={Login} />)
        <Route exact path={["/register"]} component={Register} />
        <Route exact path={["/add-contact"]} component={AddContact} />
        <Route exact path={["/update-contact/:id"]} component={UpdateContact} />
        <Route exact path={["*"]} component={Error} />
      </Switch>
    </div>
  );
}

export default App;


