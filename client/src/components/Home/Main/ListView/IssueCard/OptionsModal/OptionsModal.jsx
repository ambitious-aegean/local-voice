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
    );
  }
}

OptionsModal.propTypes = {
  issue: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default OptionsModal;
