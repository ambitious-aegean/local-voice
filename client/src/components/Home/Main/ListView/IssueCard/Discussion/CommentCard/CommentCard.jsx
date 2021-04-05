import React from 'react';
import PropTypes from 'prop-types';

const CommentCard = ({ comment, user }) => (
  <div id="comment">
    <div>{user.username}</div>
    <div>{comment.text}</div>
  </div>
);

CommentCard.propTypes = {
  comment: PropTypes.objectOf(PropTypes.string).isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CommentCard;
