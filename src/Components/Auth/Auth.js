import React from "react";
import "./Auth.css";
const Auth = () => {
  return (
    <div className="auth">
      <a href={process.env.REACT_APP_LOGIN}>
        <button>Login</button>
      </a>
      <a href={process.env.REACT_APP_LOGOUT}>
        <button> Logout </button>
      </a>
    </div>
  );
};

export default Auth;
