import React, { Component } from 'react';

function withWindowScroller(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.lastPage = 0;
      this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
      const distanceToBottom =
        document.documentElement.offsetHeight -
        (window.pageYOffset + window.innerHeight);
      if (this.props.load && distanceToBottom < 400) {
        if (this.lastPage > this.props.page) {
          this.lastPage = 0;
        }

        if (this.props.page > 1 && this.lastPage !== this.props.page) {
          this.props.loadNext();
          this.lastPage = this.props.page;
        }
      }
    }

    componentDidMount() {
      window.addEventListener(`scroll`, this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener(`scroll`, this.handleScroll);
    }

    render() {
      const { page, loadNext, offset, load, ...others } = this.props;
      return <WrappedComponent {...others} />;
    }
  };
}

export default withWindowScroller;
