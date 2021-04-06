import React from 'react';
import PropTypes from 'prop-types';
import FilterOptions from './FilterOptions/FilterOptions.jsx';

const LeftSideBar = ({ user, categories, filterIssues, filterMyIssues, filterWatchedIssues }) => {
  const handleMyIssuesClick = () => {
    filterMyIssues();
  };

  const handleWatchedIssuesClick = () => {
    filterWatchedIssues();
  };

  return (
    <div id="leftSideBar">
      Left Side Bar
      <div id="userBanner">
        <div id="profilePic">profile pic</div>
        <div id="userName">{user.name}</div>
      </div>
      <div onClick={handleMyIssuesClick}>My Issues</div>
      <div onClick={handleWatchedIssuesClick}>Watched Issues</div>
      <FilterOptions categories={categories} filterIssues={filterIssues} />
    </div>
  );
};

LeftSideBar.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterIssues: PropTypes.func.isRequired,
};

export default LeftSideBar;
