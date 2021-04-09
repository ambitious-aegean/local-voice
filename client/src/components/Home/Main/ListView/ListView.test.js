/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import EnzymeAdapter from 'enzyme-adapter-react-16';

import ListView from './ListView.jsx';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('testing the List View', () => {
  const wrapper = shallow(<ListView
    user={{ user_id: 1, username: 'someguy123' }}
    displayedIssues={[{ issue_id: 1 }, { issue_id: 2 }, { issue_id: 3 }]}
  />);

  it('should render the ListView', () => {
    const listView = wrapper.find('#listView');
    expect(listView.exists()).toBe(true);
  });
});
