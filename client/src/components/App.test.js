import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import App from './App.jsx';
import LogIn from './LogIn/LogIn.jsx';

describe('test App component', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({
    loggedIn: false,
  });
  wrapper.update();

  it('should exist', () => {
    const app = wrapper.find('#app');
    expect(app.exists()).toBe(true);
  });

  it('should have a default state of loggedIn set to false', () => {
    const instance = wrapper.instance();
    expect(instance.state.loggedIn).toBe(false);
  });

  // it('should display the LogIn page', () => {
  //   const logIn = wrapper.find(LogIn)
  //   expect(LogIn.exists()).toBe(true);
  // });
});
