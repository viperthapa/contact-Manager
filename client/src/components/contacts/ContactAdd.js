import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "../../actions/contactAction";
import "../../style/custom.css";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import validate from "../../validations/contactValidations";
import { ShowToastr } from "../../common/Toastr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

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
    profile: "",
    isFavourite: false,
  };
  const [contact, setContact] = useState(intialContactState);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const uploadImage = () => {
    if (!profile) {
      setError({
        ...error,
        profile: "Couldnot upload images",
      });
      return;
    }
    const storageRef = ref(storage, `images/${profile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, profile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setError({
          ...error,
          profile: error,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setContact({ ...contact, profile: downloadURL });
        });
      }
    );
  };

  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: name === "isFavourite" ? !contact.isFavourite : value,
    });
  };

  const setImageDetail = (e) => {
    if (e.target.files[0]) {
      setProfile(e.target.files[0]);
    }
  };
  const saveContact = async (e) => {
    e.preventDefault();
    setError(validate(contact));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      //handle image
      const { name, phone, email, address, isFavourite, profile } = contact;
      const imageData = uploadImage();
      dispatch(createContact(name, phone, email, address, isFavourite, profile))
        .then((data) => {
          ShowToastr("Contact has been successfully saved!");
          props.history.push("/");
          // window.location.reload(true);
        })
        .catch((err) => {
          const resMessage =
            (err.response && err.response.data && err.response.data.err) ||
            err.message ||
            err.toString();
          setError(resMessage);
        });
    }
  }, [error]);

  return (
    <div className="contactAdd">
      <div className="container">
        <br></br>
        <form className="contact-form">
          <h1 id="contact-title" className="text-center">
            <FontAwesomeIcon icon={faUserPlus} />
            Add contact
          </h1>
          <div className="contact-form-group">
            <label className="contact-label" for="name">
              Name<span className="text-dark">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={contact.name}
              onChange={handleInputChange}
            />
            <div className="text-danger">{error.name}</div>
          </div>
          <div className="form-group">
            <label className="contact-label" for="email">
              Email<span className="text-dark">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter your Email"
              value={contact.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-danger mt-1 ps-2">{error.email}</div>

          <div className="form-group">
            <label className="contact-label pt-3 ps-1" for="email">
              Contact
            </label>

            <div className="col-md-4 ps-3">
              <label className="contact-label">
                Home<span className="text-dark">*</span>
              </label>

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
            <div className="text-danger mt-1 ps-3">{error.home}</div>

            <div className="col-md-4 ps-3 pt-3">
              <label className="contact-label">
                Work<span className="text-dark">*</span>
              </label>

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
              <div className="text-danger mt-1 ps-2">{error.work}</div>
            </div>
            <div className="col-md-4 ps-3 pt-3">
              <label className="contact-label">
                Phone<span className="text-dark">*</span>
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="e.g:0154214212"
                onChange={(event) =>
                  setContact({
                    ...contact,
                    phone: [
                      { ...contact.phone[0], mobile: event.target.value },
                    ],
                  })
                }
              />
              <div className="text-danger mt-1 ps-2">{error.mobile}</div>
            </div>
          </div>
          <div className="form-group">
            <label className="contact-label" for="email">
              Address
            </label>
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
            <label className="contact-label">
              Image<span className="text-dark">*</span>
            </label>
            <input
              type="file"
              name="profile"
              id="profile"
              className="form-control"
              onChange={setImageDetail}
            />

            <button
              type="button"
              className="btn btn-secondary"
              onClick={uploadImage}
            >
              Upload
            </button>
            <div className="text-danger mt-1 ps-2">{error.image}</div>
          </div>
          <div className="form-group">
            <label className="contact-label" for="email">
              Favourite
            </label>
            <input
              type="checkbox"
              name="isFavourite"
              value={contact.isFavourite}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <button
              onClick={saveContact}
              type="submit"
              id="submit"
              className="submit-button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
