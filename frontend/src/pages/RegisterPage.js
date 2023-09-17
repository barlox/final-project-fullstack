import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function RegisterPage(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameField, setNameField] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const [passwordField, setPasswordField] = useState(false);
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();
    if (name.length === 0) {
      setNameField('Name not completed!');
    }
    else if (email.length === 0) {
      setEmailField('Email not completed!');
    }
    else if (password.length === 0) {
      setPasswordField("Password not completed!");
    }
    else {
      axios.post('http://127.0.0.1:5000/signup', {
        name: name,
        email: email,
        password: password
      }, {
        withCredentials: true
      })
        .then(function (response) {
          console.log(response);
          props.setCredentials({
            name: name,
            email: email
          });
          props.successfulAuth();
          navigate("/");
        })
        .catch(function (error) {
          console.log(error, 'error');
          if (error.response.status === 409) {
            // setAuth('The name or email already exists');
            setAuth(error.response.data.error);
          } else {
            setAuth('Server failure');
          }
        });
    }
  };



  return (
    <div className="register-wrapper">

      <div className="title-wrapper">
        <h2>
          Create Your Account
        </h2>
      </div>

      <form
        id="registerForm"
        className="form-register-wrapper"
        onSubmit={registerUser}
      >

        <div className="field-wrapper">
          <label
            className="label-data"
            htmlFor="register-name"
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameField(false);
              setAuth(false);
            }
            }
            id="register-name"
            className={
              `input-data ${nameField ? 'nameField' : null}`
            }
            placeholder={
              nameField ?
                nameField :
                'Enter your name'
            }
          />
        </div>

        <div className="field-wrapper">
          <label
            className="label-data"
            htmlFor="register-email"
          >
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailField(false);
              setAuth(false);
            }
            }
            id="register-email"
            className={
              `input-data ${emailField ? 'emailField' : null}`
            }
            placeholder={
              emailField ?
                emailField :
                'Enter a valid email address'
            }
          />
        </div>


        <div className="field-wrapper">
          <label
            className="label-data"
            htmlFor="register-password"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordField(false);
              setAuth(false);
            }}
            id="register-password"
            className={
              `input-data ${passwordField ? 'passwordField' : null}`
            }
            placeholder={
              passwordField ?
                passwordField :
                'Enter password'
            }
          />
        </div>

        <div className="submit-register">
          {
            auth ?
              <div className="error-login">
                {auth}
              </div> :
              <button
                type="submit"
                className="submit-button"
              >
                Sign Up
              </button>
          }
        </div>

      </form>

    </div>
  );
}