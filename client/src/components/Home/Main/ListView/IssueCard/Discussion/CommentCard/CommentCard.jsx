import React from 'react';
import PropTypes from 'prop-types';

const CommentCard = ({ comment }) => (
  <div id="comment">
    {comment.text}
  </div>
);

CommentCard.propTypes = {
  comment: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CommentCard;
