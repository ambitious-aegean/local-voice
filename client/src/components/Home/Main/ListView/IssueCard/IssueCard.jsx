/* eslint-disable no-nested-ternary */
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
      markedResolved: false,
      resolver: 0,
      voteCount: 0,
    };
    this.watch = this.watch.bind(this);
    this.up_vote = this.up_vote.bind(this);
    this.flag = this.flag.bind(this);
    this.resolve = this.resolve.bind(this);
    this.unwatch = this.unwatch.bind(this);
    this.down_vote = this.down_vote.bind(this);
    this.unflag = this.unflag.bind(this);
    this.unresolve = this.unresolve.bind(this);
    this.getDiscussionData = this.getDiscussionData.bind(this);
    this.closeDiscussion = this.closeDiscussion.bind(this);
    this.checkVote = this.checkVote.bind(this);
    this.checkWatched = this.checkWatched.bind(this);
    this.checkFlag = this.checkFlag.bind(this);
  }

  componentDidMount() {
    const { issue, user } = this.props;
    const {
      resolved, resolver, issue_id, up_vote,
    } = issue;
    const { user_id } = user;
    this.setState({
      voteCount: up_vote,
    });
    if (resolved !== 0) {
      this.setState({
        markedResolved: true,
        resolver,
      });
    }
    this.checkVote(issue_id, user_id);
    this.checkWatched(issue_id, user_id);
    this.checkFlag(issue_id, user_id);
  }

  handleViewDiscussionClick() {
    const { viewDiscussion } = this.state;
    this.setState({ viewDiscussion: !viewDiscussion });
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

  checkVote(issue_id, user_id) {
    axios.get(`/allIssues/checkVote/?issue_id=${issue_id}`)
      .then((resp) => {
        if (resp.data.indexOf(user_id) !== -1) {
          this.setState({
            voted: true,
          });
        }
      });
  }

  checkWatched(issue_id, user_id) {
    axios.get(`/allIssues/checkWatched/?issue_id=${issue_id}`)
      .then((resp) => {
        if (resp.data.indexOf(user_id) !== -1) {
          this.setState({
            watched: true,
          });
        }
      });
  }

  checkFlag(issue_id, user_id) {
    axios.get(`/allIssues/checkFlag/?issue_id=${issue_id}`)
      .then((resp) => {
        if (resp.data.indexOf(user_id) !== -1) {
          this.setState({
            flagged: true,
          });
        }
      });
  }

  up_vote() {
    let { voteCount } = this.state;
    voteCount += 1;
    this.setState({
      voted: true,
      voteCount,
    });

    const { issue, user } = this.props;
    const { issue_id } = issue;
    const { user_id } = user;
    axios.put(`/allIssues/up_vote/?issue_id=${issue_id}&user_id=${user_id}`)
      .catch((err) => { throw err; });
  }

  down_vote() {
    let { voteCount } = this.state;
    voteCount -= 1;
    this.setState({
      voted: false,
      voteCount,
    });

    const { issue, user } = this.props;
    const { issue_id } = issue;
    const { user_id } = user;
    axios.put(`/allIssues/down_vote/?issue_id=${issue_id}&user_id=${user_id}`)
      .catch((err) => { throw err; });
  }

  flag() {
    this.setState({
      flagged: true,
    });

    const { issue, user } = this.props;
    const { issue_id } = issue;
    const { user_id } = user;
    axios.put(`/allIssues/flag/?issue_id=${issue_id}&user_id=${user_id}`)
      .catch((err) => { throw err; });
  }

  unflag() {
    this.setState({
      flagged: false,
    });

    const { issue, user } = this.props;
    const { issue_id } = issue;
    const { user_id } = user;
    axios.put(`/allIssues/unflag/?issue_id=${issue_id}&user_id=${user_id}`)
      .catch((err) => { throw err; });
  }

  watch() {
    this.setState({
      watched: true,
    });

    const { issue, user } = this.props;
    const { issue_id } = issue;
    const { user_id } = user;
    axios.put(`/allIssues/watch/?user_id=${user_id}&issue_id=${issue_id}`)
      .catch((err) => { throw err; });
  }

  unwatch() {
    this.setState({
      watched: false,
    });

    const { issue, user } = this.props;
    const { issue_id } = issue;
    const { user_id } = user;
    axios.put(`/allIssues/unwatch/?user_id=${user_id}&issue_id=${issue_id}`)
      .catch((err) => { throw err; });
  }

  resolve() {
    const { issue, user } = this.props;
    const { issue_id } = issue;
    const { user_id } = user;
    this.setState({
      markedResolved: true,
      resolver: user_id,
    });
    axios.put(`/allIssues/resolve/?user_id=${user_id}&issue_id=${issue_id}`)
      .catch((err) => { throw err; });
  }

  unresolve() {
    const { issue, user } = this.props;
    const { issue_id } = issue;
    const { user_id } = user;
    this.setState({
      markedResolved: false,
      resolver: 0,
    });
    axios.put(`/allIssues/unresolve/?user_id=${user_id}&issue_id=${issue_id}`)
      .catch((err) => { throw err; });
  }

  render() {
    const {
      voted, flagged, watched, viewDiscussion, discussionData, markedResolved, resolver, voteCount,
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
          <div className={css.dotsCategories}>
            <div className={css.dots}>
              <i className={`${css.dotsIcon} fa fa-ellipsis-h`} />
            </div>
            <div id="issueCard-categories" className={css.categories}>
              {categories.map((category) => (
                <div key={category}>
                  #{category} &nbsp;
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={css.content}>
          <div className={css.title}>
            {title}
            &nbsp;
            <div className={css.text}>
              {text}
            </div>
          </div>
          <div id="issueCard-photos" className={css.photos}>
            {photos.map((photo, index) => (
              <img key={index} className={css.photo} alt={issue.title} src={photo} />
            ))}
          </div>
        </div>
        <div className={css.options}>
          <div className={css.watch}>
            {!watched
              ? (
                <div>
                  <button type="button" onClick={this.watch}>
                    <span className="far fa-eye" />
                  </button>
                </div>
              ) : (
                <div>
                  <button type="button" onClick={this.unwatch}>
                    <span className="far fa-eye-slash" />
                  </button>
                </div>
              )}
          </div>
          <div className={css.flag}>
            {!flagged
              ? (
                <div>
                  <button type="button" onClick={this.flag}>
                    <span className="fa fa-flag" />
                  </button>
                </div>
              ) : (
                <div>
                  <button type="button" onClick={this.unflag}>
                    <span> unflag </span>
                  </button>
                </div>
              )}
          </div>
          <div className={css.resolve}>
            {!markedResolved
              ? (
                <div>
                  <button type="button" onClick={this.resolve}>
                    <span> mark as resolved </span>
                  </button>
                </div>
              ) : (
                resolver === user.user_id || user_id === user.user_id
                  ? (
                    <div>
                      <button type="button" onClick={this.unresolve}>
                        <span> un-resolve </span>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span>Resolved</span>
                    </div>
                  )
              )}
          </div>
        </div>
        <div className={css.voteDiscussion}>
          <div className={css.vote}>
            {!voted
              ? (
                <div>
                  <button type="button" onClick={this.up_vote}>
                    <span className="fa fa-chevron-up" />
                  </button>
                  {voteCount} upvotes
                </div>
              ) : (
                <div>
                  <button type="button" onClick={this.down_vote}>
                    <span className="fa fa-chevron-down" />
                  </button>
                  {voteCount} upvotes
                </div>
              )}
          </div>
          <div className={css.discussion}>
            <button id="viewDiscussion" type="button" onClick={() => this.handleViewDiscussionClick()} onKeyPress={() => {}} tabIndex={0}>
              View Discussion
            </button>
            {viewDiscussion
              ? <Discussion discussionData={discussionData} issue={issue} user={user} />
              : ''}
          </div>
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
