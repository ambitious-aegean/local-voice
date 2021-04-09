/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import EnzymeAdapter from 'enzyme-adapter-react-16';

import LeftSideBar from './LeftSideBar.jsx';
import FilterOptions from './FilterOptions/FilterOptions.jsx';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('test the left side bar', () => {
  const wrapper = shallow(<LeftSideBar
    user={{
      user_id: 1,
      username: 'someguy123',
      votedList: [],
      watchedList: [4, 8, 12],
    }}
    filterIssues={() => {}}
  />);

  it('should exist', () => {
    const leftSideBar = wrapper.find('#LeftSideBar');
    expect(leftSideBar.exists()).toBe(true);
  });

  it('should display the filer options', () => {
    const filterOptions = wrapper.find(FilterOptions);
    expect(filterOptions.exists()).toBe(true);
  });
});
