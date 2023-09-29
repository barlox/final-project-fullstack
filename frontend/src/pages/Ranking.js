import React, { Component } from 'react';
import axios from 'axios';
// import '../styles/ranking.scss'


export default class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: 0,
      selectedNumber: 1,
      first: {
        name: 'noname',
        time: '--:--:--'
      },
      second: {
        name: 'noname',
        time: '--:--:--'
      },
      third: {
        name: 'noname',
        time: '--:--:--'
      }
    }

    this.categoryImg = ['category-numbers', 'category-frameworks', 'category-fruits', 'category-multimedia', 'category-calendar', 'category-programming'];
    this.categoryName = ['Numbers', 'Frameworks', 'Fruits', 'Multimedia', 'Calendar', 'Programming'];

    this.selectRanking = this.selectRanking.bind(this);
    this.getRankings = this.getRankings.bind(this);
    this.getTime = this.getTime.bind(this);
  }


  getRankings(category, num) {
    axios.post('http://127.0.0.1:5000/searchTopRankings', {
      category: category,
      num: num
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          first: response.data.first,
          second: response.data.second,
          third: response.data.third
        });
      })
      .catch(error => {
        console.error(error);
      })
  }


  getTime(time) {
    function twoChar(value) {
      value = `${value}`;
      return value.length === 1 ?
        '0'.concat(value) :
        value;
    }

    if (typeof time === 'number') {
      let hours, minutes, seconds;
      hours = Math.floor(time / 3600);
      time -= hours * 3600;
      minutes = Math.floor(time / 60);
      time -= minutes * 60;
      seconds = Math.floor(time);

      return `${twoChar(hours)}:${twoChar(minutes)}:${twoChar(seconds)}`;
    } else {
      return '--:--:--';
    }
  }


  selectRanking(operation, type) {

    let number = this.state.selectedNumber;
    let category = this.state.selectedCategory;

    if (operation === 'less' && type === 'number') {
      this.setState({
        selectedNumber: this.state.selectedNumber > 1 ?
          this.state.selectedNumber - 1 :
          this.state.selectedNumber
      });
      if (number > 1) {
        this.getRankings(this.categoryName[category].toLowerCase(), `${number - 1}`);
      }
    } else if (operation === 'more' && type === 'number') {
      this.setState({
        selectedNumber: this.state.selectedNumber < 48 ?
          this.state.selectedNumber + 1 :
          this.state.selectedNumber
      });
      if (number < 48) {
        this.getRankings(this.categoryName[category].toLowerCase(), `${number + 1}`);
      }
    } else if (operation === 'less' && type === 'category') {
      this.setState({
        selectedCategory: this.state.selectedCategory > 0 ?
          this.state.selectedCategory - 1 :
          this.state.selectedCategory
      });
      if (category > 0) {
        this.getRankings(this.categoryName[category - 1].toLowerCase(), `${number}`);
      }
    } else if (operation === 'more' && type === 'category') {
      this.setState({
        selectedCategory: this.state.selectedCategory < 5 ?
          this.state.selectedCategory + 1 :
          this.state.selectedCategory
      });
      if (category < 5) {
        this.getRankings(this.categoryName[category + 1].toLowerCase(), `${number}`);
      }
    }
  }

  componentDidMount() {
    this.getRankings(this.categoryName[this.state.selectedCategory].toLowerCase(), `${this.state.selectedNumber}`);
  }


  render() {
    return (
      <div className='ranking-wrapper'>
        <div className='space-32'></div>
        <div className='title-ranking'>
          <h1>Ranking</h1>
        </div>
        <div className='space-32'></div>
        <div className='selection-ranking-wrapper'>

          <div className='selection-ranking-title'>
            {this.categoryName[this.state.selectedCategory]}
          </div>

          <div className='range-ranking'>
            <button
              className='less-rank btn-rank'
              onClick={() => {
                this.selectRanking('less', 'category');
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
                this.selectRanking('more', 'category');
              }
              }
            >
            </button>
          </div>
        </div>
        <div className='space-32'></div>
        <div className='selection-ranking-wrapper'>

          <div className='selection-ranking-title'>Sudoku</div>

          <div className='range-ranking'>
            <button
              className='less-rank btn-rank'
              onClick={() => {
                this.selectRanking('less', 'number');
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
                this.selectRanking('more', 'number');
              }
              }
            >
            </button>
          </div>
        </div>
        <div className='space-32'></div>
        <div className='ranking-podium-wrapper'>
          <div className='position-wrapper'>
            <div className='position-title'>Position</div>
            <div className='position position-first'></div>
            <div className='position position-second'></div>
            <div className='position position-third'></div>
          </div>

          <div className='name-wrapper'>
            <div className='name-title'>Name</div>
            <div className='name'>{this.state.first.name}</div>
            <div className='name'>{this.state.second.name}</div>
            <div className='name'>{this.state.third.name}</div>
          </div>

          <div className='time-wrapper'>
            <div className='time-title'>Time</div>
            <div className='time'>{this.getTime(this.state.first.time)}</div>
            <div className='time'>{this.getTime(this.state.second.time)}</div>
            <div className='time'>{this.getTime(this.state.third.time)}</div>
          </div>
        </div>

      </div>
    );
  }
}
