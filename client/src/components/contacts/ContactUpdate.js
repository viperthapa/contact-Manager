import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../../actions/contacts";
import { getContactObj } from "../../services/ contact-service";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ShowToastr } from "../../common/Toastr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

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
    email: "",
    address: "",
    profile: "",
    isFavourite: false,
  };

  const [contact, setContact] = useState(intialContactState);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  //for handling images
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

  const setImageDetail = (e) => {
    if (e.target.files[0]) {
      setProfile(e.target.files[0]);
    }
  };

  const getContact = (id) => {
    getContactObj(id)
      .then((res) => {
        setContact(res.data);
      })
      .catch((e) => {
        return e;
      });
  };
  useEffect(() => {
    getContact(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: name === "isFavourite" ? !contact.isFavourite : value,
    });
  };

  const saveContact = (e) => {
    e.preventDefault();
    setError(validate(contact));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      const data = {
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        address: contact.address,
        isFavourite: contact.isFavourite,
        profile: contact.profile,
      };
      dispatch(updateContact(contact._id, data))
        .then((response) => {
          ShowToastr("Contact has been successfully Updated!");
          props.history.push("/");
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

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!values.phone[0]["home"]) {
      errors.home = "Home contact is required!";
    }
    if (!values.phone[0]["work"]) {
      errors.work = "Work contact is required!";
    } else if (values.phone[0]["work"].length > 10) {
      errors.work = "Phone cannot exceed more than 10 characters";
    }
    if (!values.phone[0]["mobile"]) {
      errors.mobile = "Mobile contact is required!";
    } else if (values.phone[0]["mobile"].length > 10) {
      errors.mobile = "Phone cannot exceed more than 10 characters";
    }
    if (!values.profile) {
      errors.image = "Image is required!";
    }
    return errors;
  };

  return (
    <div className="contactAdd">
      <div className="container">
        <form className="contact-form">
          <h1 id="contact-title" className="text-center">
            <FontAwesomeIcon icon={faUserPlus} />
            Update Contact
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
              required
            />
          </div>
          <div className="text-danger mt-1 ps-2">{error.name}</div>

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
              required
            />
          </div>
          <div className="text-danger mt-1 ps-2">{error.email}</div>
          <div className="form-group">
            <h5 className="row contact-label ps-3 pt-3">Contact</h5>
            <div className="col-md-4 ps-3 pt-3">
              <h5 className="contact-label">
                Home<span className="text-dark">*</span>
              </h5>
              <input
                type="text"
                className="form-control"
                value={contact.phone[0]?.home}
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
              <h5 className="contact-label">
                Work<span className="text-dark">*</span>
              </h5>
              <input
                type="text"
                className="form-control"
                value={contact.phone[0]?.work}
                onChange={(event) =>
                  setContact({
                    ...contact,
                    phone: [{ ...contact.phone[0], work: event.target.value }],
                  })
                }
              />
            </div>
            <div className="text-danger mt-1 ps-2">{error.work}</div>

            <div className="col-md-4 ps-3 pt-3">
              <h5 className="contact-label">
                Phone<span className="text-dark">*</span>
              </h5>
              <input
                type="text"
                className="form-control"
                value={contact.phone[0]?.mobile}
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
            {contact.profile ? (
              <img
                src={contact.profile}
                alt="firebase-image"
                height={"80px"}
                width={"80px"}
              />
            ) : (
              <p></p>
            )}
            <br></br>

            <input
              type="file"
              name="profile"
              id="profile"
              className="form-control"
              onChange={setImageDetail}
            />
            <div className="text-danger mt-1 ps-2">{error.image}</div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={uploadImage}
            >
              Update
            </button>
          </div>
          <div class="form-group">
            <label className="contact-label" for="email">
              Favourite
            </label>
            <input
              type="checkbox"
              name="isFavourite"
              value={contact.isFavourite}
              checked={contact.isFavourite}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            {contact.profile ? (
              <button
                onClick={saveContact}
                type="submit"
                id="submit"
                className="submit-button"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={saveContact}
                type="submit"
                id="submit"
                className="submit-button"
                disabled="true"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
