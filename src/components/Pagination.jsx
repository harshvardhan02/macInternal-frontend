import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'

const Pagination = (props) => {
    const { itemsCount, pageSize, onPageChange, currentPage, nextPage, prevPage } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);

    const pages = _.range(1, pagesCount + 1);

    return (
        <div className="fixed-bottom mb-5 d-flex justify-content-center">
            <nav className="mt-3">
                <ul className="pagination">
                    <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                        <Link to="" onClick={() => prevPage()} className="page-link">Previous</Link>
                    </li>
                    {pages.map(page => (
                        <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                            <Link to="" className="page-link" onClick={() => onPageChange(page)}>{page}</Link>
                        </li>
                    ))}
                    <li className={pages.length === currentPage ? "page-item disabled" : "page-item"}>
                        <Link to="" onClick={() => nextPage()} className="page-link">Next</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;