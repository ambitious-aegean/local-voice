import React from 'react';
import PropTypes from 'prop-types';
import css from './CommentCard.module.css';

const CommentCard = ({ comment, user }) => (
  <div id="comment" className={css.commentBody}>
    <div className={css.commentName}>{user.username}</div>
    <div className={css.commentText}>{comment.text}</div>
    <div className={css.divider} />
  </div>
);

CommentCard.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CommentCard;
