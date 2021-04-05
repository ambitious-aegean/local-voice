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
      clicked: false,
      discussionData: [{ text: 'it was bad' }],
    };
  }

  handleViewDiscussionClick() {
    let { clicked } = this.state;
    clicked = !clicked;
    this.setState({ clicked });
  }

  static getDiscussionData() {
    axios.get('/comments')
      .then((resp) => console.log(resp.data)) // load this.state.discussionData
      .catch((err) => console.log(err));
  }

  render() {
    const { clicked, discussionData } = this.state;
    const { issue, user } = this.props;
    const {
      categories, date, flag_count, issue_id, lat, lng, photos, rep_email, rep_name,
      rep_photo_url, resolved, text, title, up_vote, user_id, username
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
            <img alt={issue.title} src={photo} />
          ))}
        </div>
        <div>
          {up_vote} upvotes
        </div>
        <div>
          {flag_count} flags
        </div>
        <div id="viewDiscussion" role="button" onClick={() => this.handleViewDiscussionClick()} onKeyPress={() => {}} tabIndex={0}>
          View Discussion
          {clicked
            ? <Discussion discussionData={discussionData} issue={issue} user={user} />
            : ''}
        </div>
      </div>
    );
  }
}

IssueCard.propTypes = {
  issue: PropTypes.objectOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default IssueCard;

/*
categories [String]
date
flag_count
issue_id
lat
lng
photos [String]
rep_email
rep_name
rep_photo_url
resolved
text
title
up_vote
user_id
username
*/