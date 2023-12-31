import React from "react";
import { useLocation } from 'react-router-dom';


export default function LeftSide(props) {

  let classStyle = '';
  let location = useLocation();

  /**
   * This conditional adds a different class to 
   * the Header component, depending on the location
   */

  if (props.noFound) {
    classStyle = 'sudoku-color';
  } else {
    switch (location.pathname) {
      case '/':
        classStyle = 'sudoku-color';
        break;
      case '/instructions':
        classStyle = 'instructions-color';
        break;
      case '/ranking':
        classStyle = 'ranking-color';
        break;
      case '/login':
        classStyle = 'login-color';
        break;
      case '/register':
        classStyle = 'register-color';
        break;
      case '/settings':
        classStyle = 'settings-color';
        break;
      default:
        classStyle = 'sudoku-color';
    }
  }


  return (
    <header
      className={`${classStyle}`}
    >

      <div className="brand">
        <div></div>
        <div className="letter-brand">S</div>
        <div className="letter-brand">U</div>
        <div className="letter-brand">D</div>
        <div className="logo-2"></div>
        <div className="letter-brand">K</div>
        <div className="letter-brand">E</div>
        <div className="letter-brand">R</div>
        <div className="letter-brand">S</div>
        <div></div>
      </div>

    </header>
  )
}