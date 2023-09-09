import React from "react";
import { NavLink } from "react-router-dom";
import Authorization from "./Authorization";
import Logout from "./Logout";
import '../styles/navigation.scss'


export default function RightSide(props) {

  return (
    <nav className="nav-wrapper">
      <div></div>
      <div
        className='link-nav'
      >
        <NavLink
          to="/"
          className='sudoku-nav'
          title="Sudokus"
        />
      </div>
      <div
        className='link-nav'
      >
        <NavLink
          to="/instructions"
          className='instructions-nav'
          title="Information"
        />
      </div>
      <div
        className='link-nav'
      >
        <NavLink
          to="/ranking"
          className='ranking-nav'
          title="Ranking"
        />
      </div>
      {
        props.isLoggedIn === 'LOGGED_IN' ?
          <Logout
            successfulLogout={props.successfulLogout}
            deleteCredentials={props.deleteCredentials}
          /> :
          <Authorization />
      }
      <div></div>
    </nav>
  );
}