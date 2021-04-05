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
      discussionData: [{ text: 'it was bad' }],
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
        Issue Card
        <div id="viewDiscussion" role="button" onClick={() => { this.setState({ clicked: !clicked }); }} onKeyPress={() => {}} tabIndex={0}>
          View Discussion
          {clicked
            ? <Discussion discussionData={discussionData} user={user} />
            : ''}
        </div>
      </div>
    );
  }
}

IssueCard.propTypes = {
  issue: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default IssueCard;
