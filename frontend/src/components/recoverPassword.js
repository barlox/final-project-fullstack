import React, { useState } from "react";
import axios from 'axios';


export default function RecoverPassword(props) {

  const [email, setEmail] = useState('');
  const [emailField, setEmailField] = useState(false);
  const [auth, setAuth] = useState(false);

  const recover = (event) => {

    event.preventDefault();

    if (email.length === 0) {
      setEmailField('Email not completed!');
    }
    else {
      axios.post('http://127.0.0.1:5000/forgotPassword', {
        email: email
      }, {
        withCredentials: true
      })
        .then(function (response) {
          console.log(response);
          props.recoverPass();

        })
        .catch(function (error) {
          console.log(error, 'error');
          if (error.response.status === 404) {
            setAuth("Email does not exist!");
          }
          else {
            setAuth('Server failure');
          }
        });
    }

  }

  return (
    <div className="recover-wrapper">
      <div className="title-wrapper">
        <h2>
          Recover your password
        </h2>
      </div>

      <form
        id="recoverForm"
        className="form-recover-wrapper"
        onSubmit={recover}
      >

        <div className="field-wrapper">
          <div className="message">
            Enter your email.
          </div>
          <div className="message">
            A new password will be generated and sent to your email.
          </div>
          <div className="message">
            You can modify it, once logged in, in the options panel.
          </div>
        </div>

        <div className="field-wrapper">
          <label
            className="label-data"
            htmlFor="recoverEmail"
          >
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailField(false);
              setAuth(false);
            }
            }
            id="recoverEmail"
            className={
              `input-data ${emailField ? 'emailField' : null}`
            }
            placeholder={
              emailField ?
                emailField :
                'Enter your email address'
            }
          />
        </div>

        <div className="submit-recover">
          {
            auth ?
              <div className="error-login">
                {auth}
              </div> :
              <button
                type="submit"
                className="submit-button"
              >
                Recover
              </button>
          }
        </div>

      </form>
    </div>
  )
}