import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import Loader from './Loader';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
    this.timer = null;
    this.last = null;
  }

  handleChange(e) {
    if (this.last && Date.now() - this.last <= 500) {
      this.last = null;
      if (this.props.onCancel) this.props.onCancel();
    }
    this.setState({ query: e.target.value });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.onUserInput(this.state.query);
      this.last = Date.now();
    }, 800);
  }

  render() {
    return (
      <Wrapper>
        <SearchIconWrapper>
          {this.props.loading ? (
            <Loader size={24} duration={0.7} />
          ) : (
            <MdSearch size={24} />
          )}
        </SearchIconWrapper>
        <Input
          type="text"
          placeholder="Search"
          onChange={e => this.handleChange(e)}
          value={this.state.query}
        />
      </Wrapper>
    );
  }
}

Search.propTypes = {
  onUserInput: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  loading: PropTypes.bool.isRequired,
};

export default Search;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  max-width: 560px;
  margin: auto;
  margin-bottom: 1rem;
`;

const SearchIconWrapper = styled.span`
  position: absolute;
  top: 50%;
  bottom: 0;
  margin: 0 auto;
  transform: translateY(-50%);
  color: #35495e;
  left: 1rem;
  display: flex;
  align-self: center;
`;

const Input = styled.input`
  outline: 0;
  font-size: 1rem;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border-radius: 100rem;
  height: 3rem;
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  border: 1px solid #ddd;
`;
