import React, { Component } from "react";
import axios from 'axios';
import SudokuTemplate from "../components/SudokuTemplate";
import Keypad from "../components/Keypad";
import Selection from "../components/Selection";
import Result from "../components/Result";
import Timer from "../components/Timer";
import Paused from "../components/Paused";
import Welcome from "../components/Welcome";

class Sudokus extends Component {
  constructor(props) {
    super(props);

    /**
   * todo 
   * In this array the sudoku to be performed will be stored
   * 
   * padActive
   * true when an active sudoku square is selected
   * 
   * keyActive
   * It is the id of the selected box
   * 
   * selectActive
   * It is true by clicking the Select button and selecting
   * the category and number of sudoku to play
   *  
   * serendipity
   * It is false, as long as the entire sudoku has not been completed.
   * Once completed, it is the condition to make a request to the server
   * to check the result of the sudoku, serendipity, will be its value if
   *  it is correct and hazard if it is incorrect
   * 
   * time
   * Stores the instance of the Date object
   * 
   * playTime
   * Stores the value of setInterval for time management
   * 
   * isPaused
   * true, if the game is paused
   * 
   * initial
   * Stores the welcome message that appears in the sudoku
   * 
   * ObjTODO, ObjUSER and ObjUSER_TODO
   * Stores as an object the key that will be the id of the box,
   * and the associated value, of the sudoku to be done,
   * the one the user is filling in,
   * and the two together, respectively.
   */

    this.state = {
      'todo': [],
      'num': '',
      'category': '',
      'mode': '',
      'padActive': false,
      'keyActive': '',
      'selectActive': false,
      'serendipity': false,
      'time': this.setZero(),
      'playTime': '',
      'timeString': '0:00:00',
      'isPaused': false,
      'initial': { "a1": "", "a2": "", "a3": "E", "a4": "", "a5": "", "a6": "", "a7": "", "a8": "S", "a9": "O", "b1": "N", "b2": "J", "b3": "O", "b4": "", "b5": "", "b6": "", "b7": "L", "b8": "V", "b9": "I", "c1": "Y", "c2": "", "c3": "", "c4": "", "c5": "", "c6": "", "c7": "N", "c8": "G", "c9": "", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "S", "d6": "U", "d7": "", "d8": "", "d9": "", "e1": "", "e2": "", "e3": "", "e4": "D", "e5": "O", "e6": "K", "e7": "", "e8": "", "e9": "", "f1": "", "f2": "", "f3": "", "f4": "U", "f5": "S", "f6": "", "f7": "", "f8": "", "f9": "", "g1": "", "g2": "", "g3": "C", "g4": "", "g5": "", "g6": "", "g7": "", "g8": "", "g9": "B", "h1": "L", "h2": "I", "h3": "C", "h4": "", "h5": "", "h6": "", "h7": "E", "h8": "L", "h9": "O", "i1": "K", "i2": "", "i3": "", "i4": "", "i5": "", "i6": "", "i7": "W", "i8": "", "i9": "" },
      'ObjTODO': { "a1": "", "a2": "", "a3": "", "a4": "", "a5": "", "a6": "", "a7": "", "a8": "", "a9": "", "b1": "", "b2": "", "b3": "", "b4": "", "b5": "", "b6": "", "b7": "", "b8": "", "b9": "", "c1": "", "c2": "", "c3": "", "c4": "", "c5": "", "c6": "", "c7": "", "c8": "", "c9": "", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "", "d8": "", "d9": "", "e1": "", "e2": "", "e3": "", "e4": "", "e5": "", "e6": "", "e7": "", "e8": "", "e9": "", "f1": "", "f2": "", "f3": "", "f4": "", "f5": "", "f6": "", "f7": "", "f8": "", "f9": "", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "", "g8": "", "g9": "", "h1": "", "h2": "", "h3": "", "h4": "", "h5": "", "h6": "", "h7": "", "h8": "", "h9": "", "i1": "", "i2": "", "i3": "", "i4": "", "i5": "", "i6": "", "i7": "", "i8": "", "i9": "" },
      'ObjUSER': { "a1": "", "a2": "", "a3": "", "a4": "", "a5": "", "a6": "", "a7": "", "a8": "", "a9": "", "b1": "", "b2": "", "b3": "", "b4": "", "b5": "", "b6": "", "b7": "", "b8": "", "b9": "", "c1": "", "c2": "", "c3": "", "c4": "", "c5": "", "c6": "", "c7": "", "c8": "", "c9": "", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "", "d8": "", "d9": "", "e1": "", "e2": "", "e3": "", "e4": "", "e5": "", "e6": "", "e7": "", "e8": "", "e9": "", "f1": "", "f2": "", "f3": "", "f4": "", "f5": "", "f6": "", "f7": "", "f8": "", "f9": "", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "", "g8": "", "g9": "", "h1": "", "h2": "", "h3": "", "h4": "", "h5": "", "h6": "", "h7": "", "h8": "", "h9": "", "i1": "", "i2": "", "i3": "", "i4": "", "i5": "", "i6": "", "i7": "", "i8": "", "i9": "" },
      'ObjUSER_TODO': {}
    };    


    this.getNewSudokuTodo = this.getNewSudokuTodo.bind(this);
    this.setArrayToObject = this.setArrayToObject.bind(this);
    this.setObjUSER = this.setObjUSER.bind(this);
    this.setPadActive = this.setPadActive.bind(this);
    this.setKey = this.setKey.bind(this);
    this.selectActive = this.selectActive.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.setNum = this.setNum.bind(this);
    this.setMode = this.setMode.bind(this);
    this.checkSudokuCompleted = this.checkSudokuCompleted.bind(this);
    this.setZero = this.setZero.bind(this);
    this.playTime = this.playTime.bind(this);
    this.playTimeRemote = this.playTimeRemote.bind(this);
    this.pauseTime = this.pauseTime.bind(this);
    this.resetObjets = this.resetObjets.bind(this);
    this.resetPlayTime = this.resetPlayTime.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.resetTODO = this.resetTODO.bind(this);
    this.resetSerendipity = this.resetSerendipity.bind(this);
    this.resetStates = this.resetStates.bind(this);
    this.stopTime = this.stopTime.bind(this);

  }

