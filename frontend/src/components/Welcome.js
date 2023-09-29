import React from "react";
// import '../styles/welcome.scss'


export default function Welcome(props) {


  return (
    <div
      className="welcome-wrapper"
    >
      <h1>{`Welcome ${props.name.toUpperCase()}`}</h1>
    </div>
  )
}