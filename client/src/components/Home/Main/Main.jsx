import React from 'react';
import PropTypes from 'prop-types';

import MapView from './MapView/MapView.jsx';
import ListView from './ListView/ListView.jsx';

const Main = ({
  view, displayedIssues, location, getLoc,
}) => (
  <div id="main">
    {view === 0
      ? <MapView displayedIssues={displayedIssues} location={location} getLoc={getLoc} />
      : <ListView displayedIssues={displayedIssues} user={user} />}
  </div>
);

Main.propTypes = {
  view: PropTypes.number.isRequired,
  displayedIssues: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.number).isRequired,
  getLoc: PropTypes.func.isRequired,
};

export default Main;
