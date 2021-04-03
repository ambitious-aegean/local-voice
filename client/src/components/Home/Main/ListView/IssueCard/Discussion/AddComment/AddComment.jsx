/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';

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

  postComment() {
    const body = this.state;
    const { user } = this.props;
    // send post request to /comments
  }

  render() {
    return (
      <div id="addComment">
        <form onSubmit={this.postComment}>
          <input id="text" type="text" value="comment" onChange={this.handleChange} />
          <input type="submit" value="comment" />
        </form>
      </div>
    );
  }
}

AddComment.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default AddComment;
