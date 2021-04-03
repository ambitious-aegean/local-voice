import React from 'react';
import PropTypes from 'prop-types';

import CommentCard from './CommentCard/CommentCard';
import AddComment from './AddComment/AddComment';

const Discussion = ({ discussionData, user }) => (
  <div id="discussion">
    <div id="comments">
      {discussionData.map((comment) => (
        <CommentCard comment={comment} />
      ))}
      <AddComment user={user} />
    </div>
  </div>
);

Discussion.propTypes = {
  discussionData: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Discussion;
