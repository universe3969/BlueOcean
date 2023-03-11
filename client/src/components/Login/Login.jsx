import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="buttan" onClick={() => loginWithRedirect()}>Log In/Sign up</button>;
};

export default LoginButton;
