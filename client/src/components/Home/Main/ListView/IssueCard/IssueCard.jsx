/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

// import axios from 'axios';

import Discussion from './Discussion/Discussion.jsx';

class IssueCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      discussionData: null,
    };
  }

  // handleViewDiscussionClick() {

  // }

  // getDiscussionData() {

  // }

  render() {
    const { clicked, discussionData } = this.state;
    const { issue, user } = this.props;
    return (
      <div id="issueCard">

        <div id="viewDiscussion" role="button" onClick={() => {}} onKeyPress={() => {}} tabIndex={0}>
          View Discussion
          {discussionData !== null
            ? <Discussion discussionData={discussionData} user={user} />
            : ''}

        </div>
      </div>
    );
  }
}

IssueCard.propTypes = {
  issue: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default IssueCard;
