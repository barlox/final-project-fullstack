import React, { Component } from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
// import Layout from "./pages/Layout";
import Sudokus from "./pages/Sudokus";
import Instructions from "./pages/Instructions";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import Ranking from "./pages/Ranking";
import NoPage from "./pages/NoPage";
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      name: '',
      email: ''
    }

    this.successfulAuth = this.successfulAuth.bind(this);
    this.successfulLogout = this.successfulLogout.bind(this);
    this.setCredentials = this.setCredentials.bind(this);
    this.deleteCredentials = this.deleteCredentials.bind(this);
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



  render() {
    return (
      <div className='container'>

        <div className='left-container'>
          <LeftSide />
        </div>
        <div className='center-container'>
          <Routes>

            <Route path="/" element={<Sudokus />} />
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

