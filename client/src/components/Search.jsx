/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';

const Icon = styled.span`
font-family: 'Montserrat', sans-serif;
font-weight: light;
size: 12px;
color: #c0c0c0; 
`;

const Wrapper = styled.form`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  width: 325px;
  height: 20px;
  margin-left: 40px;
  padding: 5px;
  border: 1px solid #ededed;
  border-radius: 5px;
`;

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { value } = this.state;
    const { handleSearch } = this.props;
    handleSearch(value);
    this.setState({ value: '' });
  }

  render() {
    const { value } = this.state;
    return (
      <Wrapper onSubmit={this.handleSubmit}>
        <input type="text" style={{ width: '300px', border: 'none' }} name="name" placeholder="Search review" onChange={this.handleChange} value={value} />
        <Icon>
          <button style={{ border: 'none' }} type="submit" aria-label="search" value=""><MdSearch /></button>
        </Icon>
      </Wrapper>
    );
  }
}

export default Search;
