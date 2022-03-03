import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../../actions/contacts";
import { getContactObj } from "../../services/ contact-service";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const UpdateContact = (props) => {
    const intialContactState = {
        name: "",
        phone: [ 
          {
            home: "",
            work: "",
            mobile: "",
          },
        ],
        phone: "",
        email: "",
        address: "",
        profile:"",
        isFavourite: false

    }

    const [contact, setContact] = useState(intialContactState);
    const [profile, setProfile] = useState({});
    const dispatch = useDispatch();
    const [err, setErr] = useState({});

    console.log("contact******************88",contact)
    //for handling images
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

    const setImageDetail = (e) => {
      if (e.target.files[0]){
        setProfile(e.target.files[0]);
      }
    }
  

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
        setContact({ ...contact, [name]: name === "isFavourite" ? !contact.isFavourite : value });

    };


    const saveContact = () => {
        const data = {
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            address: contact.address,
            isFavourite: contact.isFavourite,
            profile:contact.profile
        };
        dispatch(updateContact(contact._id, data))
            .then(response => {
                props.history.push("/");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
        <div className="container">
          <header className="header">
            <h1 id="contact-title" className="text-center">Update contact</h1>
          
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
              <h5 className="row contact-label ps-3 pt-3">Contact</h5>
              <div className="col-md-4 ps-3 pt-3">
                <h5 className="contact-label">Home</h5>
                <input
                  type="text" 
                  value={contact.phone[0]}
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
              />
              <button type="button" className="btn btn-secondary" onClick={uploadImage} >Upload</button>
            </div>
            <div class="form-group">
              <label className="contact-label"  for="email">Favourite</label>
              <input type="checkbox" name="isFavourite" value={contact.isFavourite} checked={contact.isFavourite} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <button onClick={saveContact}  type="submit" id="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
    </div>
              
    );
}

