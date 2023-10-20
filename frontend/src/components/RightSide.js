import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Authorization from "./Authorization";
import Logout from "./Logout";


export default function RightSide(props) {

  let classStyle = '', classImage = '';
  let location = useLocation();

  /**
   * This conditional adds a different class to 
   * the Nav component, depending on the location
   */


  if (props.noFound) {
    classStyle = 'sudoku-color';
    classImage = 'sudoku-img';
  } else {
    switch (location.pathname) {
      case '/':
        classStyle = 'sudoku-color';
        classImage = 'sudoku-img';
        break;
      case '/instructions':
        classStyle = 'instructions-color';
        classImage = 'instructions-img';
        break;
      case '/ranking':
        classStyle = 'ranking-color';
        classImage = 'ranking-img';
        break;
      case '/login':
        classStyle = 'login-color';
        classImage = 'login-img';
        break;
      case '/register':
        classStyle = 'register-color';
        classImage = 'register-img';
        break;
      case '/settings':
        classStyle = 'settings-color';
        classImage = 'settings-img';
        break;
      default:
        classStyle = 'sudoku-color';
        classImage = 'sudoku-img';
    }
  }


  return (
    <nav className={classStyle}>
      <div></div>
      <div
        className='link-nav'
      >
        <NavLink
          to="/"
          className={`sudoku-nav ${classImage}`}
          title="Sudokus"
        />
      </div>
      <div
        className='link-nav'
      >
        <NavLink
          to="/instructions"
          className={`instructions-nav ${classImage}`}
          title="Information"
        />
      </div>
      <div
        className='link-nav'
      >
        <NavLink
          to="/ranking"
          className={`ranking-nav ${classImage}`}
          title="Ranking"
        />
      </div>
      {
        props.isLoggedIn === 'LOGGED_IN' ?
          <Logout
            successfulLogout={props.successfulLogout}
            deleteCredentials={props.deleteCredentials}
          /> :
          <Authorization
          />
      }
      <div></div>
    </nav>
  );
}