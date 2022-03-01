import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "../../actions/contacts";
import '../../style/custom.css'


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
        dispatch(createContact(name, phone, email, address, isFavourite))
            .then(data => {
                props.history.push("/");
            })
            .catch(e => {
                console.log("error", e);
            });
    }

    return (<div>
        <div className="container">
        <header className="header">
          <h1 id="contact-title" className="text-center">Add contact</h1>
         
        </header>
        <form className="contact-form">
          <div className="contact-form-group">
            <label className="contact-label" for="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={contact.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="contact-label"  for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter your Email"
              value={contact.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="contact-label" for="email">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-control"
              placeholder="Enter your Phone"
              value={contact.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="contact-label"  for="email">Address</label>
            <input
              type="text"
              name="address"
              id="email"
              className="form-control"
              placeholder="Enter your address"
              value={contact.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div class="form-group">
            <label className="contact-label"  for="email">Favourite</label>
            <input type="checkbox" name="isFavourite" 
              value={contact.isFavourite} onChange={handleInputChange}/>
          </div>
          <div className="form-group">
            <button onClick={saveContact}  type="submit" id="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
        </div>
        </div>
              
        )

}

