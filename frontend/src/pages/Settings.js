import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Settings(props) {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [currentPasswordField, setCurrentPasswordField] = useState(false);
  const [newPasswordField, setNewPasswordField] = useState(false);
  const [newPasswordRepeatField, setNewPasswordRepeatField] = useState(false);
  const [auth, setAuth] = useState(false);
  
  const navigate = useNavigate();


  useEffect(() => {
    props.setNoFound(false);
  },
    // eslint-disable-next-line
    []);
    
  
  const changePassword = (event) => {

    event.preventDefault();

    if (currentPassword.length === 0) {
      setCurrentPasswordField('Current password not completed!');
    }
    else if (newPassword.length === 0) {
      setNewPasswordField('New password not completed!');
    }
    else if (newPasswordRepeat.length === 0) {
      setNewPasswordRepeatField("Confirm password not completed!");
    }
    else if (newPassword !== newPasswordRepeat) {
      setAuth("Wrong confirmation!");
    }
    else {
      axios.patch('https://sudokers.eu.pythonanywhere.com/checkandupdatepassword', {
        name: props.name,
        email: props.email,
        passwordOld: currentPassword,
        passwordNew: newPassword
      })
        .then(response => {
          props.setIsNotForm(true);
          navigate("/");
        })
        .catch(error => {
          console.log(error);
          if (error.response.status === 401) {
            setAuth("Password incorrect!");
          }
          else if (error.response.status === 404) {
            setAuth("Wrong name and/or email!")
          }
          else if (error.response.status === 409) {
            setAuth("Conflict server status!")
          }
          else {
            setAuth('Server failure!');
          }
        })
    }
  }


  return (
    <div className="settings-wrapper">
      <div className="settings-title">
        <h2>Account settings</h2>
        <h3>Update password</h3>
      </div>

      <form
        id="settingsForm"
        className="form-settings-wrapper"
        onSubmit={changePassword}
      >

        <div className="field-wrapper">
          <label
            className="label-data"
            htmlFor="currentPassword"
          >
            Current password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setCurrentPasswordField(false);
              setAuth(false);
            }
            }
            onClick={() => {
              setCurrentPasswordField(false);
              setAuth(false);
            }
            }
            onFocus={() => props.setIsNotForm(false)}
            onBlur={() => props.setIsNotForm(true)}
            id="currentPassword"
            className={
              `input-data ${currentPasswordField ? 'currentPasswordField' : ''}`
            }
            placeholder={
              currentPasswordField ?
                currentPasswordField :
                'Enter your current password'
            }
          />
        </div>


        <div className="field-wrapper">
          <label
            className="label-data"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setNewPasswordField(false);
              setAuth(false);
            }
            }
            onClick={() => {
              setNewPasswordField(false);
              setAuth(false);
            }
            }
            onFocus={() => props.setIsNotForm(false)}
            onBlur={() => props.setIsNotForm(true)}
            id="newPassword"
            className={
              `input-data ${newPasswordField ? 'newPasswordField' : ''}`
            }
            placeholder={
              newPasswordField ?
                newPasswordField :
                'Enter the new password'
            }
          />
        </div>


        <div className="field-wrapper">
          <label
            className="label-data"
            htmlFor="newPasswordRepeat"
          >
            Confirm Password
          </label>
          <input
            type="password"
            value={newPasswordRepeat}
            onChange={(e) => {
              setNewPasswordRepeat(e.target.value);
              setNewPasswordRepeatField(false);
              setAuth(false);
            }
            }
            onClick={() => {
              setNewPasswordRepeatField(false);
              setAuth(false);
            }
            }
            onFocus={() => props.setIsNotForm(false)}
            onBlur={() => props.setIsNotForm(true)}
            id="newPasswordRepeat"
            className={
              `input-data ${newPasswordRepeatField ? 'newPasswordRepeatField' : ''}`
            }
            placeholder={
              newPasswordRepeatField ?
                newPasswordRepeatField :
                'Confirm the new password'
            }
          />
        </div>


        <div className="submit-settings">
          {
            auth ?
              <div className="error-settings">
                {auth}
              </div> :
              <button
                type="submit"
                className="submit-button"
              >
                Change Password
              </button>
          }
        </div>

      </form>
    </div>
  )
}