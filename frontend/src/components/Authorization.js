import React from 'react';
import { NavLink, useLocation } from "react-router-dom";


export default function Authorization(props) {

  let classImage = '';
  let location = useLocation();  

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
    default:
      classImage = 'sudoku-img';
  }

  return (
    <div
      className='auth-wrapper'
    >
      <div
        className='link-nav'
      >
        <NavLink
          to="/login"
          className={`login-nav ${classImage}`}
          title='Log in'
        />
      </div>
      <div
        className='link-nav'
      >
        <NavLink
          to="/register"
          className={`register-nav ${classImage}`}
          title='Sign up'
        />
      </div>
    </div>
  )
}