import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  console.log("login.js reloaded !");

  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // When the Email and Password are not valid, the Button will gray out
  // so that whatever user inputs Email or Password
  // Each key stroke will trigger setFromIsValid() to check if Button should be open

  // debounce
  useEffect(() => {
    console.log("in useEffect");
    const identifier = setTimeout(() => {
      // Be aware that the setTimeout() need a function definition here
      console.log("check validition");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 1000);
    // cleanup function
    // it will run when the component un-mount from the DOM,(component is removed)
    // Or just before next useEffect run
    // but it will not run before the first useEffect function
    return () => {
      console.log("clean up");
      clearTimeout(identifier); //   clear the last timer !!!
    };
  }, [enteredEmail, enteredPassword]);

  //setFormIsValid will run only enteredEmail or enteredPassword updated

  const emailChangeHandler = (event) => {
    console.log("in emailChangeHandler");
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    console.log("in passwordChangeHandler");
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
