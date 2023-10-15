import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Settings(props) {

  const [action, setAction] = useState('update');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [currentPasswordField, setCurrentPasswordField] = useState(false);
  const [newPasswordField, setNewPasswordField] = useState(false);
  const [newPasswordRepeatField, setNewPasswordRepeatField] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [wordKey, setWordKey] = useState('');
  const [passwordField, setPasswordField] = useState(false);
  const [passwordRepeatField, setPasswordRepeatField] = useState(false);
  const [wordKeyField, setWordKeyField] = useState(false);


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
      }, {
        withCredentials: true
      })
        .then(response => {
          console.log(response);
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


  const deleteUser = (event) => {

    event.preventDefault();

    if (password.length === 0) {
      setPasswordField('Password not completed!');
    }
    else if (passwordRepeat.length === 0) {
      setPasswordRepeatField('Confirm password not completed!');
    }
    else if (wordKey.length === 0) {
      setWordKeyField("Wordkey not completed!");
    }
    else if (password !== passwordRepeat) {
      setAuth("Wrong confirmation!");
    }
    else if (wordKey !== 'goodbye') {
      setAuth("Wrong wordKey!");
    }
    else {
      axios.delete('https://sudokers.eu.pythonanywhere.com/deleteuser', {
        data: {
          name: props.name,
          email: props.email,
          password: password
        }
      }, {
        withCredentials: true
      })
        .then(response => {
          console.log(response);
          props.setIsNotForm(true);
          document.querySelector('.logout-nav').click();
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
        <div className="account">
          <button
            id="update"
            className={`settings-button ${action === 'update' ? 'update' : ''}`}
            onClick={() => {
              setAction('update');
              setPasswordField(false);
              setPasswordRepeatField(false);
              setWordKeyField(false);
              setPassword('');
              setPasswordRepeat('');
              setWordKey('');
            }
            }
          >
            Update password
          </button>
          <button
            id="deleter"
            className={`settings-button ${action === 'delete' ? 'deleter' : ''}`}
            onClick={() => {
              setAction('delete');
              setCurrentPasswordField(false);
              setNewPasswordField(false);
              setNewPasswordRepeatField(false);
              setCurrentPassword('');
              setNewPassword('');
              setNewPasswordRepeat('');
            }
            }
          >
            Delete User &#9785;
          </button>
        </div>
      </div>

      <form
        id="settingsForm"
        className="form-settings-wrapper"
        onSubmit={action === 'update' ? changePassword : deleteUser}
      >

        <div className="field-wrapper">
          <label
            className="label-data"
            htmlFor="settingsField1"
          >
            {action === 'update' ? 'Current password' : 'Password'}
          </label>
          <input
            type="password"
            value={action === 'update' ? currentPassword : password}
            onChange={action === 'update' ?
              (e) => {
                setCurrentPassword(e.target.value);
                setCurrentPasswordField(false);
                setAuth(false);
              } :
              (e) => {
                setPassword(e.target.value);
                setPasswordField(false);
                setAuth(false);
              }
            }
            onClick={action === 'update' ?
              () => {
                setCurrentPasswordField(false);
                setAuth(false);
              } :
              () => {
                setPasswordField(false);
                setAuth(false);
              }
            }
            onFocus={() => props.setIsNotForm(false)}
            onBlur={() => props.setIsNotForm(true)}
            id="settingsField1"
            className={
              `input-data ${currentPasswordField || passwordField ? 'currentPasswordField' : ''}`
            }
            placeholder={
              action === 'update' ?
                currentPasswordField ?
                  currentPasswordField :
                  'Enter your current password' :
                passwordField ?
                  passwordField :
                  'Enter your password'
            }
          />
        </div>


        <div className="field-wrapper">
          <label
            className="label-data"
            htmlFor="settingsField2"
          >
            {action === 'update' ? 'New Password' : 'Repeat password'}
          </label>
          <input
            type="password"
            value={action === 'update' ? newPassword : passwordRepeat}
            onChange={action === 'update' ?
              (e) => {
                setNewPassword(e.target.value);
                setNewPasswordField(false);
                setAuth(false);
              } :
              (e) => {
                setPasswordRepeat(e.target.value);
                setPasswordRepeatField(false);
                setAuth(false);
              }
            }
            onClick={action === 'update' ?
              () => {
                setNewPasswordField(false);
                setAuth(false);
              } :
              () => {
                setPasswordRepeatField(false);
                setAuth(false);
              }
            }
            onFocus={() => props.setIsNotForm(false)}
            onBlur={() => props.setIsNotForm(true)}
            id="settingsField2"
            className={
              `input-data ${newPasswordField || passwordRepeatField ? 'newPasswordField' : ''}`
            }
            placeholder={
              action === 'update' ?
                newPasswordField ?
                  newPasswordField :
                  'Enter the new password' :
                passwordRepeatField ?
                  passwordRepeatField :
                  'Repeat your password'
            }
          />
        </div>


        <div className="field-wrapper">
          <label
            className="label-data"
            htmlFor="settingsField3"
          >
            {action === 'update' ? 'Confirm New Password' : 'Write goodbye to confirm'}
          </label>
          <input
            type={`${action === 'update' ? 'password' : 'text'}`}
            value={action === 'update' ? newPasswordRepeat : wordKey}
            onChange={action === 'update' ?
              (e) => {
                setNewPasswordRepeat(e.target.value);
                setNewPasswordRepeatField(false);
                setAuth(false);
              } :
              (e) => {
                setWordKey(e.target.value);
                setWordKeyField(false);
                setAuth(false);
              }
            }
            onClick={action === 'update' ?
              () => {
                setNewPasswordRepeatField(false);
                setAuth(false);
              } :
              () => {
                setWordKeyField(false);
                setAuth(false);
              }
            }
            onFocus={() => props.setIsNotForm(false)}
            onBlur={() => props.setIsNotForm(true)}
            id="settingsField3"
            className={
              `input-data ${newPasswordRepeatField || wordKeyField ? 'newPasswordRepeatField' : ''}`
            }
            placeholder={action === 'update' ?
              newPasswordRepeatField ?
                newPasswordRepeatField :
                'Confirm the new password' :
              wordKeyField ?
                wordKeyField :
                'Write goodbye'
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
                className={`submit-button ${action === 'update' ? 'update' : 'deleter'}`}
              >
                {action === 'update' ? 'Change Password' : 'Delete account'}
              </button>
          }
        </div>

      </form>
    </div>
  )
}