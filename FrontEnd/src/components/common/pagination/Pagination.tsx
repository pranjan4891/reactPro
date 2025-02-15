import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css'; // Make sure this path is correct based on your file structure

interface PaginationProps {
  totalPages: number;
  onPageChange: (selectedPage: { selected: number }) => void;
  limit: number;
  onLimitChange: (newLimit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
  limit,
  onLimitChange,
}) => (
  <div className='flex items-center content-between gap-5'>
    {/* Record Limit Selector */}
    <div className='flex gap-2 items-center'>
      <label
        htmlFor='record-limit'
        className='flex-auto text-sm text-gray-600'>
        Records per page:{' '}
      </label>
      <select
        className='select select-bordered rounded-md select-sm max-w-xs dark:bg-white'
        style={{ lineHeight: 1 }}
        id='record-limit'
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>

    {/* Pagination Controls */}
    <ReactPaginate
      previousLabel={<i className='ri-arrow-left-double-line'></i>}
      nextLabel={<i className='ri-arrow-right-double-line'></i>}
      breakLabel={'...'}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={onPageChange} // Make sure this handler is properly invoked
      containerClassName={'pagination'}
      activeClassName={'active'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      nextClassName={'page-item'}
      breakClassName={'page-item'}
      disabledClassName={'disabled'}
    />
  </div>
);

export default Pagination;
