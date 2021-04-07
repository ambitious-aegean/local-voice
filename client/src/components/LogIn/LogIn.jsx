import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogOut from './LogOut.jsx';
import Home from '../Home/Home.jsx';

const LogIn = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logOut, username } = useAuth0();

  return (
    <div>
      {
        !isAuthenticated && (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        )
      }
      {
        isAuthenticated && (
          <div>
            <LogOut />
            <h5>{user.name}</h5>
            <h5>{user.username}</h5>
            <img src={user.picture} alt={user.name} />
            <Home />
          </div>
        )
      }
    </div>
  );
};

export default LogIn;
