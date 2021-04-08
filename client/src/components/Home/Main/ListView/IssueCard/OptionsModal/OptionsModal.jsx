/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import css from '../../ListView.module.css';

class OptionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flagged: false,
      watched: false,
      markedResolved: false,
      resolver: 0,
    };
    this.checkFlag = this.checkFlag.bind(this);
    this.flag = this.flag.bind(this);
    this.unflag = this.unflag.bind(this);
    this.watch = this.watch.bind(this);
    this.checkWatched = this.checkWatched.bind(this);
    this.unwatch = this.unwatch.bind(this);
    this.resolve = this.resolve.bind(this);
    this.unresolve = this.unresolve.bind(this);
  }

  componentDidMount() {
    const { issue, user } = this.props;
    const {
      resolved, resolver, issue_id,
    } = issue;
    const { user_id } = user;
    if (resolved !== 0) {
      this.setState({
        markedResolved: true,
        resolver,
      });
    }
    this.checkWatched(issue_id, user_id);
    this.checkFlag(issue_id, user_id);
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
    axios.delete(`/allIssues/unwatch/?user_id=${user_id}&issue_id=${issue_id}`)
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
      flagged, watched, markedResolved, resolver,
    } = this.state;
    const { user, issue } = this.props;
    const { user_id } = issue;
    return (
      <div className={css.optionsModal}>
        <div className={css.watchOption}>
          {!watched
            ? (
              <div className={css.watch}>
                watch issue
                <button type="button" onClick={this.watch}>
                  <span className="far fa-eye" />
                </button>
              </div>
            ) : (
              <div className={css.watch}>
                unwatch issue
                <button type="button" onClick={this.unwatch}>
                  <span className="far fa-eye-slash" />
                </button>
              </div>
            )}
        </div>
        <div className={css.flagOption}>
          {!flagged
            ? (
              <div className={css.flag}>
                flag issue for review
                <button type="button" onClick={this.flag}>
                  <span className="fa fa-flag" />
                </button>
              </div>
            ) : (
              <div className={css.flag}>
                remove flag
                <button type="button" onClick={this.unflag}>
                  <span className="fa fa-flag" />
                </button>
              </div>
            )}
        </div>
        <div className={css.resolveOption}>
          {!markedResolved
            ? (
              <div className={css.resolve}>
                mark as resolved
                <button type="button" onClick={this.resolve}>
                  <span className="fa fa-check-circle" />
                </button>
              </div>
            ) : (
              resolver === user.user_id || user_id === user.user_id
                ? (
                  <div className={css.resolve}>
                    mark as unresolved
                    <button type="button" onClick={this.unresolve}>
                      <span className="fa fa-times-circle" />
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
    );
  }
}

OptionsModal.propTypes = {
  issue: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default OptionsModal;
