import React from 'react';
import PropTypes from 'prop-types';
import FilterOptions from './FilterOptions/FilterOptions.jsx';
import styles from './styles/leftBar.module.css';

const LeftSideBar = ({ user, categories, filterIssues, filterMyIssues, filterWatchedIssues }) => {
  const handleMyIssuesClick = () => {
    filterMyIssues();
  };

  const handleWatchedIssuesClick = () => {
    filterWatchedIssues();
  };

  return (
    <div className={styles.leftSideBar}>
      Left Side Bar
      <div className={styles.userBanner}>
        <div className={styles.profilePic}>profile pic</div>
        <div className={styles.userName}>
          {user.username}
          </div>
      </div>
      <div onClick={handleMyIssuesClick}>My Issues</div>
      <div onClick={handleWatchedIssuesClick}>Watched Issues</div>
      <FilterOptions categories={categories} filterIssues={filterIssues} />
    </div>
  );
};

LeftSideBar.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterIssues: PropTypes.func.isRequired,
};

export default LeftSideBar;
