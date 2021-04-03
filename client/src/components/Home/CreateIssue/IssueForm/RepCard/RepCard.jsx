import React from 'react';
import PropTypes from 'prop-types';

const RepCard = ({ official }) => (
  <div id="repCard">

  </div>
);

Discussion.propTypes = {
  official: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Discussion;
