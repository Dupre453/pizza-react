import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'

const Pagination = ({ onChangePage, currentPage}) => {
    return (
        <div className='container'>
            <ReactPaginate
                className={styles.wrapper}
                breakLabel="..."
                nextLabel=" > "
                previousLabel=" < "
                onPageChange={(event) => onChangePage(event.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                forcePage={currentPage - 1}
                renderOnZeroPageCount={null}
            />
        </div>
    );
};

export default Pagination;