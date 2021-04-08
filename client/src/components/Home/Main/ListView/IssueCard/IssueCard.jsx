/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import css from '../ListView.module.css';

import Discussion from './Discussion/Discussion.jsx';

class IssueCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewDiscussion: false,
      discussionData: [],
      voted: false,
      flagged: false,
      watched: false,
    };
    this.watch = this.watch.bind(this);
    this.up_vote = this.up_vote.bind(this);
    this.flag = this.flag.bind(this);
    this.unwatch = this.unwatch.bind(this);
    this.down_vote = this.down_vote.bind(this);
    this.unflag = this.unflag.bind(this);
    this.getDiscussionData = this.getDiscussionData.bind(this);
    this.closeDiscussion = this.closeDiscussion.bind(this);
  }

  handleViewDiscussionClick() {
    const { viewDiscussion } = this.state;
    this.setState({ viewDiscussion: true });
    this.getDiscussionData();
  }

  getDiscussionData() {
    const { issue } = this.props;
    const { issue_id } = issue;
    axios.get(`/comments/?issue_id=${issue_id}`)
      .then((resp) => {
        this.setState({ discussionData: resp.data });
      })
      .catch((err) => { throw err; });
  }

  closeDiscussion() {
    this.setState({ viewDiscussion: false });
  }

  up_vote() {
    this.setState({
      voted: true,
    });

    const { issue } = this.props;
    const { issue_id, user_id } = issue;
    axios.put(`/allIssues/up_vote/?issue_id=${issue_id}&user_id=${user_id}`)
      .catch((err) => { throw err; });
  }

  down_vote() {
    this.setState({
      voted: false,
    });

    const { issue } = this.props;
    const { issue_id, user_id } = issue;
    axios.put(`/allIssues/down_vote/?issue_id=${issue_id}&user_id=${user_id}`)
      .catch((err) => { throw err; });
  }

  flag() {
    this.setState({
      flagged: true,
    });

    const { issue } = this.props;
    const { issue_id, user_id } = issue;
    axios.put(`/allIssues/flag/?issue_id=${issue_id}&user_id=${user_id}`)
      .catch((err) => { throw err; });
  }

  unflag() {
    this.setState({
      flagged: false,
    });

    const { issue } = this.props;
    const { issue_id, user_id } = issue;
    axios.put(`/allIssues/unflag/?issue_id=${issue_id}&user_id=${user_id}`)
      .catch((err) => { throw err; });
  }

  watch() {
    this.setState({
      watched: true,
    });

    const { issue } = this.props;
    const { issue_id, user_id } = issue;
    axios.put(`/allIssues/watch/?user_id=${user_id}&issue_id=${issue_id}`)
      .catch((err) => { throw err; });
  }

  unwatch() {
    this.setState({
      watched: false,
    });

    const { issue } = this.props;
    const { issue_id, user_id } = issue;
    axios.delete(`/allIssues/unwatch/?user_id=${user_id}&issue_id=${issue_id}`)
      .catch((err) => { throw err; });
  }

  render() {
    const {
      voted, flagged, watched, viewDiscussion, discussionData,
    } = this.state;
    const { issue, user } = this.props;
    const {
      categories, date, flag_count, issue_id, lat, lng, photos, rep_email, rep_name,
      rep_photo_url, resolved, text, title, up_vote, user_id, username,
    } = issue;
    return (
      <div id="issueCard" className={css.issueCard}>
        <div className={css.header}>
          <div className={css.userDate}>
            <div className={css.user}>
              {user.username}
            </div>
            <div className={css.date}>
              {date}
            </div>
          </div>
          <div id="issueCard-categories" className={css.categories}>
            {categories.map((category) => (
              <div key={category}>
                #{category} &nbsp;
              </div>
            ))}
          </div>
        </div>
        <div className={css.content}>
          <div className={css.title}>
            {title}
          </div>
          <div className={css.text}>
            {text}
          </div>
          <div id="issueCard-photos" className={css.photos}>
            {photos.map((photo, index) => (
              <img key={index} className={css.photo} alt={issue.title} src={photo} />
            ))}
          </div>
        </div>
        <div className={css.options}>
          <div className={css.upvote}>
            {!voted
              ? (
                <div>
                  <button type="button" onClick={this.up_vote}>
                    <span> up icon </span>
                  </button>
                  {up_vote} upvotes
                </div>
              ) : (
                <div>
                  <button type="button" onClick={this.down_vote}>
                    <span> down icon </span>
                  </button>
                  {up_vote + 1} upvotes
                </div>
              )}
          </div>
          <div className={css.watched}>
            {!watched
              ? (
                <div className={css.watch}>
                  <button type="button" onClick={this.watch}>
                    <span> watch icon </span>
                  </button>
                </div>
              ) : (
                <div className={css.unwatch}>
                  <button type="button" onClick={this.unwatch}>
                    <span> unwatch icon </span>
                  </button>
                </div>
              )}
          </div>
          <div className={css.flag}>
            {!flagged
              ? (
                <div>
                  <button type="button" onClick={this.flag}>
                    <span> (empty) flag icon </span>
                  </button>
                </div>
              ) : (
                <div>
                  <button type="button" onClick={this.unflag}>
                    <span> flag icon </span>
                  </button>
                </div>
              )}
          </div>
        </div>
        <div className={css.viewDiscussion}>
          <button id="viewDiscussion" type="button" onClick={() => this.handleViewDiscussionClick()} onKeyPress={() => {}} tabIndex={0}>
            View Discussion
            {viewDiscussion
              ? <Discussion discussionData={discussionData} issue={issue} user={user} />
              : ''}
          </button>
        </div>
      </div>
    );
  }
}

IssueCard.propTypes = {
  issue: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IssueCard;
