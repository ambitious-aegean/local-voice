import React from 'react';
import PropTypes from 'prop-types';

import IssueCard from './IssueCard/IssueCard';

const ListView = ({ user, displayedIssues }) => (
  <div id="listView">
    <div id="issues">
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
