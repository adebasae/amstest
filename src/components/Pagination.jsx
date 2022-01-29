/* Pagination Component 
-------------------------------------------------*/
import React from 'react';

import PropTypes from 'prop-types';

const defaultProps = {
  initialPage: 1
};

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {}
    };
  }

  UNSAFE_componentWillMount() {
    // set page if items array isn't empty
    const { items, initialPage } = this.props;
    if (items && items.length) {
      this.setPage(initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    console.log(prevState);
    const { items, initialPage } = this.props;
    if (items !== prevProps.items) {
      this.setPage(initialPage);
    }
  }

  setPage(page) {
    const { items, onChangePage } = this.props;
    let { pager } = this.state;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page, 10, 10);

    // get new page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager });

    // call change page function in parent component
    onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPag, pageSiz, maxPagesToDis) {
    // default to first page
    const currentPage = currentPag || 1;

    // default page size is 10
    const pageSize = pageSiz || 10;

    // default max pages to display is 10
    const maxPagesToDisplay = maxPagesToDis || 10;

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage;
    let endPage;
    if (totalPages <= maxPagesToDisplay) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages

      const halfwayPoint = Math.ceil(maxPagesToDisplay / 2);
      const pastHalfwayPoint = Math.floor(maxPagesToDisplay / 2) + 1;
      const beforeHalfwayPoint = halfwayPoint - 1;
      if (currentPage <= pastHalfwayPoint) {
        startPage = 1;
        endPage = maxPagesToDisplay;
      } else if (currentPage + beforeHalfwayPoint >= totalPages) {
        startPage = totalPages - (maxPagesToDisplay - 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - halfwayPoint;
        endPage = currentPage + beforeHalfwayPoint;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <ul className="pagination">
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
        </li>
        {pager.pages.map((page, index) => (
          <li
            key={index}
            className={pager.currentPage === page ? 'active' : ''}
          >
            <a onClick={() => this.setPage(page)}>{page}</a>
          </li>
        ))}
        <li
          className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
        >
          <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
        </li>
        <li
          className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
        >
          <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = {
  items: PropTypes.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number
};

Pagination.defaultProps = defaultProps;

export default Pagination;
