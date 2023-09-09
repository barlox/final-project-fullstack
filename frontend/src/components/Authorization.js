import React from 'react';
import { NavLink } from "react-router-dom";


export default function Authorization(props) {

  return (
    <div
      className='auth-wrapper'
    >
      <div
        className='link-nav'
      >
        <NavLink
          to="/login"
          className='login-nav'
          title='Log in'
        />
      </div>
      <div
        className='link-nav'
      >
        <NavLink
          to="/register"
          className='register-nav'
          title='Sign up'
        />
      </div>
    </div>
  )
}