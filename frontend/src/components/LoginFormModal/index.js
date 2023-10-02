import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css"; // Import your LoginForm.css file

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
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
    e.preventDefault();
    dispatch(sessionActions.login({ credential: "Demo", password: "password" }))
      .then(closeModal)
      .then(() => history.push("/"));
  };

  return (
    <div className="login-form-container">
      <h1>Log In</h1>
      {errors.credential && (
        <div className="error-message">
          <p>{errors.credential}</p>
        </div>
        )}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder= 'Username or Email'
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder= 'Password'
            required
          />
        </label>

        <button
          className="login-button"
          type="submit"
          disabled={credential.length < 4 || password.length < 6}
        >
          Log In
        </button>
      </form>
      <button className="login-demo" onClick={loginDemo}>
        Demo User
      </button>
    </div>
  );
}

export default LoginFormModal;




// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import { useHistory } from 'react-router-dom'
// import "./LoginForm.css"; // Import your LoginForm.css file

// function LoginFormModal() {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const [credential, setCredential] = useState("");
//     const [password, setPassword] = useState("");
//     const [errors, setErrors] = useState({});
//     const { closeModal } = useModal();

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       setErrors({});
//       return dispatch(sessionActions.login({ credential, password }))
//         .then(closeModal)
//         .catch(async (res) => {
//           const data = await res.json();
//           if (data && data.errors) {
//             setErrors(data.errors);
//           }
//         });
//     };

//     const loginDemo = (e) => {
//       e.preventDefault();
//       dispatch(sessionActions.login({ credential: 'Demo', password: 'password' }))
//       .then(closeModal)
//       history.push('/')
//     }

//     // let disableButton = false;
//     // if (credential.length < 4 || password.length < 6) {
//     //   disableButton = true
//     // }

//     return (
//       <>
//         <h1>Log In</h1>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Username or Email
//             <input
//               type="text"
//               value={credential}
//               onChange={(e) => setCredential(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Password
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </label>
//           {errors.credential && (
//             <p>{errors.credential}</p>
//           )}
//           <button className='login-button'
//           type="submit"
//           disabled={credential.length < 4 || password.length < 6 }
//           >Log In</button>
//         </form>
//         {/* <button className='login-demo' onClick={(e) => loginDemo()}>
//         Demo User
//       </button> */}
//       <button className='login-demo' onClick={loginDemo}>Demo User</button>
//       </>
//     );
// }

// export default LoginFormModal;
