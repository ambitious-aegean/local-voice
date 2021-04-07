import React from 'react';
import { mount } from 'enzyme';

import App from './App.jsx';
import LogIn from './LogIn/LogIn.jsx';

describe('test App component', () => {
  const wrapper = mount(<App />);
  wrapper.setState({
    loggedIn: false,
  });
  wrapper.update();

  it('should exist', () => {
    const app = wrapper.find('#app');
    expect(app.exists()).toBe(true);
    const LogIn = wrapper.find(LogIn);
    expect(LogIn.exists()).toBe(true);
  });

  it('should have a default state of productId being 14931', () => {
    const instance = wrapper.instance();
    expect(instance.state.productId).toBe(14931);
  });

  it('should get the productName', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    expect(instance.state.productName).toBe('Manuela Pants');
  });
});
