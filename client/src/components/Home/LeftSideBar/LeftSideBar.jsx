import React from 'react';
import PropTypes from 'prop-types';
import UserOptions from './UserOptions/UserOptions.jsx';
import FilterOptions from './FilterOptions/FilterOptions.jsx';

const LeftSideBar = ({ user, filterIssues }) => (
  <div id="leftSideBar">
    <UserOptions user={user} filterIssues={filterIssues} />
    <FilterOptions filterIssues={filterIssues} />
  </div>
);

LeftSideBar.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  filterIssues: PropTypes.func.isRequired,
};

export default LeftSideBar;
