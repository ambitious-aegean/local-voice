import React from 'react';
import PropTypes from 'prop-types';

import MapView from './MapView/MapView';
import ListView from './ListView/ListView';

const Main = ({ view, displayedIssues, setLoc }) => (
  <div id="main">
    {
      view === 'map'
        ? <MapView displayedIssues={displayedIssues} setLoc={setLoc} />
        : <ListView displayedIssues={displayedIssues} />
    }
  </div>
);

Main.propTypes = {
  view: PropTypes.string.isRequired,
  displayedIssues: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Main;
