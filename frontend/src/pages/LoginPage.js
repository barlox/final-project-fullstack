import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import RecoverPassword from "../components/RecoverPassword";


export default function LoginPage(props) {

  const [forgot, setForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailField, setEmailField] = useState(false);
  const [passwordField, setPasswordField] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    props.setNoFound(false);
  }
    // eslint-disable-next-line
    , []);

  const navigate = useNavigate();


  const logInUser = (event) => {

    event.preventDefault();

    if (email.length === 0) {
      setEmailField('Email not completed!');
    }
    else if (password.length === 0) {
      setPasswordField("Password not completed!");
    }
    else {
      axios.post('https://sudokers.eu.pythonanywhere.com/login', {
        email: email,
        password: password
      }, {
        withCredentials: true
      })
        .then(function (response) {
          props.setCredentials({
            name: response.data.name,
            email: email
          });
          props.successfulAuth();
          props.setIsNotForm(true);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error, 'error');
          if (error.response.status === 401) {
            setAuth("Invalid credentials");
          } else {
            setAuth('Server failure');
          }
        });
    }

  }

  const forgotPass = (event) => {
    event.preventDefault();
    setForgot(true);
  }

  const recoverPass = () => {
    setForgot(false);
  }


  if (forgot) {
    return (
      <RecoverPassword
        recoverPass={recoverPass}
        setIsNotForm={props.setIsNotForm}
        setNoFound={props.setNoFound}
      />
    );
  } else {
    return (
      <div className="identity-wrapper">

        <div className="title-wrapper">
          <h2>
            Log Into Your Account
          </h2>
        </div>

        <form
          id="loginForm"
          className="form-login-wrapper"
          onSubmit={logInUser}
        >

          <div className="field-wrapper">
            <label
              className="label-data"
              htmlFor="loginEmail"
            >
              Email
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
              id="loginEmail"
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
              htmlFor="loginPassword"
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
              id="loginPassword"
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

          <div className="submit-login">
            {
              auth ?
                <div className="error-login">
                  {auth}
                </div> :
                <button
                  type="submit"
                  className="submit-button"
                >
                  Login
                </button>
            }
          </div>

          <div className="forgot-wrapper">
            <button
              className="forgot-button"
              onClick={forgotPass}
            >
              Forgot password?
            </button>
          </div>

        </form>

      </div>
    );
  }

}