import React from "react";
import "./Auth.css";
const Auth = () => {
  return (
    <div className="auth">
      <div className="authbox">
        <a className="authbutton" href={process.env.REACT_APP_LOGIN}>
          <button>Login</button>
        </a>
        <a className="authbutton" href={process.env.REACT_APP_LOGOUT}>
          <button> Logout </button>
        </a>
      </div>
    </div>
  );
};

export default Auth;
