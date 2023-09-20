import React, { Component } from 'react';
import axios from 'axios';
import '../styles/ranking.scss'


export default class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: 0,
      selectedNumber: 1
    }

    this.categoryImg = ['category-numbers', 'category-frameworks', 'category-fruits', 'category-multimedia', 'category-calendar', 'category-programming'];
    this.categoryName = ['Numbers', 'Frameworks', 'Fruits', 'Multimedia', 'Calendar', 'Programming'];

    this.selectRanking = this.selectRanking.bind(this);
    this.getRankings = this.getRankings.bind(this);
  }


  getRankings() {
    axios.get('http://127.0.0.1:5000/rankings')
    .then(response  => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    })
  }

  componentDidMount() {
    this.getRankings();
  }

  selectRanking(operation, type) {

    if (operation === 'less' && type === 'number') {
      this.setState({
        selectedNumber: this.state.selectedNumber > 1 ?
          this.state.selectedNumber - 1 :
          this.state.selectedNumber
      });
    } else if (operation === 'more' && type === 'number') {
      this.setState({
        selectedNumber: this.state.selectedNumber < 48 ?
          this.state.selectedNumber + 1 :
          this.state.selectedNumber
      });
    } else if (operation === 'less' && type === 'category') {
      this.setState({
        selectedCategory: this.state.selectedCategory > 0 ?
          this.state.selectedCategory - 1 :
          this.state.selectedCategory
      });
    } else if (operation === 'more' && type === 'category') {
      this.setState({
        selectedCategory: this.state.selectedCategory < 5 ?
          this.state.selectedCategory + 1 :
          this.state.selectedCategory
      });
    }
  }


  render() {
    return (
      <div className='ranking-wrapper'>

        <div className='title-ranking'>
          <h1>Ranking</h1>
        </div>

        <div className='selection-ranking-wrapper'>

          <div className='selection-ranking-title'>
            {this.categoryName[this.state.selectedCategory]}
          </div>

          <div className='range-ranking'>
            <button
              className='less-rank btn-rank'
              onClick={() => {
                this.selectRanking('less', 'category')
              }
              }
            >
            </button>

            <div className='selection-ranking-img-btn'>
              <div className={
                `selection ${this.categoryImg[this.state.selectedCategory]}`
              }
              >
              </div>
            </div>
            <button
              className='more-rank btn-rank'
              onClick={() => {
                this.selectRanking('more', 'category')
              }
              }
            >
            </button>
          </div>
        </div>

        <div className='selection-ranking-wrapper'>

          <div className='selection-ranking-title'>Sudoku</div>

          <div className='range-ranking'>
            <button
              className='less-rank btn-rank'
              onClick={() => {
                this.selectRanking('less', 'number')
              }
              }
            >
            </button>

            <div className='selection-ranking-img-btn'>
              <div className='selection selection-number'>
                {this.state.selectedNumber}
              </div>
            </div>
            <button
              className='more-rank btn-rank'
              onClick={() => {
                this.selectRanking('more', 'number')
              }
              }
            >
            </button>
          </div>
        </div>
        <div className='space'></div>
        <div className='ranking-podium-wrapper'>
          <div className='position-wrapper'>
            <div className='position-title'>Position</div>
            <div className='position position-first'></div>
            <div className='position position-second'></div>
            <div className='position position-third'></div>
          </div>

          <div className='name-wrapper'>
            <div className='name-title'>Name</div>
            <div className='name'>noname</div>
            <div className='name'>noname</div>
            <div className='name'>noname</div>
          </div>
          
          <div className='time-wrapper'>
            <div className='time-title'>Time</div>
            <div className='time'>--:--:--</div>
            <div className='time'>--:--:--</div>
            <div className='time'>--:--:--</div> 
          </div>
        </div>

      </div>
    );
  }
}
