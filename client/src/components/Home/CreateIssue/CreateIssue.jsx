import React from 'react';
import PropTypes from 'prop-types';

import IssueForm from './IssueForm/IssueForm.jsx';

class CreateIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ clicked: true });
  }

  render() {
    const { clicked } = this.state;
    const { user, location } = this.props;
    return (
      <div id="createIssue" onClick={this.handleClick}>
        here is the input area that you can click on to share an issue
        {clicked
          ? <IssueForm user={user} location={location} />
          : ''}
      </div>
    );
  }
}

CreateIssue.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default CreateIssue;
