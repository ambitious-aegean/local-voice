import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/filterOptions.module.css';

const categories = ['theft', 'crime', 'for sale', 'infrastructure', 'nuisance', 'public agencies', 'safety', 'waste',
  'permits', 'stolen mail'];

const FilterOptions = ({ filterIssues }) => (
  <div className={styles.filterOptions}>
    <form className={styles.formContainer}>
      <span className={styles.filterHeader}>Search Filter Options</span>
      {categories.map((category) => (
        <div className={styles.container} key={category}>
          <input id={category} className={styles.checkbox} name={category} value={category} type="checkbox" onChange={filterIssues} />
          <label htmlFor={category} className={styles.labels} key={category}>
            {category}
          </label>
        </div>
      ))}
    </form>
  </div>
);

FilterOptions.propTypes = {
  filterIssues: PropTypes.func.isRequired,
};

export default FilterOptions;
