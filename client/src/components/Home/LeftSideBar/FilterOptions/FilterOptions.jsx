import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/filterOptions.module.css';

const categories = ['infrastructure', 'nuisance', 'theft', 'safety', 'waste', 'permits', 'crime'];

const FilterOptions = ({ filterIssues }) => (
  <div id="FilterOptions" className={styles.filterOptions}>
    <form className={styles.formContainer}>
      <span className={styles.filterHeader}>Search Filter Categories</span>
      {categories.map((category) => (
        <div className={styles.container} key={category}>
          <input id={category} className={styles.checkbox} name={category} value={category} type="checkbox" onChange={filterIssues} />
          <label htmlFor={category} className={styles.labels} key={category}>
            {category[0].toUpperCase().concat(category.slice(1))}
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
