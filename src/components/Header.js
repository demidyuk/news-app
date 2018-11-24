import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Container from './Container';

const Header = ({ children }) => (
  <Wrapper>
    <Container>{children}</Container>
  </Wrapper>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;

const Wrapper = styled.header`
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  padding-top: 2rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #eee;
`;
