import React from 'react';
import PropTypes from 'prop-types';

class FilterOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { filterIssues } = this.props;
    return (
      <div id="filterOptions">

      </div>
    );
  }
}
FilterOptions.propTypes = {
  filterIssues: PropTypes.func.isRequired,
};

export default FilterOptions;
