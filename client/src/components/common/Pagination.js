import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  maxPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
};

const defaultProps = {
  initialPage: 1,
  pageSize: 10
};

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    // set page if items array isn't empty
    this.setPage(this.props.initialPage);
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (
      this.props.maxPage !== prevProps.maxPage ||
      this.props.isMobile !== prevProps.isMobile
    ) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    var { maxPage, pageSize } = this.props;
    var pager = this.state.pager;

    if (page < 1 || page > maxPage) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(maxPage, page, pageSize);

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.props.onChangePage(page);
  }

  getPager(totalPages, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    var startPage, endPage;
    if (this.props.isMobile) {
      if (totalPages <= 5) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
      } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 3) {
          startPage = 1;
          endPage = 5;
        } else if (currentPage + 2 >= totalPages) {
          startPage = totalPages - 4;
          endPage = totalPages;
        } else {
          startPage = currentPage - 2;
          endPage = currentPage + 2;
        }
      }
    } else {
      if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
      } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
        } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
        }
      }
    }

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  }

  render() {
    const { pager } = this.state;
    const { isMobile } = this.props;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <ul className="pagination justify-content-center">
        <li
          className={
            pager.currentPage === 1 ? "disabled page-item" : "page-item"
          }
        >
          <a className="page-link" onClick={() => this.setPage(1)}>
            처음
          </a>
        </li>
        {isMobile ? null : (
          <li
            className={
              pager.currentPage === 1 ? "disabled page-item" : "page-item"
            }
          >
            <a
              className="page-link"
              onClick={() => this.setPage(pager.currentPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">이전</span>
            </a>
          </li>
        )}
        {pager.pages.map((page, index) => (
          <li
            key={index}
            className={
              pager.currentPage === page ? "active page-item" : "page-item"
            }
          >
            <a className="page-link" onClick={() => this.setPage(page)}>
              {page}
            </a>
          </li>
        ))}
        {isMobile ? null : (
          <li
            className={
              pager.currentPage === pager.totalPages
                ? "disabled page-item"
                : "page-item"
            }
          >
            <a
              className="page-link"
              onClick={() => this.setPage(pager.currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">다음</span>
            </a>
          </li>
        )}
        <li
          className={
            pager.currentPage === pager.totalPages
              ? "disabled page-item"
              : "page-item"
          }
        >
          <a
            className="page-link"
            onClick={() => this.setPage(pager.totalPages)}
          >
            끝
          </a>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
