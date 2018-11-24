import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Header from '../components/Header';
import Title from '../components/Title';
import Search from '../components/Search';
import {
  fetchNews,
  fetchBookmarks,
  addToBookmarks,
  removeFromBookmarks,
  show,
  NEWS,
  BOOKMARKS,
} from '../actions';
import ResponsiveList from '../components/ResponsiveList';
import Article from '../components/Article';
import Loader from '../components/Loader';
import Button from '../components/Button';
import Footer from '../components/Footer';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.lastPage = 0;
  }

  componentDidMount() {
    this.props.fetchBookmarks();
    this.props.fetchNews(1);
  }

  loadNextPage() {
    if (!this.isFetching())
      this.props.fetchNews(this.props.page + 1, this.props.q);
  }

  isFetching() {
    return this.props.isFetching || this.props.isFetchingByQuery;
  }

  render() {
    return (
      <>
        <Header>
          <Title>{process.env.REACT_APP_PROJECT_NAME}</Title>
          <Search
            loading={this.props.isFetchingByQuery}
            onUserInput={q => this.props.fetchNews(1, q)}
          />
          <Button
            onClick={() =>
              this.props.view === NEWS
                ? this.props.show(BOOKMARKS)
                : this.props.show(NEWS)
            }
          >
            {this.props.view === NEWS
              ? `bookmarks (${this.props.bookmarks.length})`
              : 'feed'}
          </Button>
        </Header>
        <Center>
          {this.isFetching() && this.props.news.length === 0 ? (
            <span>loading...</span>
          ) : this.props.news.length === 0 ? (
            <span>no news :(</span>
          ) : null}
        </Center>
        <ResponsiveList
          page={this.props.page}
          load={this.props.view === NEWS && !this.props.end}
          loadNext={() => {
            this.loadNextPage();
          }}
        >
          {this.props[this.props.view === NEWS ? 'news' : 'bookmarks'].map(
            article => (
              <Article
                key={article.id}
                bookmarked={
                  !!this.props.bookmarks.filter(a => a.id === article.id).length
                }
                {...article}
                onBookmark={b => {
                  if (b) this.props.addToBookmarks(article);
                  else this.props.removeFromBookmarks(article);
                }}
              />
            ),
          )}
        </ResponsiveList>
        {this.props.view === NEWS ? (
          <Center>
            {this.props.page === 1 && this.props.news.length ? (
              <Button onClick={() => this.loadNextPage()}>
                {this.isFetching() ? '...' : 'load more'}
              </Button>
            ) : this.isFetching() && this.props.page > 1 ? (
              <Loader size={40} duration={0.7} />
            ) : null}
          </Center>
        ) : null}
        <Footer>Contact us – {process.env.REACT_APP_EMAIL}</Footer>
      </>
    );
  }
}

const Center = styled.div`
  width: 100%;
  text-align: center;
`;

const mapStateToProps = state => {
  const {
    isFetching,
    isFetchingByQuery,
    news,
    bookmarks,
    view,
    end,
    page,
    q,
  } = state;
  return {
    isFetching,
    isFetchingByQuery,
    news,
    view,
    end,
    bookmarks,
    page,
    q,
  };
};

export default connect(
  mapStateToProps,
  { fetchNews, fetchBookmarks, addToBookmarks, removeFromBookmarks, show },
)(AppContainer);
