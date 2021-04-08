import React from 'react';
import Enzyme, { shallow} from 'enzyme';

import EnzymeAdapter from 'enzyme-adapter-react-16';

import FilterOptions from '../FilterOptions.jsx';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Filter Options tests', () => {
  const mockClick =()=>{
    return 1;
  };
  const wrapperMain = shallow(<FilterOptions filterIssues={mockClick} />);
  expect(wrapperMain.length).toBe(1);

  it('Render Filter Options', () => {
    expect(wrapperMain.length).toBe(1);
  });

  // it('Should register click when click on checkbox', () => {
    // const mockFn = jest.fn();
    // const event = {
    //   target: {
    //     value: 'theft',
    //   },
    // };
    // wrapperMain.find('#theft').simulate('change', event);
    // expect(mockFn).toHaveBeenCalledWith('theft');
  // });
});
