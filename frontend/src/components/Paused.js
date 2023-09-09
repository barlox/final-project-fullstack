import React from "react";


export default function Paused(props) {


  return (
    <div
      className="paused-wrapper"
    >
      <h2>GAME PAUSED</h2>
      <button
        onClick={props.playTimeRemote}
      >
        CONTINUE
      </button>
    </div>
  )
}