import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from './Header/Header.jsx';
import LeftSideBar from './LeftSideBar/LeftSideBar.jsx';
import RightSideBar from './RightSideBar/RightSideBar.jsx';
import CreateIssue from './CreateIssue/CreateIssue.jsx';
import Main from './Main/Main.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      location: {},
      issues: null,
      categories: [],
      displayedIssues: null,
      view: 0, // 0 = map view
    };
    this.getLoc = this.getLoc.bind(this);
    this.toggle = this.toggle.bind(this);
    this.filterIssues = this.filterIssues.bind(this);
  }

  // componentDidMount() {
  //   // send get request to retrieve the issues based on the user's location
  // }

  getIssues() {
    // query database for the issues based on the user location
    this.setState({
      issues: 'results of db query',
    });
  }

  getLoc(location) {
    this.setState({
      location,
    });
  }

  toggle() {
    const { view } = this.state;
    this.setState({
      view: Math.abs(view - 1),
    });
  }

  filterIssues() {
    // filtering algorithm
    this.setState({
      displayedIssues: 'result of filtering algorithm',
    });
  }

  render() {
    const {
      user, location, issues, categories, displayedIssues, view,
    } = this.state;
    return (
      <div id="homeContainer">
        <div id="home">
          <Header toggle={this.toggle} />
            <LeftSideBar user={user} categories={categories} filterIssues={this.filterIssues} />
          {location !== null
            ? <CreateIssue user={user} location={location} />
            : ''}
          {issues !== null
            ? <Main view={view} displayedIssues={displayedIssues} />
            : ''}
          <RightSideBar />
        </div>
      </div>
    );
  }
}

export default Home;
