/* eslint-disable import/extensions */
import React from 'react';
import { shallow, render } from 'enzyme';
import Reviews from './Reviews.jsx';

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Reviews />);
    const props = [{ name: 'Arash', data: 'today' }, { name: 'Don', data: '12-4-19' }];
    wrapper.setProps({ reviews: props });
    expect(wrapper.props()).toEqual();
  });

  it('should render', () => {
    const wrapper = render(<Reviews />);
    expect(wrapper);
  });
});
