import React, { useState } from 'react';
import '../styles/selection.scss';


export default function Selection(props) {

  const [selectCategory, setSelectCategory] = useState(false);

  const bntNumber = () => {
    return (
      Array.from(Array(49), (_, index) => {
        return (<button
          key={`btn-num-${index + 1}`}
          className='btn-num'
          onClick={
            () => {
              props.setNum(`${index + 1}`);
              props.selectActive(false);
            }
          }
        >
          {index + 1}
        </button>)
      })
    )
  }

  return (
    <div className='selection-wrapper'>
      {
        selectCategory ?
          <div>
            <h2>Select sudoku number</h2>
            <div className='number-wrapper'>
              {bntNumber()}
            </div>
          </div> :
          <div className='category-main'>
            <h2>Select category</h2>
            <div className='category-wrapper'>
              <button
                className='category-btn category-numbers'
                onClick={
                  () => {
                    setSelectCategory(true);
                    props.setCategory('numbers');
                    props.setMode('todo');
                  }
                }
              >
                1...9
              </button>
              <button
                className='category-btn category-frameworks'
                onClick={
                  () => {
                    setSelectCategory(true);
                    props.setCategory('frameworks');
                    props.setMode('todo');
                  }
                }
              >
              </button>
              <button
                className='category-btn category-fruits'
                onClick={
                  () => {
                    setSelectCategory(true);
                    props.setCategory('fruits');
                    props.setMode('todo');
                  }
                }
              >
              </button>
              <button
                className='category-btn category-multimedia'
                onClick={
                  () => {
                    setSelectCategory(true);
                    props.setCategory('multimedia');
                    props.setMode('todo');
                  }
                }
              >
              </button>
              <button
                className='category-btn category-calendar'
                onClick={
                  () => {
                    setSelectCategory(true);
                    props.setCategory('calendar');
                    props.setMode('todo');
                  }
                }
              >
              </button>
              <button
                className='category-btn category-programming'
                onClick={
                  () => {
                    setSelectCategory(true);
                    props.setCategory('programming');
                    props.setMode('todo');
                  }
                }
              >
              </button>
            </div>
          </div>
      }
    </div>
  )
}