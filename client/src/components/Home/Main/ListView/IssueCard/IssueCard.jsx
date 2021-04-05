/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import Discussion from './Discussion/Discussion.jsx';

class IssueCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewDiscussion: false,
      discussionData: [],
    };
    this.getDiscussionData = this.getDiscussionData.bind(this);
    this.closeDiscussion = this.closeDiscussion.bind(this);
  }

  handleViewDiscussionClick() {
    const { viewDiscussion } = this.state;
    this.setState({ viewDiscussion: true });
    this.getDiscussionData();
  }

  closeDiscussion() {
    this.setState({ viewDiscussion: false });
  }

  getDiscussionData() {
    const { issue } = this.props;
    const { issue_id } = issue;
    axios.get(`/comments/?issue_id=${issue_id}`)
      .then((resp) => {
        this.setState({ discussionData: resp.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { viewDiscussion, discussionData } = this.state;
    const { issue, user } = this.props;
    const {
      categories, date, flag_count, issue_id, lat, lng, photos, rep_email, rep_name,
      rep_photo_url, resolved, text, title, up_vote, user_id, username,
    } = issue;
    return (
      <div id="issueCard">
        <div>{user.username}</div>
        <div>{date}</div>
        <div id="issueCard-categories">
          {categories.map((category) => (
            <div key={category}>
              #{category}
            </div>
          ))}
        </div>
        <div>{title}</div>
        <div>{text}</div>
        <div id="issueCard-photos">
          {photos.map((photo, index) => (
            <img key={index} alt={issue.title} src={photo} />
          ))}
        </div>
        <div>
          {up_vote} upvotes
        </div>
        <div>
          {flag_count} flags
        </div>
        <button id="viewDiscussion" type="button" onClick={() => this.handleViewDiscussionClick()} onKeyPress={() => {}} tabIndex={0}>
          View Discussion
          {viewDiscussion
            ? <Discussion discussionData={discussionData} issue={issue} user={user} />
            : ''}
        </button>
      </div>
    );
  }
}

IssueCard.propTypes = {
  issue: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IssueCard;
