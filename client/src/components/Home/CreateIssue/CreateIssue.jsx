import React from 'react';
import PropTypes from 'prop-types';

import IssueForm from './IssueForm/IssueForm.jsx';

class CreateIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  handleClick() {
    const { clicked } = this.state;
    this.setState({
      clicked: !clicked,
    });
  }

  render() {
    const { clicked } = this.state;
    const { user, location } = this.props;
    return (
      <div id="createIssue" onClick={() => { this.setState({ clicked: !clicked }); }}>
        here is the input area that you can click on to share an issue
        {clicked
          ? <IssueForm />
          : ''}
      </div>
    );
  }
}

CreateIssue.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default CreateIssue;
