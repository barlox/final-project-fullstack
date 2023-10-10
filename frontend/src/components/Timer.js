import React from "react";


export default function Timer(props) {
  
  return (
    <div className="timer-wrapper">
      <input
        type="text"
        className="timer"
        name="chronometer"
        readOnly
        value={props.timeString}
      />
    </div>
  )

}