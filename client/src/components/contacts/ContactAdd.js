import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "../../actions/contacts";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../../style/custom.css'
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { ShowToastr } from "../common/Toastr";
import { ShowToastr } from "../../common/Toastr";



const required = (value) => {
  if (!value) {
      return (
          <div className="alert alert-danger" role="alert">
              This field is required!
          </div>
      );
  }
};

export const AddContact = (props) => {
    const intialContactState = {
        name: "",
        phone: [ 
          {
            home: "",
            work: "",
            mobile: "",
          },
        ],
        email: "",
        address: "",
        profile:"",
        isFavourite: false,

    }
    const [contact, setContact] = useState(intialContactState);
    const [profile, setProfile] = useState({});
    const [err, setErr] = useState({});
    const [message, setMessage] = useState("");


    const uploadImage = () => {
      if (!profile) {
        setErr({
          ...err,
          profile: "Couldnot upload it",
        });
        return;
      };
      const storageRef = ref(storage, `images/${profile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, profile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setErr({
            ...err,
            profile: error,
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setContact({ ...contact, profile : downloadURL });
          });
        }
      );
    };
  
    const dispatch = useDispatch();
    const handleInputChange = event => {
        const { name, value } = event.target;
        setContact({ ...contact, [name]: name === "isFavourite" ? !contact.isFavourite : value });
    };

    const setImageDetail = (e) => {
      if (e.target.files[0]){
        setProfile(e.target.files[0]);
      }
    }
    const saveContact = async (e) => {
        e.preventDefault();
        const { name, phone, email, address, isFavourite, profile } = contact;

        //handle image 
        const  imageData = await uploadImage();
        dispatch(createContact(name, phone, email, address, isFavourite, profile))
            .then(data => {
                ShowToastr("Contact has been successfully saved!")
                props.history.push("/");
                window.location.reload(true);

            })
            .catch(error => {
                console.log("error", error);
                const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);

            });
    }

    return (
    <div>
        <div className="container">
        <header className="header">
          <h1 id="contact-title" className="text-center">Add contact</h1>
         
        </header>
        <form className="contact-form">
        {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
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
              validations={[required]}
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
            <label className="contact-label pt-3 ps-1" for="email">Contact</label>

            <div className="col-md-4 ps-3">
              <h5 className="contact-label">Home</h5>
              <input
                type="text"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="e.g:0154214212"
                onChange={(event) =>
                  setContact({
                    ...contact,
                    phone: [{ ...contact.phone[0], home: event.target.value }],
                  })
                }
              />
            </div>
            <div className="col-md-4 ps-3 pt-3">
              <h5 className="contact-label">Work</h5>
              <input
                type="text"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="e.g:9854354145"
                onChange={(event) =>
                  setContact({
                    ...contact,
                    phone: [{ ...contact.phone[0], work: event.target.value }],
                  })
                }
              />
            </div>
            <div className="col-md-4 ps-3 pt-3">
              <h5 className="contact-label">Phone</h5>
              <input
                type="text"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="e.g:0154214212"
                onChange={(event) =>
                  setContact({
                    ...contact,
                    phone: [{ ...contact.phone[0], mobile: event.target.value }],
                  })
                }
              />
            </div>
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
          <div className="form-group">
            <label className="contact-label">Image</label>
            <input
              type="file"
              name="profile"
              id="profile"
              className="form-control"
              onChange={setImageDetail}
            />
            <button type="button" className="btn btn-secondary" onClick={uploadImage} >Upload</button>

          </div>
          <div className="form-group">
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

