import React from 'react';
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
      user: {
        name: 'foo',
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
      intialLoad: true,
      filteredIssues: [],
      categories: ['theft', 'crime', 'for sale', 'infrastructure', 'nuisance', 'public agencies', 'safety', 'waste',
        'permits', 'stolen mail'],
      displayedIssues: [
        {
          categories: ['safety', 'waste',
            'permits', 'stolen mail'],
          name: 'important issue',
          description: 'my car was stolen with all of my things in it',
          photos: [
            'https://magazine.northeast.aaa.com/wp-content/uploads/2017/10/how-to-report-a-stolen-car-1-640x423.jpg',
          ],
          loc: {
            lat: 37.75974,
            lng: -122.47736,
          },
        },
        {
          categories: ['theft', 'waste',
          ],
          name: 'important issue',
          description: 'my car was stolen with all of my things in it',
          photos: [
            'https://magazine.northeast.aaa.com/wp-content/uploads/2017/10/how-to-report-a-stolen-car-1-640x423.jpg',
          ],
          loc: {
            lat: 37.7749,
            lng: -122.4194,
          },
        },
      ],
      view: 0, // 0 = map view
    };
    this.getLoc = this.getLoc.bind(this);
    this.toggle = this.toggle.bind(this);
    this.filterIssues = this.filterIssues.bind(this);
    this.filterMyIssues = this.filterMyIssues.bind(this);
    this.filterWatchedIssues = this.filterWatchedIssues.bind(this);
  }

  componentDidMount() {
    // send get request to retrieve the issues based on the user's location
    const options = {
      method: 'get',
      url: '/allIssues',
    };
    axios(options)
      .then((response) => {
        console.log(response);
        this.setState({
          issues: response.data,
        });
      });
  }

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

  // function to filter issues for user's issues
  filterMyIssues() {
    console.log('filtering my issues');
    this.setState(
      {
        displayedIssues: this.state.displayedIssues.filter((issue) => issue.username === this.state.user.name),
      },
    );
  }

  // function to filter issues for user's watched issues
  filterWatchedIssues() {
    // need to have issues data query additionally retrive data the current user is watching
    // setState of watched issues to this.state.filterWatchedIssues
    // when toggling the watched issues filter, send this.state.watchedIssues as props to Main
    // when toggling off the watched issues filter, sned this.state.displayedIssues as props to Main
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

    // iterate through currentCategories state object
    // if true, add it to axios get request options
    // axios.get with all of the filtered categories
    const atLeastOneCategory = (categories) => {
      // one or more matching
      for (let i = 0; i < categories.length; i++) {
        // console.log('this.state.currentCategories in atLeastOneCategory: ', this.state.currentCategories);
        if (this.state.currentCategories[categories[i]]) {
          // console.log('returning true');
          return true;
        }
      }
      // zero matching
      return false;
    };

    // change state on which box is checked
    const newCategories = this.state.currentCategories;

    newCategories[e.target.name] = !this.state.currentCategories[e.target.name];

    this.setState(
      {
        currentCategories: newCategories,
        // displayedIssues: this.state.displayedIssues.filter(issue => issue.categories.includes(category))
      }, () => {
        let noFilter = true;
        for (const key in newCategories) {
          if (newCategories[key] === true) {
            noFilter = false;
            break;
          }
        }

        const modifiedIssues = this.state.displayedIssues.filter((issue) => atLeastOneCategory(issue.categories) === true);
        this.setState({
          filteredIssues: noFilter === true ? this.state.displayedIssues : modifiedIssues,
        }, () => {
          console.log(this.state.currentCategories);

          console.log('this.state.filteredIssues: ', this.state.filteredIssues);
        });
      },
    );
  }

  render() {
    const {
      user, location, categories, initialLoad, filteredIssues, displayedIssues, view,
    } = this.state;
    return (
      <div id="homeContainer">
        <div id="home">
          <Header toggle={this.toggle} />
          <LeftSideBar
            user={user}
            categories={categories}
            filterIssues={this.filterIssues}
            filterMyIssues={this.filterMyIssues}
            filterWatchedIssues={this.filterWatchedIssues}
          />
          <CreateIssue user={user} location={location} />
          <Main
            view={view}
            displayedIssues={initialLoad? displayedIssues: filteredIssues}
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
