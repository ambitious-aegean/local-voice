import React from 'react';
import PropTypes from 'prop-types';

class FilterOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
    };
  }

  // onChange(e) {
  //   this.setState({
  //     selected:
  //   });
  // }

  render() {
    const { categories, filterIssues } = this.props;
    return (
      <div id="filterOptions">
        <form>
          filter options
          {categories.map((category) => (
            <label key={category}>
              {category}
              <input name={category} value={category} id="category" type="checkbox" onChange={filterIssues} />
            </label>
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
