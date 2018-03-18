import React from "react";
import "./Auth.css";
const Auth = () => {
  return (
    <div className="auth">
      <div className="authbox">
        <a href={process.env.REACT_APP_LOGIN}>
          <button className="authbutton">Login</button>
        </a>
        <a href={process.env.REACT_APP_LOGOUT}>
          <button className="authbutton"> Logout </button>
        </a>
      </div>
    </div>
  );
};

export default Auth;
