import React from 'react';
import axios from 'axios';

import Header from "./Header/Header.jsx";
import LeftSideBar from "./LeftSideBar/LeftSideBar.jsx";
import RightSideBar from "./RightSideBar/RightSideBar.jsx";
import CreateIssue from "./CreateIssue/CreateIssue.jsx";
import Main from "./Main/Main.jsx";

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
      issues: [],
      categories: ['theft', 'crime', 'for sale'],
      displayedIssues: [
        {
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
    this.getIssues = this.getIssues.bind(this);
    this.getLoc = this.getLoc.bind(this);
    this.getIssues = this.getIssues.bind(this);
    this.toggle = this.toggle.bind(this);
    this.filterIssues = this.filterIssues.bind(this);
  }

  componentDidMount() {
    // send get request to retrieve the issues based on the user's location
    this.getIssues();
  }

  getIssues() {
    // query database for the issues based on the user location
    axios.get('/allIssues')
      .then((response) => {
        this.setState({
          issues: response.data,
        });
      })
      .catch((err) => { throw err; });
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
      user, location, categories, issues, displayedIssues, view,
    } = this.state;
    return (
      <div id="homeContainer">
        <div id="home">
          <Header toggle={this.toggle} />
          <LeftSideBar
            user={user}
            categories={categories}
            filterIssues={this.filterIssues}
          />
          <CreateIssue user={user} location={location} />
          <Main
            view={view}
            displayedIssues={issues}
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
