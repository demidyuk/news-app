import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withSize } from 'react-sizeme';
import Container from './Container';
import withWindowScroller from './withWindowScroller';

const ResponsiveList = withSize()(({ size: { width }, config, children }) => {
  const cols = [];
  const elements = React.Children.toArray(children);
  let lastCount = config[0][1];
  let lastRedundantWidth = config[0][2];
  config.forEach(el => {
    if (width <= el[0]) {
      [, lastCount, lastRedundantWidth] = el;
    }
  });
  for (let i = 0; i < elements.length; i++) {
    if (!cols[i % lastCount]) cols[i % lastCount] = [];
    cols[i % lastCount].push(elements[i]);
  }
  return (
    <Container>
      <Wrapper>
        {cols.map((col, i) => (
          <Col
            count={lastCount}
            w={`${100 / lastCount}% - ${lastRedundantWidth}px`}
            key={i}
          >
            {col}
          </Col>
        ))}
      </Wrapper>
    </Container>
  );
});

ResponsiveList.propTypes = {
  config: PropTypes.arrayOf(PropTypes.array),
};

ResponsiveList.defaultProps = {
  config: [[1100, 3, 22], [750, 2, 16], [580, 1, 0]],
};

export default withWindowScroller(ResponsiveList);

const Wrapper = styled.div`
  &:after {
    content: '';
    display: block;
    clear: both;
`;

const Col = styled.div`
  margin: ${({ count }) => (count > 2 ? '0 16px' : '0 0')};
  float: left;
  width: calc(${({ w }) => w});
  ${({ count }) =>
    count > 1
      ? `
    &:first-child {
    margin-right: 16px;
    margin-left: 0rem;
  }

  &:last-child {
    margin-left: 16px;
    margin-right: 0rem;
  }`
      : ''}
`;
