import React from 'react';
// import axios from 'axios';

import Header from './Header/Header.jsx';
import LeftSideBar from './LeftSideBar/LeftSideBar.jsx';
import RightSideBar from './RightSideBar/RightSideBar.jsx';
import CreateIssue from './CreateIssue/CreateIssue.jsx';
import Main from './Main/Main.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'foo',
      },
      location: {
        lat: 100,
        lng: 100,
      },
      issues: [{
        loc: {
          lat: 100,
          lng: 100,
        },
      }],
      categories: [
        'theft',
        'crime',
        'for sale',
      ],
      displayedIssues: [{
        loc: {
          lat: 100,
          lng: 100,
        },
      }],
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
      user, location, categories, displayedIssues, view,
    } = this.state;
    return (
      <div id="homeContainer">
        <div id="home">
          <Header
            toggle={this.toggle}
          />
          <LeftSideBar
            user={user}
            categories={categories}
            filterIssues={this.filterIssues}
          />
          <CreateIssue
            user={user}
            location={location}
          />
          <Main
            view={view}
            displayedIssues={displayedIssues}
            user={user}
            location={location}
            getLoc={this.getLoc}
          />
          <RightSideBar />
        </div>
      </div>
    );
  }
}

export default Home;
