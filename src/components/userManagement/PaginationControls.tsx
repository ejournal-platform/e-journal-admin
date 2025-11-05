import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  itemsPerPage: number;
  onNext: () => void;
  onPrevious: () => void;
}

const PaginationControls: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalResults,
  itemsPerPage,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <p className="text-sm text-gray-600">
        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
        {Math.min(currentPage * itemsPerPage, totalResults)} of {totalResults} results
      </p>
      <div className="flex space-x-2">
        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm! font-medium rounded-md focus:outline-none! border-none! ${
            currentPage === 1
              ? "bg-gray-200! text-gray-400! cursor-not-allowed"
              : "bg-gray-500! text-white"
          }`}
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-sm! font-medium rounded-md focus:outline-none! border-none! ${
            currentPage === totalPages
              ? "bg-gray-200! text-gray-400! cursor-not-allowed"
              : "bg-gray-500! text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
