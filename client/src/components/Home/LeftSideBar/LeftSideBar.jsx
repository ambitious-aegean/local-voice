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
      <div className={styles.personalFiltersContainer}>
        <div className={styles.personalFiltersVerticalLayout}>
          <div className={styles.personalFiltersPadding}>
            <p className={styles.personalFiltersLabel}>Personal Filters</p>
          </div>
          <div className={styles.filterToggleSet}>
            <div className={styles.myIssuesFilterContainer}>
              <button className={styles.myIssuesFilter} onClick={handleMyIssuesClick}>
                <span className={styles.myIssuesLabel}>My Issues</span>
              </button>
            </div>
            <div className={styles.watchedIssuesFilterContainer}>
              <button className={styles.watchedIssuesFilter} onClick={handleWatchedIssuesClick}>
                <span className={styles.watchedIssuesLabel}>Watched Issues</span>
              </button>
            </div>
          </div>
        </div>
      </div>
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
