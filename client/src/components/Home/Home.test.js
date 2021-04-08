/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Home.jsx';
import Header from './Header/Header.jsx';
import LeftSideBar from './LeftSideBar/LeftSideBar.jsx';
import RightSideBar from './RightSideBar/RightSideBar.jsx';
import CreateIssue from './CreateIssue/CreateIssue.jsx';
import Main from './Main/Main.jsx';

configure({ adapter: new Adapter() });

describe('testing the Home component', () => {
  const wrapper = shallow(<Home />);
  // wrapper.setState({
  //   user: {
  //     username: 'someguy123',
  //     user_id: 1,
  //   },
  //   location: {
  //     lat: 37.7749,
  //     lng: -122.4194,
  //   },
  //   issues: [
  //     {
  //       loc: {
  //         lat: 100,
  //         lng: 100,
  //       },
  //     },
  //   ],
  //   currentCategories: {
  //     theft: false,
  //     crime: false,
  //     'for sale': false,
  //     infrastructure: false,
  //     nuisance: false,
  //     'public agencies': false,
  //     safety: false,
  //     waste: false,
  //     permits: false,
  //     'stolen mail': false,
  //   },
  //   initialLoad: true,
  //   filteredIssues: [],
  //   myIssuesFilter: false,
  //   watchedIssuesFilter: false,
  //   categories: ['theft', 'crime', 'for sale', 'infrastructure', 'nuisance', 'public agencies', 'safety', 'waste',
  //     'permits', 'stolen mail'],
  //   watched: [],
  //   view: 0, // 0 = map view
  // });
  // wrapper.update();

  it('should exist', () => {
    const home = wrapper.find('#homeContainer');
    expect(home.exists()).toBe(true);
  });

  it('should render all the components', () => {
    const H = wrapper.find(Header);
    const LSB = wrapper.find(LeftSideBar);
    const RSB = wrapper.find(RightSideBar);
    const CI = wrapper.find(CreateIssue);
    const M = wrapper.find(Main);

    expect(H.exists()).toBe(true);
    expect(LSB.exists()).toBe(true);
    expect(RSB.exists()).toBe(true);
    expect(CI.exists()).toBe(true);
    expect(M.exists()).toBe(true);
  });
});
