import React from 'react';


export default function SudokuTemplate(props) {

  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const { initial, ObjTODO, ObjUSER_TODO, category, todo, padActive, keyActive } = props.state;

  const categoryNUM = category === 'numbers';

  const isInitial = Boolean(Object.keys(initial).length);

  const isTODO = Boolean(todo.length);

  const numbrsLetters = () => {
    return (
      letters.map((letter) => {
        return (
          <div
            id={`${letter}-box`}
            key={`box-${letter}`}
            className='grid'
          >
            {nums.map((num) => {
              return (
                <button
                  id={`${letter}${num}`}
                  key={`btn-${letter}${num}`}
                  className={
                    `btn ${isInitial ?
                      initial[`${letter}${num}`] ?
                        'initial' : '' : ''}
                      ${!categoryNUM && !isInitial ?
                      category.concat('-', ObjUSER_TODO[letter.concat(num)]) :
                      ''}
                      ${padActive && keyActive === letter.concat(num) ?
                      'key-active' :
                      ''
                    }`
                  }
                  onClick={
                    isTODO && !Boolean(ObjTODO[`${letter}${num}`]) ?
                      () => {
                        props.setPadActive();
                        props.setKey(`${letter}${num}`)
                      } :
                      null
                  }
                >
                  {
                    isInitial ?
                      initial[`${letter}${num}`] :
                      categoryNUM ?
                        ObjUSER_TODO[`${letter}${num}`] :
                        ''
                  }
                </button>
              )
            })}
          </div>)
      })
    )
  }


  return (
    <div className="grid-wrapper">{numbrsLetters()}</div>
  );
}
