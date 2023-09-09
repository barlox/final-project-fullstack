import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function RegisterPage(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();
    if (name.length === 0) {
      alert("Name has left Blank!");
    }
    else if (email.length === 0) {
      alert("Email has left Blank!");
    }
    else if (password.length === 0) {
      alert("password has left Blank!");
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
          if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        });
    }
  };



  return (
    <div>
      <div className="">
        <p className="">
          Create Your Account
        </p>
      </div>

      <form
        id="registerForm"
        onSubmit={registerUser}
      >

        <div className="">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="register-name"
            className=""
            placeholder="Enter your name"
          />
          <label
            className=""
            htmlFor="register-name"
          >
            Name
          </label>
        </div>

        <div className="">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="register-email"
            className=""
            placeholder="Enter a valid email address"
          />
          <label
            className=""
            htmlFor="register-email"
          >
            Email address
          </label>
        </div>


        <div className="">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="register-password"
            className=""
            placeholder="Enter password"
          />
          <label
            className="form-label"
            htmlFor="register-password"
          >
            Password
          </label>
        </div>

        <div className="">
          <input
            className=""
            type="checkbox"
            value=""
            id="registerCheckbox"
          />
          <label
            className=""
            htmlFor="registerCheckbox"
          >
            Remember me
          </label>
        </div>

        <div className="">
          <button
            type="submit"
          >
            Sign Up
          </button>
        </div>

      </form>

    </div>
  );
}