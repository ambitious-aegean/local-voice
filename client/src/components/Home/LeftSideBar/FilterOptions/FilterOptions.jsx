import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/filterOptions.module.css';

class FilterOptions extends React.Component {
  // onChange(e) {
  //   this.setState({
  //     selected:
  //   });
  // }

  render() {
    const { categories, filterIssues } = this.props;
    return (
      <div className={styles.filterOptions}>
        <form className={styles.formContainer}>
          <span className={styles.filterHeader}>Search Filter Options</span>
          {categories.map((category, index) => (
            <div className={styles.checkboxContainer} key={index}>
              <input className={styles.checkbox} name={category} value={category} id="category" type="checkbox" onChange={filterIssues} />
              <label className={styles.labels} key={category}>
                {category}
              </label>
            </div>
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
