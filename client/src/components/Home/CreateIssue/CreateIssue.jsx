/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import IssueForm from './IssueForm/IssueForm.jsx';
import styles from './styles/createIssue.module.css';

class CreateIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: false,
    };
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  openForm() {
    this.setState({ formOpen: true });
  }

  closeForm() {
    this.setState({ formOpen: false });
    const { getIssues } = this.props;
    const { user, location } = this.props;
    const { user_id } = user;
    const { lat, lng } = location;
    getIssues(user_id, lat, lng);
  }

  render() {
    const { formOpen } = this.state;
    const { user, location, getIssues } = this.props;
    return (
      <div className={styles.createIssueContainer}>
        <button type="button" id={styles.createIssue} onClick={this.openForm}>
          Report an Issue
        </button>
        { formOpen
          ? (
            <IssueForm
              user={user}
              location={location}
              closeForm={this.closeForm}
              getIssues={getIssues}
            />
          )
          : ''}
      </div>
    );
  }
}

CreateIssue.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.number).isRequired,
  getIssues: PropTypes.func.isRequired,
};

export default CreateIssue;
