/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import css from './AddComment.module.css';

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  postComment(e) {
    e.preventDefault();
    const { text } = this.state;
    const { issue, user, onClick } = this.props;
    axios.post('/comments', {
      issue_id: issue.issue_id,
      text,
      user_id: user.user_id,
      date: new Date(),
    })
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err));
    this.setState({
      text: '',
    });
    onClick();
  }

  render() {
    const { text } = this.state;
    return (
      <div id="addComment" className={css.addCommentForm}>
        <form onSubmit={this.postComment}>
          <input id="text" type="text" value={text} onChange={this.handleChange} />
          <input type="submit" value="Add Comment" />
        </form>
      </div>
    );
  }
}

AddComment.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  issue: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AddComment;
