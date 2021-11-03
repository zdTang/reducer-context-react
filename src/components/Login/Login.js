import React, { useState, useReducer, useEffect } from "react";

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
  console.log("formIsValid: ", formIsValid);
  //  one event trigger two states, which is not a good approach

  // useEffect like this way
  // can guarantee the state we rely on will be the latest state
  // it also avoid extra checking form validity. for instance, once the password is more than 6
  // the useEffect will not check again  as the True will not change again.

  /* use Alias to represent part of destruction */
  const { isValid: emailIsValid } = emailState; // emailIsValid is alias of isValid
  const { isValid: passwordIsValid } = passwordState; // passwordIsValid is alias of isValid

  useEffect(() => {
    console.log("in useEffect");
    //setFormIsValid(emailState.isValid && passwordState.isValid);    // it works like a charm
    setFormIsValid(emailIsValid && passwordIsValid);
    return () => {
      console.log("clean up"); //   clear the last timer !!!
    };
    //}, [emailState.isValid, passwordState.isValid]);                // it works like a charm, i prefer this way!
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT_EMAIL", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT_PASSWORD", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR_EMAIL" });
  };

  const validatePasswordHandler = () => {
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
