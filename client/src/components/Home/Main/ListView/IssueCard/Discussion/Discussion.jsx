import React from 'react';
import PropTypes from 'prop-types';

import CommentCard from './CommentCard/CommentCard.jsx';
import AddComment from './AddComment/AddComment.jsx';

const Discussion = ({ discussionData, issue, user }) => (
  <div id="discussion">
    <div id="comments">
      {discussionData.map((comment) => (
        <CommentCard comment={comment} user={user} />
      ))}
      <AddComment issue={issue} user={user} />
    </div>
  </div>
);

Discussion.propTypes = {
  discussionData: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  issue: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Discussion;
