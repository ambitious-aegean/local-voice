import React from 'react';
import PropTypes from 'prop-types';

import CommentCard from './CommentCard/CommentCard.jsx';
import AddComment from './AddComment/AddComment.jsx';
import css from './Discussion.module.css';

const Discussion = ({ discussionData, issue, user }) => (
  <div id="discussion">
    <div id="comments">
      {discussionData.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} user={user} />
      ))}
      <AddComment issue={issue} user={user} />
    </div>
  </div>
);

Discussion.propTypes = {
  discussionData: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  issue: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Discussion;
