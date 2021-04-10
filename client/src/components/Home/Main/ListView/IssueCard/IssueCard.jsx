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

import OptionsModal from './OptionsModal/OptionsModal.jsx';
import Discussion from './Discussion/Discussion.jsx';

class IssueCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewDiscussion: false,
      viewOptions: false,
      discussionData: [],
      voted: false,
      voteCount: 0,
    };
    this.handleViewOptionsClick = this.handleViewOptionsClick.bind(this);
    this.handleViewDiscussionClick = this.handleViewDiscussionClick.bind(this);
    this.checkVote = this.checkVote.bind(this);
    this.up_vote = this.up_vote.bind(this);
    this.down_vote = this.down_vote.bind(this);
    this.getDiscussionData = this.getDiscussionData.bind(this);
    this.closeDiscussion = this.closeDiscussion.bind(this);
  }

  componentDidMount() {
    const { issue, user } = this.props;
    const {
      resolved, resolver, issue_id, up_vote,
    } = issue;
    const { user_id, watchedList, votedList } = user;
    this.setState({
      voteCount: up_vote,
    });
    this.checkVote(issue_id, votedList);
  }

  handleViewOptionsClick() {
    const { viewOptions } = this.state;
    this.setState({ viewOptions: !viewOptions });
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

  checkVote(issue_id, votedList) {
    if (votedList.indexOf(issue_id) !== -1) {
      this.setState({
        voted: true,
      });
    }
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

  render() {
    const {
      voted, viewOptions, viewDiscussion, discussionData, voteCount,
    } = this.state;
    const { issue, user } = this.props;
    const {
      categories, date, flag_count, issue_id, lat, lng, photos, rep_email, rep_name,
      rep_photo_url, resolved, text, title, up_vote, user_id, username,
    } = issue;
    return (
      <div id="issueCard" className={css.issueCard}>
        <div className={css.voteContainer}>
          <div className={css.voteOption}>
            {!voted
              ? (
                <div className={css.vote}>
                  <button type="button" onClick={this.up_vote}>
                    <span className="fa fa-chevron-up" />
                  </button>
                  <div className={css.voteCount}>
                    {voteCount}
                  </div>
                </div>
              ) : (
                <div className={css.vote}>
                  <button type="button" onClick={this.down_vote}>
                    <span className="fa fa-chevron-down" />
                  </button>
                  <div className={css.voteCount}>
                    {voteCount}
                  </div>
                </div>
              )}
          </div>
        </div>
        <div className={css.issueCardContent}>
          <div className={css.header}>
            <div className={css.userDate}>
              <div className={css.user}>
                {username}
              </div>
              <div className={css.date}>
                {date}
              </div>
            </div>
            <div className={css.dotsCategories}>

              <div id="issueCard-categories" className={css.categories}>
                {categories.map((category) => (
                  <div key={category}>
                    #{category} &nbsp;
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={css.modalContainer}>
            {viewOptions
              ? (
                <OptionsModal issue={issue} user={user} />
              ) : ''}
          </div>
          <div className={css.content}>
            <div className={css.title}>
              {title}
            </div>
            <div className={css.text}>
              {text}
            </div>
            <div id="issueCard-photos" className={css.photos}>
              {photos.map((photo, index) => {
                if (photo) {
                  return <img key={index} className={css.photo} alt={issue.title} src={photo} />;
                }
                return <div />;
              })}
            </div>
          </div>
          <div className={css.discussion}>
            <button id="viewDiscussion" type="button" onClick={() => this.handleViewDiscussionClick()} onKeyPress={() => {}} tabIndex={0}>
              {!viewDiscussion
                ? 'View Discussion'
                : 'Close Discussion'}
            </button>
            {viewDiscussion
              ? (
                <Discussion
                  discussionData={discussionData}
                  issue={issue}
                  user={user}
                  onClick={this.getDiscussionData}
                />
              ) : ''}
          </div>
        </div>
        <div className={css.issueCardRight}>
            <div role="button" className={css.dots} onClick={this.handleViewOptionsClick} onKeyPress={this.handleViewOptionsClick} tabIndex={0}>
              <i className={`${css.dotsIcon} fa fa-ellipsis-h`} />
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
