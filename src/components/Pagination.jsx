import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const r = [];

  while (i <= to) {
    r.push(i);
    i += step;
  }

  return r;
};

function Pagination({
  records,
  onPageChanged,
  pageLimit = 30,
  pageNeighbours = 0
}) {
  const [totalRecords, setTotalRecords] = useState(records);
  const [currentPage, setCurrentPage] = useState();

  const totalPages = Math.ceil(totalRecords / pageLimit);

  useEffect(() => {
    setTotalRecords(records);
  }, [records]);

  const gotoPage = (page) => {
    const current = Math.max(0, Math.min(page, totalPages));
    const paginationData = {
      currentPage: current,
      totalPages,
      pageLimit,
      totalRecords
    };

    setCurrentPage(current);
    onPageChanged(paginationData);
  };

  useEffect(() => {
    gotoPage(1);
  }, []);

  const handleClick = (page, evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  };

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  if (!totalRecords) return null;
  if (totalPages === 1) return null;

  const pages = fetchPageNumbers();

  return (
    <nav aria-label="Pagination">
      <ul className="pagination">
        {pages.map((page) => {
          if (page === LEFT_PAGE)
            return (
              <li className="page-item">
                <button
                  type="button"
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={handleMoveLeft}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </button>
              </li>
            );

          if (page === RIGHT_PAGE)
            return (
              <li className="page-item">
                <button
                  type="button"
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={handleMoveRight}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </button>
              </li>
            );

          return (
            <li className={`page-item${currentPage === page ? ' active' : ''}`}>
              <button
                type="button"
                className="page-link"
                href="#"
                onClick={(e) => handleClick(page, e)}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Specifies the default values for props:
Pagination.defaultProps = {
  pageLimit: 18,
  pageNeighbours: 1
};

Pagination.propTypes = {
  records: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func.isRequired
};

export default Pagination;
