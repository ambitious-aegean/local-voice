/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ toggle }) => (
  <div>
    Header
    <div onClick={toggle}>
      toggle
    </div>
  </div>
);

Header.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Header;
