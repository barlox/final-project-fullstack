import React, { Component } from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import axios from 'axios';
// import Layout from "./pages/Layout";
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

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      name: '',
      email: '',
      heightInner: window.innerHeight,
      withInner: window.innerWidth
    }

    this.successfulAuth = this.successfulAuth.bind(this);
    this.successfulLogout = this.successfulLogout.bind(this);
    this.setCredentials = this.setCredentials.bind(this);
    this.deleteCredentials = this.deleteCredentials.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
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
    axios.get('http://127.0.0.1:5000/islogged', {
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
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

  componentDidMount() {
    this.checkLoginStatus();
  }


  render() {
    return (
      <div className='container'>

        <div className='left-container'>
          <LeftSide />
        </div>
        <div className='center-container'>
          <Routes>

            <Route path="/" element={
              <Sudokus
                state={this.state}
              />} />
            <Route path="instructions" element={<Instructions />} />

            {
              this.state.loggedInStatus === 'LOGGED_IN' ?
                null :
                <>
                  <Route path="login" element={
                    <LoginPage
                      successfulAuth={this.successfulAuth}
                      setCredentials={this.setCredentials}
                    />} />
                  <Route path="register" element={
                    <RegisterPage
                      successfulAuth={this.successfulAuth}
                      setCredentials={this.setCredentials}
                    />} />
                </>
            }

            <Route path="ranking" element={<Ranking />} />

            {
              this.state.loggedInStatus === 'LOGGED_IN' ?
                <Route path="settings" element={
                  <Settings
                    name={this.state.name}
                    email={this.state.email}
                  />} /> :
                null
            }

            <Route path="*" element={<NoPage />} />

          </Routes>
        </div>
        <div className='right-container'>
          <RightSide
            successfulLogout={this.successfulLogout}
            deleteCredentials={this.deleteCredentials}
            isLoggedIn={this.state.loggedInStatus}
          />
        </div>

      </div>
    );
  }

}

