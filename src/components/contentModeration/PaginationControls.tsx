import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({ currentPage, totalPages, onPageChange }: Props) => (
  <div className="flex justify-end items-center gap-3 mt-4">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-gray-500! text-sm! text-white rounded disabled:opacity-50 focus:outline-none! border-none!"
    >
      Previous
    </button>
    <span className="text-gray-600 text-sm">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-gray-500! text-sm! text-white rounded disabled:opacity-50 focus:outline-none! border-none!"
    >
      Next
    </button>
  </div>
);

export default PaginationControls;
