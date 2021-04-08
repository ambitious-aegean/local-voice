/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Header = ({ toggle }) => (
  <div className={styles.headerContainer}>
    <div className={styles.title}>Local Voice</div>
    <div className={styles.toggleContainer} >
      <span className={styles.toggle}>Toggle List</span>
      <label className={styles.switch}>
        <input onClick={toggle} type='checkbox'></input>
        <span className={styles.sliderRound}></span>
      </label>
    </div>
  </div>
);

Header.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Header;
