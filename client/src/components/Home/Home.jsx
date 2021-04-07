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
        'for sale': false,
        infrastructure: false,
        nuisance: false,
        'public agencies': false,
        safety: false,
        waste: false,
        permits: false,
        'stolen mail': false,
      },
      initialLoad: true,
      filteredIssues: [],
      myIssuesFilter: false,
      watchedIssuesFilter: false,
      categories: ['theft', 'crime', 'for sale', 'infrastructure', 'nuisance', 'public agencies', 'safety', 'waste',
        'permits', 'stolen mail'],
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
    console.log('hi');
    // query database for the issues based on the user location
    axios.get('/allIssues', {
      params: {
        user_id,
        lat,
        lng,
      },
    })
      .then((response) => {
        this.setState({
          issues: response.data.issues,
          watched: response.data.watched,
        }, () => {
          console.log('this.state.issues: ', this.state.issues);
          console.log('this.state.watched: ', this.state.watched);
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
    this.setState({
      initialLoad: false,
      myIssuesFilter: !this.state.myIssuesFilter,
    }, () => {
      if (this.state.myIssuesFilter) {
        this.setState({
          filteredIssues: this.state.issues.filter((issue) => issue.username === this.state.user.username),
        });
      } else {
        this.setState({
          filteredIssues: this.state.issues,
        });
      }
    });
  }

  // function to filter issues for user's watched issues
  filterWatchedIssues() {
    this.setState({
      initialLoad: false,
      watchedIssuesFilter: !this.state.watchedIssuesFilter,
    }, () => {
      if (this.state.watchedIssuesFilter) {
        const issuesArray = this.state.issues;
        const filteredIssues = [];
        for (let i = 0; i < issuesArray.length; i++) {
          if (this.state.watched.includes(issuesArray[i].issue_id)) {
            filteredIssues.push(issuesArray[i]);
          }
        }
        this.setState({
          filteredIssues,
        });
      } else {
        this.setState({
          filteredIssues: this.state.issues,
        });
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
    // change intialLoad to false
    this.setState({
      initialLoad: false,
    });

    // return true if at least one of the issue's categories matched one of the currently checked categories
    const atLeastOneCategory = (categories) => {
      // one or more matching return true
      for (let i = 0; i < categories.length; i++) {
        if (this.state.currentCategories[categories[i]]) {
          return true;
        }
      }
      // zero matching return false
      return false;
    };

    // change state on which box is checked
    const newCategories = this.state.currentCategories;
    newCategories[e.target.name] = !this.state.currentCategories[e.target.name];

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
        const modifiedIssues = this.state.issues.filter((issue) => atLeastOneCategory(issue.categories));

        this.setState({
          filteredIssues: noFilter === true ? this.state.issues : modifiedIssues,
        });
      },
    );
  }

  render() {
    const {
      issues, user, location, categories, initialLoad, filteredIssues, view,
    } = this.state;
    return (
      <div id="homeContainer" className={styles.homeContainer}>
        <Header toggle={this.toggle} />
        <div id="flexContainer" className={styles.flexContainer}>
          <LeftSideBar
            user={user}
            categories={categories}
            filterIssues={this.filterIssues}
            filterMyIssues={this.filterMyIssues}
            filterWatchedIssues={this.filterWatchedIssues}
          />
          <div id="mainContainer" className={styles.mainContainer}>
            <CreateIssue user={user} location={location} />
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
