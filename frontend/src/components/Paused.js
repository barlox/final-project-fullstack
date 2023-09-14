import React, { useState } from "react";


export default function Paused(props) {

  const [hasClicked, setHasClicked] = useState(false);

  return (
    <div
      className="paused-wrapper"
    >
      <h2>GAME PAUSED</h2>
      {
        hasClicked ?
          <button>CONTINUING</button> :
          <button
            onClick={
              hasClicked ?
                null :
                () => {
                  setHasClicked(true);
                  props.playTimeRemote();
                }
            }
          >
            CONTINUE
          </button>
      }
    </div>
  )
}