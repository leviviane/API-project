import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css"; // Import your LoginForm.css file

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors({});
      return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    };

    const loginDemo = (e) => {
      return dispatch(sessionActions.login({ credential: 'Demo', password: 'password'}))
      .then(closeModal)
    }

    // let disableButton = false;
    // if (credential.length < 4 || password.length < 6) {
    //   disableButton = true
    // }

    return (
      <>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && (
            <p>{errors.credential}</p>
          )}
          <button className='logInButton'
          type="submit"
          disabled={credential.length < 4 || password.length < 6 }
          >Log In</button>
        </form>
        <button className='login-demo' onClick={(e) => loginDemo()}>
        Demo User
      </button>
      </>
    );
}

export default LoginFormModal;
