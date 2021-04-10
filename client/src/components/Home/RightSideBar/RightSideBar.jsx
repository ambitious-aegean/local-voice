import React from 'react';
// import PropTypes from 'prop-types';
import styles from './styles.module.css';

const RightSideBar = () => (
  <div className={styles.rightContainer}>
    <div className={styles.rightSideFixed}>
      <div className={styles.adBanner}>
        <div className={styles.adBannerVerticalLayout}>
          <div className={styles.adBannerPadding}>
            <img className={styles.adImage} src="https://i.ibb.co/sqBr23c/HR-Ad.png" alt="Open ad space" />
          </div>
        </div>
      </div>
      <div className={styles.adBanner}>
        <div className={styles.adBannerVerticalLayout}>
          <div className={styles.adBannerPadding}>
            <img className={styles.adImage} src="https://www.gofundme.com/c/wp-content/uploads/2021/03/SQUARE-1.png" alt="Open ad space" width="100%" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RightSideBar;
