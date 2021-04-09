/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';

import Header from './Header/Header.jsx';
import LeftSideBar from './LeftSideBar/LeftSideBar.jsx';
import RightSideBar from './RightSideBar/RightSideBar.jsx';
import CreateIssue from './CreateIssue/CreateIssue.jsx';
import Main from './Main/Main.jsx';
import styles from './home.module.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: 'someguy123',
        user_id: 1,
        watchedList: [],
      },
      location: {
        lat: 37.7749,
        lng: -122.4194,
      },
      issues: [
        {
          loc: {
            lat: 100,
            lng: 100,
          },
        },
      ],
      currentCategories: {
        theft: false,
        crime: false,
        infrastructure: false,
        nuisance: false,
        safety: false,
        waste: false,
        pfermits: false,
      },
      initialLoad: true,
      filteredIssues: [],
      myIssuesFilter: false,
      watchedIssuesFilter: false,
      watched: [],
      view: 0, // 0 = map view
    };
    this.getIssues = this.getIssues.bind(this);
    this.getLoc = this.getLoc.bind(this);
    this.getIssues = this.getIssues.bind(this);
    this.toggle = this.toggle.bind(this);
    this.filterIssues = this.filterIssues.bind(this);
    this.filterMyIssues = this.filterMyIssues.bind(this);
    this.filterWatchedIssues = this.filterWatchedIssues.bind(this);
  }

  componentDidMount() {
    const { user, location } = this.state;
    // send get request to retrieve the issues based on the user's location
    this.getIssues(user.user_id, location.lat, location.lng);
  }

  getIssues(user_id, lat, lng) {
    // query database for the issues based on the user location
    axios.get('/allIssues', {
      params: {
        user_id,
        lat,
        lng,
      },
    })
      .then((response) => {
        console.log(response);
        const reversed = response.data.issues.reverse();
        this.setState({
          issues: reversed,
          user: {
            username: 'someguy123',
            user_id: 1,
            votedList: response.data.votedList,
          },
          watched: response.data.watchedList,
        }, () => {
          // console.log('this.state.issues: ', this.state.issues);
          // console.log('this.state.watched: ', this.state.watched);
        });
      })
      .catch((err) => { throw err; });
  }

  getLoc(location) {
    this.setState({
      location,
    });
    const { user } = this.state;
    this.getIssues(user.user_id, location.lat, location.lng);
  }

  // function to filter issues for user's issues
  filterMyIssues() {
    const { user, issues, myIssuesFilter } = this.state;
    this.setState({
      initialLoad: false,
      myIssuesFilter: !myIssuesFilter,
    }, () => {
      if (!myIssuesFilter) {
        this.setState({
          filteredIssues: issues.filter((issue) => issue.username === user.username),
        });
      } else {
        this.setState({
          filteredIssues: issues,
        });
      }
    });
  }

  // function to filter issues for user's watched issues
  filterWatchedIssues() {
    const { watchedIssuesFilter, issues, watched } = this.state;
    this.setState({
      initialLoad: false,
      watchedIssuesFilter: !watchedIssuesFilter,
    }, () => {
      if (!watchedIssuesFilter) {
        const issuesArray = issues;
        const filteredIssues = [];
        for (let i = 0; i < issuesArray.length; i++) {
          if (watched.includes(issuesArray[i].issue_id)) {
            filteredIssues.push(issuesArray[i]);
          }
        }
        this.setState({
          filteredIssues:filteredIssues,
        });
      } else {
        this.setState({
          filteredIssues: issues,
        }, console.log(this.state.filteredIssues));
      }
    });
  }

  toggle() {
    const { view } = this.state;
    this.setState({
      view: Math.abs(view - 1),
    });
  }

  filterIssues(e) {
    const { issues, currentCategories } = this.state;


    // change intialLoad to false
    this.setState({
      initialLoad: false,
    });

    const atLeastOneCategory = (categories) => {
      // one or more matching return true
      for (let i = 0; i < categories.length; i++) {
        if (currentCategories[categories[i]]) {
          return true;
        }
      }
      // zero matching return false
      return false;
    };

    // change state on which box is checked
    const newCategories = currentCategories;
    newCategories[e.target.name] = !currentCategories[e.target.name];

    this.setState(
      {
        currentCategories: newCategories,
      }, () => {
        let noFilter = true;
        for (const category in newCategories) {
          if (newCategories[category] === true) {
            noFilter = false;
            break;
          }
        }
        // filter out issues that doesnt match any of the current selected check boxes
        const modifiedIssues = issues.filter((issue) => atLeastOneCategory(issue.categories));
        this.setState({
          filteredIssues: noFilter === true ? issues : modifiedIssues,
        });
      },
    );
  }

  render() {
    const {
      issues, user, location, initialLoad, filteredIssues, view, watched,
    } = this.state;
    if (!issues.length) {
      return (
        <div>
          Loading
        </div>
      );
    }
    return (
      <div id="homeContainer" className={styles.homeContainer}>
        <Header toggle={this.toggle} />
        <div id="flexContainer" className={styles.flexContainer}>
          <LeftSideBar
            user={user}
            filterIssues={this.filterIssues}
            filterMyIssues={this.filterMyIssues}
            filterWatchedIssues={this.filterWatchedIssues}
          />
          <div id="mainContainer" className={styles.mainContainer}>
            <CreateIssue
              user={user}
              location={location}
              getIssues={this.getIssues}
            />
            <Main
              view={view}
              displayedIssues={initialLoad ? issues : filteredIssues}
              user={user}
              location={location}
              getLoc={this.getLoc}
            />
          </div>
          <RightSideBar />
        </div>
      </div>
    );
  }
}

export default Home;
