import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import Discussion from './Discussion/Discussion';

class IssueCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      discussionData: null,
    };
  }

  handleViewDiscussionClick() {

  }

  getDiscussionData() {

  }

  render() {
    const { clicked, discussionData } = this.state;
    const { issue, user } = this.props;
    return (
      <div id="issueCard">

        <div id="viewDiscussion" onClick={}>
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
