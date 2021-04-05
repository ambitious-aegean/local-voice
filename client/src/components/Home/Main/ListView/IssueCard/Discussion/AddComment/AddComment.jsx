/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
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
    const { issue, user } = this.props;
    axios.post('/comments', {
      issue_id: issue.issue_id,
      text,
      user_id: user.user_id,
      date: new Date(),
    })
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div id="addComment">
        <form onSubmit={this.postComment}>
          <input id="text" type="text" onChange={this.handleChange} />
          <input type="submit" value="comment" />
        </form>
      </div>
    );
  }
}

AddComment.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  issue: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AddComment;
