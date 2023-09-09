import React from 'react';
import { Outlet, NavLink } from "react-router-dom";


const Layout = (props) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Sudokus</NavLink>
          </li>
          <li>
            <NavLink to="/instructions">Instructions</NavLink>
          </li>
          {/* {props.isLoggedIn === 'LOGGED_IN' ?
            null :
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>} */}
          <li>
            <NavLink to="/ranking">Ranking</NavLink>
          </li>
          {/* <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li> */}
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
