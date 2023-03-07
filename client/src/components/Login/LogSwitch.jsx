import Login from "./Login.jsx";
import Logout from "./Logout.jsx";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogSwitch = () => {
  // checks if user is logged in
  const Authenticated = useAuth0().isAuthenticated;
  //allows the app not to break when user is authentication check is in process
  const Loading = useAuth0.isLoading;
  //all user info
  const user = useAuth0().user;
  //uncomment to see the user object
  // console.log(user);
  return (
    <>
      {Authenticated && !Loading && <Logout />}
      {!Authenticated && !Loading && <Login />}
    </>
  );
};

export default LogSwitch;
