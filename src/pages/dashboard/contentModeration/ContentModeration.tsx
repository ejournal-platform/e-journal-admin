import React, { useState, useMemo } from "react";
import { dummyContent } from "../../../components/contentModeration/data/dummyContentData";
import { ContentItem } from "../../../components/contentModeration/types";
import ContentFilterBar from "../../../components/contentModeration/ContentFilterBar";
import ContentTable from "../../../components/contentModeration/ContentTable";
import PaginationControls from "../../../components/contentModeration/PaginationControls";
import ViewContentModal from "../../../components/contentModeration/ViewContentModal";

const ITEMS_PER_PAGE = 20;

const ContentModeration = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewItem, setViewItem] = useState<ContentItem | null>(null);
  const [contentList, setContentList] = useState<ContentItem[]>(dummyContent);

  const filteredData = useMemo(() => {
    return contentList
      .filter((item) =>
        item.author.toLowerCase().includes(search.toLowerCase())
      )
      .filter((item) => (filter === "All" ? true : item.status === filter));
  }, [search, filter, contentList]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleConfirm = (id: number) => {
    setContentList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
    setViewItem(null);
  };

  const handleReject = (id: number) => {
    setContentList((prev) => prev.filter((item) => item.id !== id));
    setViewItem(null);
  };

  const handleDelete = (id: number) => {
    setContentList((prev) => prev.filter((item) => item.id !== id));
    setViewItem(null);
  };

  return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-5 text-center sm:text-left">Content Moderation</h2>
        <p className="text-gray-600 mb-6text-gray-600 mb-6">Moderate all contents in the system.</p>
      </div>

      <ContentFilterBar
        search={search}
        onSearch={setSearch}
        filter={filter}
        onFilterChange={setFilter}
      />

      <ContentTable data={paginatedData} onView={setViewItem} />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ViewContentModal 
        item={viewItem} 
        onClose={() => setViewItem(null)} 
        onConfirm={handleConfirm}
        onReject={handleReject}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ContentModeration;
