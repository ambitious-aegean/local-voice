import React from 'react';
import PropTypes from 'prop-types';

const CommentCard = ({ comment, user }) => (
  <div id="comment">
    <div>{user.username}</div>
    <div>{comment.text}</div>
  </div>
);

CommentCard.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CommentCard;
