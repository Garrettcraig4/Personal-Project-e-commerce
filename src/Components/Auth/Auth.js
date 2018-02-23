import React from "react";

const Auth = () => {
  return (
    <div>
      <a href={process.env.REACT_APP_LOGIN}>
        <button>Login</button>
      </a>
    </div>
  );
};

export default Auth;
