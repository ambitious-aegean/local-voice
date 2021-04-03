import React from 'react';
import PropTypes from 'prop-types';

class FilterOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  render() {
    const { categories, filterIssues } = this.props;
    return (
      <div id="filterOptions">
        <form>
          {categories.map((category) => (
            <input id="category" type="checkbox" value={category} />
          ))}
        </form>
      </div>
    );
  }
}

FilterOptions.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterIssues: PropTypes.func.isRequired,
};

export default FilterOptions;
