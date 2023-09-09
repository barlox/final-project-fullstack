import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



export default function Logout(props) {
  const navigate = useNavigate();

  const logout = () => {
    axios.get('http://127.0.0.1:5000/logout')
      .then(function (response) {
        console.log(response);
        //console.log(response.data);
        props.successfulLogout();
        props.deleteCredentials();
        navigate("/");
      })
      .catch(function (error) {
        console.log(error, 'error');
      });
  }

  return (
    <div
      className="logout-wrapper"
    >
      <div
        className='link-nav'
      >
        <button
          className="logout-nav"
          onClick={logout}
          title="Log out"
        >
        </button>
      </div>
      <div
        className='link-nav'
      >
        <button
          className="options-nav"
          title="Options"
        >
        </button>
      </div>
    </div>
  )
}