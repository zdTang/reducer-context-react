import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";
function App() {
  console.log("App loaded");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

  // Be aware of this useEffect will only run after the Render !!
  // and only if the dependency has been updated

  useEffect(() => {
    if (storedUserLoggedInInformation === "1") {
      console.log("useEffect!");
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1"); // localStorage is reserved name
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  //console.log("begin to render");

  return (
    <AuthContext.Provider value={{ isLoggedIn: true, onLogout: logoutHandler }}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
