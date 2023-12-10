import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [userNameErr, setUserNameErr] = useState(false);
  const [minCharErr, setMinCharErr] = useState(false);

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);

  const [password, setPassword] = useState("");
  const [smallErr, setSmallErr] = useState(false);
  const [capErr, setCapErr] = useState(false);
  const [numErr, setNumErr] = useState(false);
  const [speCharErr, setSpeCharErr] = useState(false);
  const [lenghtErr, setLengthErr] = useState(false);

  const [password2, setPassword2] = useState("");
  const [password2Err, setPassword2Err] = useState(false);

  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  const [inputType, setInputType] = useState("password");
  const [inputType2, setInputType2] = useState("password");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validateName = (e) => {
    const { value } = e.target;
    if (value.match(/^[\s\S]{3,16}$/)) {
      setUserName(value);
      setUserNameErr(false);
      setMinCharErr(false);
      if (!value.match(/^[a-zA-Z0-9_-]*$/)) {
        setUserNameErr(true);
        setUserName(value);
      }
    } else {
      setMinCharErr(true);
      setUserName(value);
      if (!value.match(/^[a-zA-Z0-9_-]*$/)) {
        setUserNameErr(true);
        setUserName(value);
      } else {
        setUserNameErr(false);
      }
    }
  };
  const validateEmailOrPhone = (e) => {
    const { value } = e.target;
    if (
      value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) ||
      value.match(/^\d{10}$/)
    ) {
      setEmailErr(false);
      setEmail(value);
    } else {
      setEmailErr(true);
      setEmail(value);
    }
  };

  const validatePassword = (e) => {
    const { value } = e.target;
    if (
      value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      )
    ) {
      setSmallErr(false);
      setCapErr(false);
      setLengthErr(false);
      setNumErr(false);
      setSpeCharErr(false);
      setPassword(value);
    } else {
      if (!value.match(/^[A-Za-z\d@$!%*?&]{8,}$/)) {
        setLengthErr(true);
        setPassword(value);
      } else {
        setLengthErr(false);
      }

      if (!value.match(/^(?=.*[a-z])/)) {
        setSmallErr(true);
        setPassword(value);
      } else {
        setSmallErr(false);
      }
      if (!value.match(/^(?=.*[A-Z])/)) {
        setCapErr(true);
        setPassword(value);
      } else {
        setCapErr(false);
      }
      if (!value.match(/^(?=.*\d)/)) {
        setNumErr(true);
        setPassword(value);
      } else {
        setNumErr(false);
      }
      if (!value.match(/^(?=.*[@$!%*?&])/)) {
        setSpeCharErr(true);
        setPassword(value);
      } else {
        setSpeCharErr(false);
      }
    }
  };

  const showPassword = () => {
    if (toggle) {
      setToggle(false);
      setInputType("password");
    } else {
      setToggle(true);
      setInputType("text");
    }
  };
  const showPassword2 = () => {
    if (toggle2) {
      setToggle2(false);
      setInputType2("password");
    } else {
      setToggle2(true);
      setInputType2("text");
    }
  };

  const disableButton = () => {
    if (
      !userNameErr &&
      !minCharErr &&
      !emailErr &&
      !smallErr &&
      !capErr &&
      !numErr &&
      !speCharErr &&
      !lenghtErr &&
      userName != ""
    ) {
      return false;
    }
    return true;
  };
  const createAccount = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    if (password === password2) {
      handleShow();

      setUserName("");
      setEmail("");
      setPassword("");

      setUserNameErr(false);
      setMinCharErr(false);
      setEmailErr(false);
      setSmallErr(false);
      setCapErr(false);
      setNumErr(false);
      setSpeCharErr(false);
      setLengthErr(false);
      setPassword2Err(false);
      setToggle(false);
      setToggle2(false);
      setPassword2("");
    } else {
      setPassword2Err(true);
    }
  };
  return (
    <>
      <div className="container"></div>
      <div className="register-form">
        <h1>Register a New Account</h1>
        <form onSubmit={createAccount} className="my-2">
          <div className="flex flex-col my-1">
            <label>Username</label>
            <input
              name="username"
              type="text"
              value={userName}
              onChange={(e) => validateName(e)}
            />
            <ul>
              {userNameErr && (
                <li className="error">
                  Username must contain only letters, numbers and special
                  charecter(-, _)
                </li>
              )}

              {minCharErr && (
                <li className="error">
                  Atleast 3 charecter and atmost 16 charecter
                </li>
              )}
            </ul>
          </div>
          <div className="flex flex-col my-1">
            <label>Email / Phone</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => validateEmailOrPhone(e)}
            />
            <ul>
              {emailErr && (
                <li className="error">Invalid Email id or Phone number</li>
              )}
            </ul>
          </div>
          <div className="flex flex-col my-1">
            <label>Password</label>
            <div
              style={{
                width: "100%",
                position: "relative",
              }}
            >
              <input
                name="password"
                type={inputType}
                value={password}
                onChange={(e) => validatePassword(e)}
              />
              {toggle && (
                <i className="fa-regular fa-eye eye" onClick={showPassword} />
              )}
              {toggle || (
                <i
                  className="fa-regular fa-eye-slash eye"
                  onClick={showPassword}
                />
              )}
            </div>
            <ul>
              {smallErr && (
                <li className="error">
                  Password should contain atleast one lowercase letter.
                </li>
              )}

              {capErr && (
                <li className="error">
                  Password should contain atleast one uppercase letter.
                </li>
              )}
              {numErr && (
                <li className="error">
                  Password should contain atleast one digit.
                </li>
              )}
              {speCharErr && (
                <li className="error">
                  Password should contain atleast one special
                  character(@$!%*?&).
                </li>
              )}
              {lenghtErr && (
                <li className="error">
                  Password should contain minimum 8 character.
                </li>
              )}
            </ul>
          </div>
          <div className="flex flex-col my-1">
            <label>Confirm Password</label>
            <div
              style={{
                width: "100%",
                position: "relative",
              }}
            >
              <input
                name="password2"
                type={inputType2}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              {toggle2 && (
                <i className="fa-regular fa-eye eye" onClick={showPassword2} />
              )}
              {toggle2 || (
                <i
                  className="fa-regular fa-eye-slash eye"
                  onClick={showPassword2}
                />
              )}
            </div>
            <ul>
              {password2Err && (
                <li className="error">Password does not match</li>
              )}
            </ul>
          </div>
          <div className="flex flex-col my-1">
            <button disabled={disableButton()}>Create</button>
          </div>
        </form>
      </div>
      <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header
          style={{
            backgroundColor: "var(--clr-neutral-200)",
          }}
        >
          <Modal.Title>Account created successfully.!</Modal.Title>
        </Modal.Header>
        <Modal.Footer
          style={{
            backgroundColor: "var(--clr-neutral-200)",
          }}
        >
          <button onClick={handleClose}>Logout</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
