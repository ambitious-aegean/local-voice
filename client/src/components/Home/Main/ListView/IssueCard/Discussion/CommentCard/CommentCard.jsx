import React from 'react';
import PropTypes from 'prop-types';
import css from './CommentCard.module.css';

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
