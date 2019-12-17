import React from 'react';
import { shallow, render } from 'enzyme';
import App from './App';

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    const wrapper = render(<App />);
    expect(wrapper);
  });

  it('should have three child nodes', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.equals(<div className="components" />)).toEqual(false);
  });

  it('should render expected texts', () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find('div');
    expect(text.text()).toBe('Stats:<Stats /><Search /><Reviews />');
  });

  it('should have three child components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.text()).toEqual('Stats:<Stats /><Search /><Reviews />');
  });
});
