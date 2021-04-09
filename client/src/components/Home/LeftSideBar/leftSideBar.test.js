import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import Home from '../Home.jsx';
import LeftSideBar from './leftSideBar.jsx';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
  it('renders a LeftSideBar /> component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(LeftSideBar)).to.have.lengthOf(1);
  });

  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = shallow(<LeftSideBar />);
  //   wrapper.find('.myIssuesFilterOn').simulate('click');
  //   expect(onButtonClick).to.have.property('callCount', 1);
  // });
});
