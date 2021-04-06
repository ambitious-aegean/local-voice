/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Header = ({ toggle }) => (
  <div className={styles.headerContainer}>
    <div className={styles.title}>Local Voice</div>
    <div className={styles.toggle} onClick={toggle}>
      Toggle
    </div>
  </div>
);

Header.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Header;
