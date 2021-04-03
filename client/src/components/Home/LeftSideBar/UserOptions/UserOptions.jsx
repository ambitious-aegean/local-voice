import React from 'react';
import PropTypes from 'prop-types';

class UserOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, filterIssues } = this.props;
    return (
      <div id="userOptions">

      </div>
    );
  }
}
UserOptions.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  filterIssues: PropTypes.func.isRequired,
};

export default UserOptions;
