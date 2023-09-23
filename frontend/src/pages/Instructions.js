import React from 'react';
import Carousel from "nuka-carousel";
import RowColumnRegion from '../components/RowColumnRegion';
import '../styles/instructions.scss'


const Instructions = () => {


  return (
    <Carousel
      enableKeyboardControls={true}
    >
      <div className='slide-wrapper slide-1'>
        <h1>Sudoku</h1>
        <div className='slide-content'>
          Sudoku is a mathematical game that was invented in the late 1970s, gained popularity in Japan in the 1980s, and became internationally known in 2005, when numerous newspapers began publishing it in their pastimes sections.
        </div>
        <div className='space-32'></div>
        <div className='slide-content'>
          In the 18th century, the famous Swiss mathematician Leonhard Euler created a system of probabilities to represent a series of numbers without repeating themselves. For this reason, Euler is considered the inventor of this game.
        </div>
        <div className='space-16'></div>
        <div className='slide-content small'>Wikipedia</div>
      </div>
      <div className='slide-wrapper slide-2'>
        <h1>Game rules</h1>
        <h2>Rows</h2>
        <RowColumnRegion />
        <div className='space-16'></div>
        <div className='slide-content'>
          In traditional Sudoku, there are nine rows. Each row must contain the
          numbers 1, 2, 3, 4, 5, 6, 7, 8 and 9. There cannot be repeated numbers in any of the rows. That is, there cannot be two rows in which the combination of numbers is the same.
        </div>
        <div className='space-16'></div>
        <div className='slide-content'>
          In the example, the numbers 3, 9, and 2 are the default numbers. That is, the numbers that are already placed in the game. These numbers cannot be changed. The rest of the numbers are the numbers that the player has placed to complete the row.
        </div>
      </div>
      <div className='slide-wrapper slide-3'>
        <h1>Game rules</h1>
        <h2>Columns</h2>
        <div className='slide-content-wrapper'>
          <RowColumnRegion />
          <div className='slide-content'>
            In traditional Sudoku there are 9 columns.
            <br />
            The Sudoku rule for rows applies to columns. Again, there cannot be repeated numbers in the same column and the combination of numbers appearing in each of them must be unique.
          </div>
        </div>
        <div className='space-16'></div>
        <div className='slide-content'>
          In the example, the numbers 3, 9, and 2 are the default numbers. They cannot be changed. The player must complete the rest of the numbers.
        </div>
      </div>
      <div className='slide-wrapper slide-4'>
        <h1>Game rules</h1>
        <h2>Regions</h2>
        <RowColumnRegion />
        <div className='space-16'></div>
        <div className='slide-content'>
          A region is a 3x3 box like the one shown in the example. In traditional Sudoku there are 9 regions.
        </div>
        <div className='space-16'></div>
        <div className='slide-content'>
          As with rows and columns, each region must also contain the numbers 1, 2, 3, 4, 5, 6, 7, 8, and 9. The numbers cannot be repeated in any region. Each region must be different and unique.
        </div>
        <div className='space-16'></div>
        <div className='slide-content'>
          In the example, 3, 9, and 2 are the default numbers. The player must fill in the rest of the numbers to complete the region.
        </div>
      </div>
      <div className='slide-wrapper slide-5'>
        <h1>Summary</h1>
        <div className='slide-content'>
          The main rule of Sudoku is to complete it so that each row, each column and each region contains all the numbers from one to nine only once.
        </div>
        <div className='space-16'></div>
        <div className='slide-content'>
          There is only one possible solution for each correctly designed Sudoku game.
        </div>
        <div className='space-16'></div>
        <div className='slide-content'>
          On this page you will find sudokus that replace numbers with images, this adds difficulty and appeal to the game.
          The rules are the same, do not repeat images in rows, columns or regions.
        </div>
        <div className='space-16'></div>
        <div className='slide-content'>Enjoy!!!</div>
      </div>
    </Carousel>
  );
};

export default Instructions;
