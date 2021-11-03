import React, { useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

//  Define a reducer
//  Reducer can be defined out of the component function as it will not need to access
//  data in the component
const emailReducer = (state, action) => {
  console.log("====in the reducer=====");
  console.log("state: ", state);
  console.log("action: ", action);

  if (action.type === "USER_INPUT_EMAIL") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR_EMAIL") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false }; // default state
};

// password Reducer
const passwordReducer = (state, action) => {
  console.log("====in the password reducer=====");
  console.log("state: ", state);
  console.log("action: ", action);

  if (action.type === "USER_INPUT_PASSWORD") {
    return { value: action.val.trim(), isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR_PASSWORD") {
    return { value: state.value, isValid: state.value.length > 6 };
  }
  return { value: "", isValid: false }; // default state
};

/**==========================
 *   Login component
 * ======================== */

const Login = (props) => {
  console.log("Login loaded !");

  const [formIsValid, setFormIsValid] = useState(false);

  // email state
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  // password state
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  console.log("State: ", emailState, passwordState);
  console.log("form valid: ", formIsValid);
  //  one event trigger two states, which is not a good approach

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT_EMAIL", val: event.target.value });

    setFormIsValid(() => {
      console.log("email set form");
      return emailState.isValid && passwordState.isValid;
    });
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT_PASSWORD", val: event.target.value });

    setFormIsValid(() => {
      console.log("password set form!");
      return emailState.isValid && passwordState.isValid;
    });
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.value.includes("@"));
    dispatchEmail({ type: "INPUT_BLUR_EMAIL" });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR_PASSWORD" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
