import { normalizeResponse } from '../util';
// import t from '../test-data';

const date = new Date().toISOString();

function getBookmarks() {
  return JSON.parse(localStorage.getItem('bookmarks')) || [];
}

export const REQUEST_NEWS = 'REQUEST_NEWS';
export const RECEIVE_NEWS = 'RECEIVE_NEWS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const SHOW_NEWS = 'SHOW_NEWS';
export const SHOW_BOOKMARKS = 'SHOW_BOOKMARKS';
export const BOOKMARK = 'BOOKMARK';
export const NEWS = 'NEWS';
export const BOOKMARKS = 'BOOKMARKS';

export const requestNews = (page, q) => ({
  type: REQUEST_NEWS,
  page,
  q,
});

export const receiveNews = (news, page, q) => ({
  type: RECEIVE_NEWS,
  news,
  page,
  q,
});

export const bookmark = bookmarks => ({
  type: BOOKMARK,
  bookmarks,
});

export const show = view => ({
  type: view === NEWS ? SHOW_NEWS : SHOW_BOOKMARKS,
});

export const fetchNews = (page, q) => dispatch => {
  dispatch(requestNews(page, typeof q === 'string' && page === 1));
  return fetch(
    `https://newsapi.org/v2/everything?${q ? `q=${q}&` : ''}sources=${
      process.env.REACT_APP_SOURCES
    }&page=${page}&to=${date}&pageSize=${
      process.env.REACT_APP_PAGE_SIZE
    }&apiKey=${process.env.REACT_APP_API_KEY}`,
  )
    .then(response => response.json())
    .then(response => normalizeResponse(response))
    .then(data => dispatch(receiveNews(data, page, q)))
    .catch(() => dispatch({ type: FETCH_ERROR }));
};

export const fetchBookmarks = () => dispatch =>
  dispatch(bookmark(getBookmarks()));

export const addToBookmarks = article => dispatch => {
  localStorage.setItem(
    'bookmarks',
    JSON.stringify([article, ...getBookmarks()]),
  );
  dispatch(bookmark(getBookmarks()));
};

export const removeFromBookmarks = article => dispatch => {
  localStorage.setItem(
    'bookmarks',
    JSON.stringify([...getBookmarks().filter(a => article.id !== a.id)]),
  );
  dispatch(bookmark(getBookmarks()));
};
