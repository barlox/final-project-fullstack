import React, { useEffect } from "react";
import axios from 'axios';


export default function Result(props) {

  const parseTime = time => {
    let total = 0;
    total += time.getHours() * 3600;
    total += time.getMinutes() * 60;
    total += time.getSeconds();
    return total;
  }

  const updateRanking = () => {
    axios.post('https://sudokers.eu.pythonanywhere.com/ranking/checkRanking', {
      name: props.name,
      category: props.category,
      num: props.num,
      time: parseTime(props.time),
      attemp: 1
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error, 'error');
      });
  }

  useEffect(() => {
    if (props.loggedInStatus === 'LOGGED_IN' && props.serendipity === 'hasard') {
      updateRanking();
    };
    // eslint-disable-next-line 
  }, []);

  return (
    <div className='result-wrapper'>
      <div className="space-10vh"></div>
      {
        props.serendipity === 'hasard' ?

          <div className='hasard'>
            <div className='hasard-title'>
              <h2>Congratulations! All right</h2>
            </div>

            <div className="space-16"></div>

            <div className='hasard-bkg-img'></div>

            <div className="space-16"></div>

            <div className='hasard-result-wrapper'>
              <div className='hasard-result'>
                <h3>Your time</h3>
                <div className='hasard-time'>{props.timeString}</div>
              </div>
              <div className="space-32"></div>
              <div className='hasard-result-suggestion'>
                If you are registered, check if your time is in the top three.
              </div>
            </div>

            <div className="space-32"></div>

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
          </div>

          :

          <div className='prosopagnosia'>
            <div className='prosopagnosia-title'>
              <h2>Oops! Something is not right</h2>
            </div>

            <div className="space-10vh"></div>

            <div className='prosopagnosia-bkg-img'></div>

            <div className="space-10vh"></div>

            <div className='prosopagnosia-suggestion'>
              You can go back and try to solve it or start a new sudoku, it's up to you.
            </div>

            <div className="space-10vh"></div>

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

      <div className="space-10vh"></div>
    </div>
  )


}