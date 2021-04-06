import React from 'react';
import PropTypes from 'prop-types';

// import Discussion from '../../ListView/IssueCard/Discussion/Discussion.jsx';

class MapIssueModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  render() {
    const { clicked } = this.state;
    return (
      <div id="mapIssueModal">
        {!clicked
          ? (
            <button id="See More" type="button" onClick={this.setState({ clicked: true })} onKeyPress={this.setState({ clicked: true })} tabIndex={0}>
              See More...
            </button>
          )
          : 'clicked'}
      </div>
    );
  }
}

// MapIssueModal.propTypes = {
//   issue: PropTypes.objectOf(PropTypes.any).isRequired,
// };

export default MapIssueModal;
