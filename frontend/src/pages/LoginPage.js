import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../styles/identity.scss'


export default function LoginPage(props) {

  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remindme, setRemindme] = useState('');

  const navigate = useNavigate();

  const logInUser = (event) => {

    event.preventDefault();

    if (email.length === 0) {
      alert("Email has left Blank!");
    }
    else if (password.length === 0) {
      alert("password has left Blank!");
    }
    else {
      axios.post('http://127.0.0.1:5000/login', {
        email: email,
        password: password,
        remindme: remindme
      }, {
        withCredentials: true
      })
        .then(function (response) {
          console.log(response);
          //console.log(response.data);
          // setName(response.data.name);
          props.setCredentials({
            name: response.data.name,
            email: email
          });
          props.successfulAuth();
          navigate("/");
        })
        .catch(function (error) {
          console.log(error, 'error');
          if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        });
    }

  }



  return (
    <div className="identity-wrapper">

      <div className="title-wrapper">
        <h2>
          Log Into Your Account
        </h2>
      </div>

      <form
        id="loginForm"
        className="form-wrapper"
        onSubmit={logInUser}
      >

        <div className="field-wrapper">
          <label
            className="label-data"
            htmlFor="loginEmail"
          >
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="loginEmail"
            className="input-data"
            placeholder="Enter a valid email address"
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
            onChange={(e) => setPassword(e.target.value)}
            id="loginPassword"
            className="input-data"
            placeholder="Enter password"
          />
        </div>

        <div className="">
          <div className="">
            <input
              className=""
              type="checkbox"
              onChange={(e) => setRemindme(`${e.target.checked}`)}
              id="loginCheckbox"
            />
            <label
              className=""
              htmlFor="loginCheckbox"
            >
              Remember me
            </label>
          </div>
          <button
            className=""
          >
            Forgot password?
          </button>
        </div>

        <div className="">
          <button
            type="submit"
          >
            Login
          </button>
        </div>

      </form>

    </div>
  );
}