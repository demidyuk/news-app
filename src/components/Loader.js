import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Loader = ({ size, duration, ...other }) => (
  <StyledLoader size={size} duration={duration} {...other} />
);

Loader.propTypes = {
  size: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default Loader;

const StyledLoader = styled.div`
  position: relative;
  display: inline-block;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  &:before {
    position: absolute;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid rgba(0, 0, 0, 0.1);
  }

  &:after {
    position: absolute;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    animation: loader ${({ duration }) => `${duration}s infinite linear`};
    border-radius: 50%;
    border-style: solid;
    border-width: 3px;
    border-color: #35495e transparent transparent;
    box-shadow: 0px 0px 0px 1px transparent;
  }

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
