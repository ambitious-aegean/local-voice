import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App.jsx';

configure({ adapter: new Adapter() });

test('render app', () => {
  const wrapper = shallow(<App/>);
  expect(wrapper.exists()).toBeTruthy();
});
