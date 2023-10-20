import React, { Component } from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import axios from 'axios';
import Sudokus from "./pages/Sudokus";
import Instructions from "./pages/Instructions";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import Ranking from "./pages/Ranking";
import Settings from './pages/Settings';
import NoPage from "./pages/NoPage";
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import './styles/base.scss'


export default class App extends Component {
  constructor(props) {
    super(props);

    /**
   * isNotForm 
   * It will be false when the rendered page contains a form and
   * prevent checkSize from acting (below I explain what it is for)
   */

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      name: '',
      email: '',
      isNotForm: true,
      noFound: false,
      height: window.innerHeight,
      width: window.innerWidth
    }

    this.successfulAuth = this.successfulAuth.bind(this);
    this.successfulLogout = this.successfulLogout.bind(this);
    this.setCredentials = this.setCredentials.bind(this);
    this.deleteCredentials = this.deleteCredentials.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.setIsNotForm = this.setIsNotForm.bind(this);
    this.setNoFound = this.setNoFound.bind(this);

  }

  successfulAuth() {
    this.setState({
      loggedInStatus: 'LOGGED_IN'
    })
  }

  successfulLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN'
    })
  }

  setCredentials(credentials) {
    this.setState(credentials);
  }

  deleteCredentials() {
    this.setState({
      name: '',
      email: ''
    })
  }

  checkLoginStatus() {
    axios.get('https://sudokers.eu.pythonanywhere.com/islogged', {
      withCredentials: true
    })
      .then(response => {
        // console.log(response.data);
        this.setState({
          loggedInStatus: response.data.message,
          name: response.data.name,
          email: response.data.email
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  /**
   * checkSize 
   * This function is used to make the application responsive,
   * using it with an event handler 
   * window.addEventListener('resize', this.checkSize)
   */

  checkSize() {
    const html = document.querySelector(':root');

    if (this.state.isNotForm) {

      if (window.innerHeight > window.innerWidth) {
        html.style.setProperty('--width', `${window.innerWidth}px`);
        html.style.setProperty('--height', `${window.innerHeight}px`);        
      }
      else {
        html.style.setProperty('--width', `${window.innerHeight}px`);
        html.style.setProperty('--height', `${window.innerHeight}px`);        
      }
    }
  }

  setIsNotForm(value) {
    const html = document.querySelector(':root');

    this.setState({
      isNotForm: value
    });

    if (value) {
      html.style.setProperty('--overflow', 'hidden');
    } else {
      html.style.setProperty('--overflow', 'visible');
    }
  }

  setNoFound(value) {
    this.setState({
      noFound: value
    });
  } 
 
  componentDidMount() {
    this.checkLoginStatus();
    this.checkSize();
  }


  render() {
    window.addEventListener('resize', this.checkSize); 

    return (
      <div className='container'>

        <div className='left-container'>
          <LeftSide
            noFound={this.state.noFound}
          />
        </div>
        <div className='center-container'>
          <Routes>

            <Route path="/" element={
              <Sudokus
                state={this.state}
                setNoFound={this.setNoFound}
              />} />
            <Route path="instructions" element={
              <Instructions
                setNoFound={this.setNoFound}
              />} />

            {
              this.state.loggedInStatus === 'LOGGED_IN' ?
                null :
                <>
                  <Route path="login" element={
                    <LoginPage
                      successfulAuth={this.successfulAuth}
                      setCredentials={this.setCredentials}
                      setIsNotForm={this.setIsNotForm}
                      setNoFound={this.setNoFound}
                    />} />
                  <Route path="register" element={
                    <RegisterPage
                      successfulAuth={this.successfulAuth}
                      setCredentials={this.setCredentials}
                      setIsNotForm={this.setIsNotForm}
                      setNoFound={this.setNoFound}
                    />} />
                </>
            }

            <Route path="ranking" element={
              <Ranking
                setNoFound={this.setNoFound}
              />} />

            {
              this.state.loggedInStatus === 'LOGGED_IN' ?
                <Route path="settings" element={
                  <Settings
                    name={this.state.name}
                    email={this.state.email}
                    setIsNotForm={this.setIsNotForm}
                    setNoFound={this.setNoFound}
                    isNotForm={this.state.isNotForm}
                  />} /> :
                null
            }

            <Route path="*" element={
              <NoPage
                setNoFound={this.setNoFound}
              />} />

          </Routes>
        </div>
        <div className='right-container'>
          <RightSide
            successfulLogout={this.successfulLogout}
            deleteCredentials={this.deleteCredentials}
            isLoggedIn={this.state.loggedInStatus}
            noFound={this.state.noFound}
          />
        </div>

      </div>
    );
  }

}

