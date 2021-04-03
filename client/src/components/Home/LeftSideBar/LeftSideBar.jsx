import React from 'react';
import PropTypes from 'prop-types';
import UserOptions from './UserOptions/UserOptions';
import FilterOptions from './FilterOptions/FilterOptions';

const LeftSideBar = ({ user, categories, filterIssues }) => (
  <div id="leftSideBar">
    <UserOptions user={user} filterIssues={filterIssues} />
    <FilterOptions categories={categories} filterIssues={filterIssues} />
  </div>
);

LeftSideBar.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  filterIssues: PropTypes.func.isRequired,
};

export default LeftSideBar;
