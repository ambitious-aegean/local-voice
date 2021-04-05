import React from 'react';
import PropTypes from 'prop-types';
import FilterOptions from './FilterOptions/FilterOptions.jsx';

const LeftSideBar = ({ user, categories, filterIssues }) => (
  <div id="leftSideBar">
    Left Side Bar
    <FilterOptions categories={categories} filterIssues={filterIssues} />
  </div>
);

LeftSideBar.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterIssues: PropTypes.func.isRequired,
};

export default LeftSideBar;
