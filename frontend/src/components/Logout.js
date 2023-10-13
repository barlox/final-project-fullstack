import React from "react";
import axios from 'axios';
import { NavLink, useNavigate, useLocation  } from "react-router-dom";



export default function Logout(props) {

  const navigate = useNavigate();
  const location = useLocation();
  let classImage = '';
  

  switch (location.pathname) {
    case '/':
      classImage = 'sudoku-img';
      break;
    case '/instructions':
      classImage = 'instructions-img';
      break;
    case '/ranking':
      classImage = 'ranking-img';
      break;
    case '/login':
      classImage = 'login-img';
      break;
    case '/register':
      classImage = 'register-img';
      break;
    case '/settings':
      classImage = 'settings-img';
      break;  
    default:
      classImage = 'sudoku-img';
  }

  const logout = () => {
    axios.get('https://sudokers.eu.pythonanywhere.com/logout')
      .then(function (response) {
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
          className={`logout-nav ${classImage}`}
          onClick={logout}
          title="Log out"
        >
        </button>
      </div>
      <div
        className='link-nav'
      >
      <NavLink
          to="/settings"
          className={`settings-nav ${classImage}`}
          title="Settings"
        />
      </div>
    </div>
  )
}