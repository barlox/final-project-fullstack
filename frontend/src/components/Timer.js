import React from "react";
// import '../styles/timer.scss'


export default function Timer(props) {
  
  return (
    <div className="timer-wrapper">
      <input
        type="text"
        className="timer"
        readOnly
        value={props.timeString}
      />
    </div>
  )

}