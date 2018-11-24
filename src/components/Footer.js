import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Container from './Container';

const Footer = ({ children }) => (
  <Wrapper>
    <Container>{children}</Container>
  </Wrapper>
);

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footer;

const Wrapper = styled.footer`
  position: absolute;
  margin-top: 2rem;
  text-align: center;
  bottom: 0;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  border-top: 1px solid #eee;
`;
