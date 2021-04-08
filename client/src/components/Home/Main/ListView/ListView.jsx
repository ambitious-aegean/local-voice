import React from 'react';
import PropTypes from 'prop-types';

import css from './ListView.module.css';

import IssueCard from './IssueCard/IssueCard.jsx';

const ListView = ({ user, displayedIssues }) => (
  <div id="listView" className={css.listView}>
    <div id="issues" className={css.issues}>
      {displayedIssues.map((issue) => (
        <IssueCard key={issue.issue_id} issue={issue} user={user} />
      ))}
    </div>
  </div>
);

ListView.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  displayedIssues: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListView;
