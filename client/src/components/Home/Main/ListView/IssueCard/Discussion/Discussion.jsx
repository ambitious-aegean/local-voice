import React from 'react';
import PropTypes from 'prop-types';

import CommentCard from './CommentCard/CommentCard.jsx';
import AddComment from './AddComment/AddComment.jsx';
import css from './Discussion.module.css';

const Discussion = ({ discussionData, issue, user, onClick }) => (
  <div id="discussion" className={css.discussionMain}>
    <div id="comments">
      <div className={css.commentCardList}>
        {discussionData.map((comment) => (
          <CommentCard key={comment.comment_id} comment={comment} user={user} />
        ))}
      </div>
      <AddComment issue={issue} user={user} onClick={onClick} />
    </div>
  </div>
);

Discussion.propTypes = {
  discussionData: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  issue: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Discussion;
