import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterOptions from './FilterOptions/FilterOptions.jsx';
import styles from './styles/leftBar.module.css';

const LeftSideBar = ({
  user, filterIssues, filterMyIssues, filterWatchedIssues,
}) => {
  const [myIssuesFilter, toggleMyIssues] = useState(false);
  const [watchedIssuesFilter, toggleWatchedIssues] = useState(false);

  const handleMyIssuesClick = () => {
    filterMyIssues();
    toggleMyIssues(!myIssuesFilter);
  };

  const handleWatchedIssuesClick = () => {
    filterWatchedIssues();
    toggleWatchedIssues(!watchedIssuesFilter);
  };

  return (
    <div id="LeftSideBar" className={styles.leftSideBar}>
      <div className={styles.allFilters}>
        <div className={styles.welcomeBanner}>
          <div className={styles.welcomeBannerVerticalLayout}>
            <div className={styles.welcomeTagPadding}>
              <p className={styles.welcomeTag}>
                Welcome,
                {user.username}
                !
              </p>
            </div>
          </div>
        </div>

        <div className={styles.personalFiltersContainer}>
          <div className={styles.personalFiltersVerticalLayout}>
            <div className={styles.personalFiltersPadding}>
              <p className={styles.personalFiltersLabel}>Personal Filters</p>
            </div>
            <div className={styles.filterToggleSet}>
              <div className={styles.myIssuesFilterContainer}>
                <button className={myIssuesFilter ? styles.myIssuesFilterOn : styles.myIssuesFilterOff} onClick={handleMyIssuesClick}>
                  <span className={styles.myIssuesLabel}>My Issues</span>
                </button>
              </div>
              <div className={styles.watchedIssuesFilterContainer}>
                <button className={watchedIssuesFilter ? styles.watchedIssuesFilterOn : styles.watchedIssuesFilterOff} onClick={handleWatchedIssuesClick}>
                  <span className={styles.watchedIssuesLabel}>Watched Issues</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <FilterOptions filterIssues={filterIssues} />
      </div>
    </div>
  );
};

LeftSideBar.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  filterIssues: PropTypes.func.isRequired,
};

export default LeftSideBar;
