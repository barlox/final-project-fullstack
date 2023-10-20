import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function RegisterPage(props) {

  /**
   * nameField, emailField, passwordField and auth
   * They serve to inform the user of errors
   */

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameField, setNameField] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const [passwordField, setPasswordField] = useState(false);
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    props.setNoFound(false);
  }
    // eslint-disable-next-line
    , []);

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
      axios.post('https://sudokers.eu.pythonanywhere.com/signup', {
        name: name,
        email: email,
        password: password
      }, {
        withCredentials: true
      })
        .then(function (response) {
          props.setIsNotForm(true);
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
            maxLength={12}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameField(false);
              setAuth(false);
            }
            }
            onClick={() => {
              setNameField(false);
              setAuth(false);
            }
            }
            onFocus={() => props.setIsNotForm(false)}
            onBlur={() => props.setIsNotForm(true)}
            id="register-name"
            className={
              `input-data ${nameField ? 'nameField' : ''}`
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
            onClick={() => {
              setEmailField(false);
              setAuth(false);
            }
            }
            onFocus={() => props.setIsNotForm(false)}
            onBlur={() => props.setIsNotForm(true)}
            id="register-email"
            className={
              `input-data ${emailField ? 'emailField' : ''}`
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
            }
            }
            onClick={() => {
              setPasswordField(false);
              setAuth(false);
            }
            }
            onFocus={() => props.setIsNotForm(false)}
            onBlur={() => props.setIsNotForm(true)}
            id="register-password"
            className={
              `input-data ${passwordField ? 'passwordField' : ''}`
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