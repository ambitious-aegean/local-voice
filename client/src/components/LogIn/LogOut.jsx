import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './styles.module.css';

const LogOut = () => {
  const { logout } = useAuth0();

  return (
    <button className={styles.button} type="button" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

export default LogOut;
