import React from 'react';
import PropTypes from 'prop-types';

class IssueForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="issueForm">
        Issue Form
      </div>
    );
  }
}

IssueForm.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default IssueForm;