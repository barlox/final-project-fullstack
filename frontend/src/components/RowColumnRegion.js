import React from "react";


const RowColumnRegion = () => {

  const numbers = [3, 5, 1, 4, 9, 6, 7, 2, 8];

  const boxes = () => {
    return (Array.from(Array(9), (_, index) => {
      return (<div
        key={`examp-${index}`}
        className={`example-element examp-${index}`}
      >
        {numbers[index]}
      </div>);
    }))
  }

  return (
    <div className="example-wrapper">
      <div className="example example-1">{boxes().slice(0, 3)}</div>
      <div className="example example-2">{boxes().slice(3, 6)}</div>
      <div className="example example-3">{boxes().slice(6)}</div>
    </div>
  );
}

export default RowColumnRegion;