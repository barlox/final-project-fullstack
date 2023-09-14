import React from 'react';
import '../styles/sudoku-images.scss';
import '../styles/buttons.scss';

export default function Keypad(props) {


  const padActive = props.padActive;
  const setObjUSER = props.setObjUSER;
  const categoryNUM = props.category === 'numbers';

  return (
    props.isInitial ?
      <div
        className='initial-wrapper'
      >
        <button
          id='newInitial'
          className='initial-btn'
          onClick={() => {
            props.selectActive(true);
            props.resetTime();
            props.resetTODO();
          }
          }
        >
          SELECT
        </button>
      </div> :
      <div className='keypad-wrapper'>
        <div className='pad-btn-wrapper'>
          <button
            id='pad-1'
            className={`pad-btn ${categoryNUM ? '' : props.category.concat('-1')}`}
            value='1'
            onClick={padActive ? () => setObjUSER('1') : null}
          >
            {categoryNUM ? 1 : ''}
          </button>
          <button
            id='pad-2'
            className={`pad-btn ${categoryNUM ? '' : props.category.concat('-2')}`}
            value='2'
            onClick={padActive ? () => setObjUSER('2') : null}
          >
            {categoryNUM ? 2 : ''}
          </button>
          <button
            id='pad-3'
            className={`pad-btn ${categoryNUM ? '' : props.category.concat('-3')}`}
            value='3'
            onClick={padActive ? () => setObjUSER('3') : null}
          >
            {categoryNUM ? 3 : ''}
          </button>
          <button
            id='pad-4'
            className={`pad-btn ${categoryNUM ? '' : props.category.concat('-4')}`}
            value='4'
            onClick={padActive ? () => setObjUSER('4') : null}
          >
            {categoryNUM ? 4 : ''}
          </button>
          <button
            id='pad-5'
            className={`pad-btn ${categoryNUM ? '' : props.category.concat('-5')}`}
            value='5'
            onClick={padActive ? () => setObjUSER('5') : null}
          >
            {categoryNUM ? 5 : ''}
          </button>
          <button
            id='pad-6'
            className={`pad-btn ${categoryNUM ? '' : props.category.concat('-6')}`}
            value='6'
            onClick={padActive ? () => setObjUSER('6') : null}
          >
            {categoryNUM ? 6 : ''}
          </button>
          <button
            id='pad-7'
            className={`pad-btn ${categoryNUM ? '' : props.category.concat('-7')}`}
            value='7'
            onClick={padActive ? () => setObjUSER('7') : null}
          >
            {categoryNUM ? 7 : ''}
          </button>
          <button
            id='pad-8'
            className={`pad-btn ${categoryNUM ? '' : props.category.concat('-8')}`}
            value='8'
            onClick={padActive ? () => setObjUSER('8') : null}
          >
            {categoryNUM ? 8 : ''}
          </button>
          <button
            id='pad-9'
            className={`pad-btn ${categoryNUM ? '' : props.category.concat('-9')}`}
            value='9'
            onClick={padActive ? () => setObjUSER('9') : null}
          >
            {categoryNUM ? 9 : ''}
          </button>
          <button
            id='pad-0'
            className='pad-btn delete'
            value=''
            onClick={padActive ? () => setObjUSER('') : null}
          >
          </button>
        </div>

        <div className='action-wrapper'>
          <button
            id='new'
            className='action-btn'
            onClick={() => {
              props.selectActive(true);
              props.resetTime();
              props.resetTODO();
              props.resetStates();
            }
            }
          >
            NEW
          </button>
          <button
            id='reset'
            className='action-btn'
            onClick={() => {
              props.resetObjets();
              props.resetPlayTime();
              props.resetStates();
            }
            }
          >
            RESET
          </button>
          <button
            id='pause'
            className='action-btn'
            onClick={() => {
              props.isPaused ?
                props.playTimeRemote() :
                props.pauseTime();
                props.resetStates();
            }}
          >
            {props.isPaused ? 'PLAY' : 'PAUSE'}
          </button>
        </div>
      </div>
  )
}
