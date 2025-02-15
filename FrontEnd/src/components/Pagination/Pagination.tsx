import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Show the first page, the last page, and 3 pages around the current page
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    if (currentPage > 3) {
      pageNumbers.push(
        <BootstrapPagination.Ellipsis key="start-ellipsis" disabled />
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <BootstrapPagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </BootstrapPagination.Item>
      );
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <BootstrapPagination.Ellipsis key="end-ellipsis" disabled />
      );
    }

    return pageNumbers;
  };

  return (
    <BootstrapPagination>
      <BootstrapPagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
      <BootstrapPagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

      <BootstrapPagination.Item
        active={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        1
      </BootstrapPagination.Item>

      {renderPageNumbers()}

      {totalPages > 1 && (
        <BootstrapPagination.Item
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </BootstrapPagination.Item>
      )}

      <BootstrapPagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      <BootstrapPagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
    </BootstrapPagination>
  );
};

export default Pagination;
