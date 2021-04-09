import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MapView from './MapView.jsx';
import MapIssueModal from './MapIssueModal/MapIssueModal.jsx';

configure({ adapter: new Adapter() });

describe('testing the MapView component', () => {
  const wrapper = shallow(<MapView />);
  wrapper.setState({
    location,
    showingInfoWindow: false,
    activeMarker: null,
    selectedIssue: {},
  });
  wrapper.update();

  it('should exist', () => {
    const View = wrapper.find('#mapView');
    expect(View.exists()).toBe(true);
  });

//   it('should render all the components', () => {
//     const Modal = wrapper.find(MapIssueModal);
//     expect(Modal.exists()).toBe(true);
//   });
});
