import React from 'react';
import PropTypes from 'prop-types';

import LeftSideBar from './LeftSideBar/LeftSideBar';
import CreateIssue from './CreateIssue/CreateIssue';
import Main from './Main/Main';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      location: {},
      issues: [],
      displayedIssues: null,
      view: 'map',
    };
    this.getLoc = this.getLoc.bind(this);
    this.filterIssues = this.filterIssues.bind(this);
  }

  componentDidMount() {
    // send get request to retrieve the issues based on the user's location
  }

  getLoc(location) {
    this.setState({
      location,
    });
  }

  getIssues() {
    // query database for the issues based on the user location
    this.setState({
      issues: 'results of db query',
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
      user, location, issues, displayedIssues, view,
    } = this.state;
    return (
      <div id="home">
        <LeftSideBar user={user} filterIssues={this.filterIssues} />
        <CreateIssue />
        <Main view={view} displayedIssues={displayedIssues} />
      </div>

    );
  }
}


export default Home;
