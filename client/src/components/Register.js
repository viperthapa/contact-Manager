import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { register } from "../services/auth-service";
import { ShowToastr } from "../common/Toastr";

//validation for mandatory fields
const required = (value) => {
  if (!value) {
    return <div className="text-warning">This field is required!</div>;
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      register(name, email, password).then(
        (response) => {
          ShowToastr("Register successful!");
          props.history.push("/login");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="name">
                  Name<span className="text-danger">*</span>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email<span className="text-danger">*</span>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required]}
                />
                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful ? "alert alert-success" : "text-warning"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Password<span className="text-danger">*</span>
                </label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>
              <div className="form-group mt-2">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}
          <CheckButton className="d-none" ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
