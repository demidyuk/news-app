import {
  REQUEST_NEWS,
  RECEIVE_NEWS,
  BOOKMARK,
  FETCH_ERROR,
  SHOW_NEWS,
  SHOW_BOOKMARKS,
  NEWS,
  BOOKMARKS,
} from '../actions';

export default (
  state = {
    view: NEWS,
    news: [],
    bookmarks: [],
    end: false,
    isFetching: false,
    isFetchingByQuery: false,
    page: 0,
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_NEWS:
      return { ...state, isFetching: !action.q, isFetchingByQuery: action.q };
    case RECEIVE_NEWS:
      return {
        ...state,
        isFetching: false,
        view: NEWS,
        q: action.q,
        page: action.page,
        isFetchingByQuery: false,
        news:
          action.page === 1
            ? [...action.news]
            : [...state.news, ...action.news],
        end: action.news.length < 12,
      };
    case BOOKMARK:
      return {
        ...state,
        bookmarks: [...action.bookmarks],
      };
    case FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        isFetchingByQuery: false,
      };
    case SHOW_NEWS:
      return {
        ...state,
        view: NEWS,
      };

    case SHOW_BOOKMARKS:
      return {
        ...state,
        view: BOOKMARKS,
      };
    default:
      return state;
  }
};
