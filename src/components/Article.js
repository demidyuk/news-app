import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MdStarBorder, MdStar } from 'react-icons/md';
import { CSSTransition } from 'react-transition-group';

class Article extends Component {
  static propTypes = {
    publisherName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    publisherLogo: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    bookmarked: PropTypes.bool.isRequired,
    onBookmark: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { in: false };
  }

  componentDidMount() {
    this.setState({ in: true });
  }

  render() {
    const {
      publisherName,
      publisherLogo,
      image,
      url,
      title,
      text,
      date,
    } = this.props;
    return (
      <CSSTransition
        timeout={700}
        classNames="anim"
        in={this.state.in}
        unmountOnExit
      >
        <Card>
          <Wrapper>
            <Header>
              <Publisher>
                <PublisherLogo src={publisherLogo} />
                <PublisherInfo>
                  <h6>{publisherName}</h6>
                  <span>{date}</span>
                </PublisherInfo>
              </Publisher>
              <BookmarkIconWrapper
                bookmarked={this.props.bookmarked}
                onClick={() => this.props.onBookmark(!this.props.bookmarked)}
              >
                {this.props.bookmarked ? (
                  <MdStar size={24} />
                ) : (
                  <MdStarBorder size={24} />
                )}
              </BookmarkIconWrapper>
            </Header>
            <StyledLink href={url} target="_blank" rel="noopener noreferrer">
              <Title>{title}</Title>
            </StyledLink>
            <Text>{text}</Text>
          </Wrapper>
          {image ? <ImageBottom src={image} /> : null}
        </Card>
      </CSSTransition>
    );
  }
}

export default Article;

const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
`;

const BookmarkIconWrapper = styled.span`
  cursor: pointer;
  color: ${({ bookmarked }) => (bookmarked ? '#007bff' : '#35495e')};
`;

const Card = styled.div`
  position: relative;
  background-color: #fff;
  word-wrap: break-word;
  border-radius: 0.75rem;
  border: 1px solid #eee;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
  margin-bottom: 2rem;
  &.anim-enter {
    opacity: 0.01;
    transform: translateY(50%);
  }

  &.anim-enter-active {
    opacity: 1;
    transform: translateY(0%);
    transition: all 700ms ease-out;
  }

  &.anim-exit {
    opacity: 1;
    transform: translateY(0%);
  }
  &.anim-exit-active {
    opacity: 0.01;
    transform: translateY(50%);
    transition: all 700ms ease-out;
  }
`;

const Wrapper = styled.div`
  padding: 1.25rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Publisher = styled.div`
  display: flex;
  align-items: center;
`;

const PublisherLogo = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #f7f9fa;
  margin: 0;
`;

const PublisherInfo = styled.div`
  margin-left: 0.75rem;
  h6 {
    font-size: 0.875rem;
    line-height: 1.3125rem;
    margin-bottom: 0 !important;
  }
  span {
    color: #8c8c8c;
    font-size: 0.9rem;
  }
`;

const Title = styled.h5`
  margin-bottom: 0.3rem;
  font-size: 1.15rem;
`;

const Text = styled.p`
  margin-bottom: 0.25rem;
`;

const ImageBottom = styled.img`
  height: 150px;
  margin: 0;
  padding: 0;
  display: block;
  object-fit: cover;
  width: 100%;
`;
