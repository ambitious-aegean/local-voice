import React from 'react';
import PropTypes from 'prop-types';

// import Discussion from '../../ListView/IssueCard/Discussion/Discussion.jsx';

const MapIssueModal = ({ issue }) => (
  <div id="mapIssueModal">
    {issue}
  </div>
);

MapIssueModal.propTypes = {
  issue: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MapIssueModal;
