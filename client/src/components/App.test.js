import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import App from './App.jsx';
import Home from './Home/Home.jsx';

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

  it('should display the Home page', () => {
    const home = wrapper.find(Home)
    expect(home.exists()).toBe(true);
  });

  it('should have a default state of loggedIn set to false', () => {
    const instance = wrapper.instance();
    expect(instance.state.loggedIn).toBe(false);
  });

});
