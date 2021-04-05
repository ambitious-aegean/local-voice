import React from 'react';
import PropTypes from 'prop-types';

import IssueCard from './IssueCard/IssueCard.jsx';

const ListView = ({ user, displayedIssues }) => (
  <div id="listView">
    List View
    <div id="issues">
      Issues
      {displayedIssues.map((issue) => (
        <IssueCard issue={issue} user={user} />
      ))}
    </div>
  </div>
);

ListView.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  displayedIssues: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListView;
