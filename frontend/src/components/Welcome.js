import React from "react";


export default function Welcome(props) {


  return (
    <div
      className="welcome-wrapper"
    >
      <h1>{`Hi ${props.name}!`}</h1>
    </div>
  )
}