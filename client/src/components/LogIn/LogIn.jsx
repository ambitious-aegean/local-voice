import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogOut from './LogOut.jsx';
import Home from '../Home/Home.jsx';
import styles from './styles.module.css';

const LogIn = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logOut, username } = useAuth0();

  return (
    <div className={styles.landingpage}>
      {
        !isAuthenticated && (
          <div className={styles.maindiv}>
            <h1 className={styles.heading}>
              Local Voice
            </h1>
            <h5 className={styles.subheading}>
              Bringing local issues to the palm of your hand
            </h5>
            <button type="button" onClick={() => loginWithRedirect()} className={styles.button}>
              Log In
            </button>
          </div>
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
