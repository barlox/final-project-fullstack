import React, { useState } from "react";


export default function Paused(props) {

  const [hasClicked, setHasClicked] = useState(false);

  return (
    <div className="paused-wrapper">
      <div className="space-10vh"></div>

      <div className="paused-title">
        <h2>GAME PAUSED</h2>
      </div>

      <div className="space-10vh"></div>

      <div className="paused-bkg-img"></div>

      <div className="space-10vh"></div>

      <div className="paused-btn">
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

      <div className="space-10vh"></div>
    </div>
  )
}