  getNewSudokuTodo(value) {
    axios.get('https://sudokers.eu.pythonanywhere.com/sudokus', {
      category: this.state.category,
      num: value,
      mode: this.state.mode
    })
      .then((response) => {
        this.setState({
          [this.state.mode]: JSON.parse(response.data['result'])
        });

        this.setArrayToObject(JSON.parse(response.data['result']), `Obj${this.state.mode.toUpperCase()}`);

        this.setState({
          'initial': {}
        });

        this.resetPlayTime();

      })
      .catch((error) => {
        console.log(error, 'error');
      }
      );
  }

  checkSudokuCompleted(num, category, sudokuToCheck) {
    axios.get('https://sudokers.eu.pythonanywhere.com/sudokuCheck', {
      num: num,
      category: category,
      completed: sudokuToCheck
    })
      .then((response) => {
        if (response.data['result'] === 'ok') {
          this.setState({
            'serendipity': 'hasard'
          });
        } else {
          this.setState({
            'serendipity': 'prosopagnosia'
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }



  setArrayToObject(arr, obj) {
    const objectEmpty = { "a1": "", "a2": "", "a3": "", "a4": "", "a5": "", "a6": "", "a7": "", "a8": "", "a9": "", "b1": "", "b2": "", "b3": "", "b4": "", "b5": "", "b6": "", "b7": "", "b8": "", "b9": "", "c1": "", "c2": "", "c3": "", "c4": "", "c5": "", "c6": "", "c7": "", "c8": "", "c9": "", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "", "d8": "", "d9": "", "e1": "", "e2": "", "e3": "", "e4": "", "e5": "", "e6": "", "e7": "", "e8": "", "e9": "", "f1": "", "f2": "", "f3": "", "f4": "", "f5": "", "f6": "", "f7": "", "f8": "", "f9": "", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "", "g8": "", "g9": "", "h1": "", "h2": "", "h3": "", "h4": "", "h5": "", "h6": "", "h7": "", "h8": "", "h9": "", "i1": "", "i2": "", "i3": "", "i4": "", "i5": "", "i6": "", "i7": "", "i8": "", "i9": "" };

    Object.keys(objectEmpty)
      .forEach((key, index) => {
        objectEmpty[key] = arr[index]
      });

    this.setState({
      [obj]: objectEmpty,
      'ObjUSER_TODO': objectEmpty
    });

  }

  setKey(key) {
    this.setState({
      'keyActive': key
    })
  }

  setObjUSER(value) {
    const ObjUSER_TODO = {};
    const ObjUSER = { ...this.state.ObjUSER };
    const ObjTODO = { ...this.state.ObjTODO };

    ObjUSER[this.state.keyActive] = value;


    this.setState({
      'ObjUSER': ObjUSER,
      'padActive': false,
      'keyActive': ''
    });


    for (const key in ObjUSER) {
      if (ObjTODO[key]) {
        ObjUSER_TODO[key] = ObjTODO[key];
      } else {
        ObjUSER_TODO[key] = ObjUSER[key];
      }
    }

    this.setState({
      'ObjUSER_TODO': ObjUSER_TODO
    });

    const ObjUserTodo = Object.values(ObjUSER_TODO);

    if (ObjUserTodo.filter(value => value).length === 81) {
      this.checkSudokuCompleted(this.state.num, this.state.category, ObjUserTodo);
      this.stopTime();
    }

  }

  setPadActive() {
    this.setState({
      'padActive': true
    })
  }

  selectActive(value) {
    this.setState({
      'selectActive': value
    })
  }

  setCategory(value) {
    this.setState({
      'category': value
    });
  }

  setNum(num) {
    this.setState({
      'num': num
    });
    this.getNewSudokuTodo(num);
  }

  setMode(mode) {
    this.setState({
      'mode': mode
    });
  }

  setZero() {
    const time = new Date();

    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);

    return time;
  }

  playTime() {

    this.setState({
      'isPaused': false
    })

    const play = setInterval(() => {
      const time = this.state.time;
      const getTime = time.getTime();

      time.setTime(getTime + 1000);

      const timeNow = time.toLocaleTimeString();

      this.setState({
        'time': time,
        'timeString': timeNow
      });

    }, 1000);

    return play;
  }

  playTimeRemote() {
    this.setState({
      'playTime': this.playTime()
    });
  }

  pauseTime() {
    clearInterval(this.state.playTime);

    this.setState({
      'isPaused': true
    });
  }

  stopTime() {
    clearInterval(this.state.playTime);
  }

  resetObjets() {
    this.setState({
      'ObjUSER': { "a1": "", "a2": "", "a3": "", "a4": "", "a5": "", "a6": "", "a7": "", "a8": "", "a9": "", "b1": "", "b2": "", "b3": "", "b4": "", "b5": "", "b6": "", "b7": "", "b8": "", "b9": "", "c1": "", "c2": "", "c3": "", "c4": "", "c5": "", "c6": "", "c7": "", "c8": "", "c9": "", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "", "d8": "", "d9": "", "e1": "", "e2": "", "e3": "", "e4": "", "e5": "", "e6": "", "e7": "", "e8": "", "e9": "", "f1": "", "f2": "", "f3": "", "f4": "", "f5": "", "f6": "", "f7": "", "f8": "", "f9": "", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "", "g8": "", "g9": "", "h1": "", "h2": "", "h3": "", "h4": "", "h5": "", "h6": "", "h7": "", "h8": "", "h9": "", "i1": "", "i2": "", "i3": "", "i4": "", "i5": "", "i6": "", "i7": "", "i8": "", "i9": "" },
      'ObjUSER_TODO': { ...this.state.ObjTODO }
    })
  }

  resetTODO() {
    this.setState({
      'todo': [],
      'ObjTODO': { "a1": "", "a2": "", "a3": "", "a4": "", "a5": "", "a6": "", "a7": "", "a8": "", "a9": "", "b1": "", "b2": "", "b3": "", "b4": "", "b5": "", "b6": "", "b7": "", "b8": "", "b9": "", "c1": "", "c2": "", "c3": "", "c4": "", "c5": "", "c6": "", "c7": "", "c8": "", "c9": "", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "", "d8": "", "d9": "", "e1": "", "e2": "", "e3": "", "e4": "", "e5": "", "e6": "", "e7": "", "e8": "", "e9": "", "f1": "", "f2": "", "f3": "", "f4": "", "f5": "", "f6": "", "f7": "", "f8": "", "f9": "", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "", "g8": "", "g9": "", "h1": "", "h2": "", "h3": "", "h4": "", "h5": "", "h6": "", "h7": "", "h8": "", "h9": "", "i1": "", "i2": "", "i3": "", "i4": "", "i5": "", "i6": "", "i7": "", "i8": "", "i9": "" },
      'ObjUSER': { "a1": "", "a2": "", "a3": "", "a4": "", "a5": "", "a6": "", "a7": "", "a8": "", "a9": "", "b1": "", "b2": "", "b3": "", "b4": "", "b5": "", "b6": "", "b7": "", "b8": "", "b9": "", "c1": "", "c2": "", "c3": "", "c4": "", "c5": "", "c6": "", "c7": "", "c8": "", "c9": "", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "", "d8": "", "d9": "", "e1": "", "e2": "", "e3": "", "e4": "", "e5": "", "e6": "", "e7": "", "e8": "", "e9": "", "f1": "", "f2": "", "f3": "", "f4": "", "f5": "", "f6": "", "f7": "", "f8": "", "f9": "", "g1": "", "g2": "", "g3": "", "g4": "", "g5": "", "g6": "", "g7": "", "g8": "", "g9": "", "h1": "", "h2": "", "h3": "", "h4": "", "h5": "", "h6": "", "h7": "", "h8": "", "h9": "", "i1": "", "i2": "", "i3": "", "i4": "", "i5": "", "i6": "", "i7": "", "i8": "", "i9": "" },
      'ObjUSER_TODO': {},
      'num': '',
      'category': ''
    });
  }

  resetPlayTime() {
    if (this.state.playTime) {
      clearInterval(this.state.playTime);
    };

    this.setState({
      'time': this.setZero(),
      'timeString': '0:00:00',
      'playTime': this.playTime()
    });

  }

  resetTime() {
    if (this.state.playTime) {
      clearInterval(this.state.playTime);
    };

    this.setState({
      'time': this.setZero(),
      'timeString': '0:00:00'
    });
  }

  resetSerendipity() {
    this.setState({
      'serendipity': false
    })
  }

  resetStates() {
    this.setState({
      'padActive': false,
      'keyActive': ''
    })
  }


  componentWillUnmount() {
    this.resetTime();
  }

  componentDidMount() {
    this.props.setNoFound(false);
  }


  render() {

    if (this.state.serendipity) {
      return (
          <Result
            name={this.props.state.name}
            loggedInStatus={this.props.state.loggedInStatus}
            serendipity={this.state.serendipity}
            category={this.state.category}
            num={this.state.num}
            timeString={this.state.timeString}
            time={this.state.time}
            selectActive={this.selectActive}
            resetTime={this.resetTime}
            resetTODO={this.resetTODO}
            resetObjets={this.resetObjets}
            resetSerendipity={this.resetSerendipity}
            playTimeRemote={this.playTimeRemote}
          />
      );
    } else if (this.state.selectActive) {
      return (
        <div className="sudoku-selection">
          <Selection
            setCategory={this.setCategory}
            selectActive={this.selectActive}
            setNum={this.setNum}
            setMode={this.setMode}
          />
        </div>
      );
    } else if (this.state.isPaused) {
      return (
        <div className="sudoku-paused">
          <Paused
            playTimeRemote={this.playTimeRemote}
          />
        </div>
      );
    } else {
      return (
        <div
          className={
            `sudoku-wrapper ${Object.values(this.state.initial).length ? 'sudoku-initial' : ''}`
            }
        >
          {
            this.props.state.loggedInStatus === 'LOGGED_IN' && Object.values(this.state.initial).length ?
              <Welcome
                name={this.props.state.name}
              /> :
              <Timer
                timeString={this.state.timeString}
              />
          }
          <SudokuTemplate
            state={this.state}
            setPadActive={this.setPadActive}
            setKey={this.setKey}
          />

          <Keypad
            padActive={this.state.padActive}
            setObjUSER={this.setObjUSER}
            category={this.state.category}
            selectActive={this.selectActive}
            pauseTime={this.pauseTime}
            resetObjets={this.resetObjets}
            resetTODO={this.resetTODO}
            isPaused={this.state.isPaused}
            playTimeRemote={this.playTimeRemote}
            resetPlayTime={this.resetPlayTime}
            resetTime={this.resetTime}
            isInitial={!Boolean(this.state.todo.length)}
            resetStates={this.resetStates}
          />
        </div>
      );
    }
  }
}

export default Sudokus;
