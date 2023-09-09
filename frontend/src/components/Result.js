import React from 'react';


export default function Result(props) {


  return (
    <div className='result-wrapper'>
      <h2>Sudoku result number {props.num} in the {props.category} category</h2>
      {
        props.serendipity === 'hasard' ?
          <div className='hasard'>
            <p>All right. Congratulations!!!</p>
            <div className='btns-result'>
              <button
                onClick={() => {
                  props.selectActive(true);
                  props.resetTime();
                  props.resetTODO();
                  props.resetSerendipity();
                }
                }
              >
                NEW
              </button>
            </div>
          </div> :
          <div className='prosopagnosia'>
            <p>Something is not right.</p>
            <div className='btns-result'>
              <button
                onClick={() => {
                  props.selectActive(true);
                  props.resetTime();
                  props.resetTODO();
                  props.resetSerendipity();
                }
                }
              >
                NEW
              </button>
              <button
                onClick={() => {
                  props.resetSerendipity();
                  props.playTimeRemote();
                }
                }
              >
                BACK
              </button>
            </div>
          </div>
      }
    </div>
  )


}