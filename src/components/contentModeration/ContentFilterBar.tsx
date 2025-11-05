interface Props {
  search: string;
  onSearch: (value: string) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}

const ContentFilterBar = ({ search, onSearch, filter, onFilterChange }: Props) => {
  return (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <input
      type="text"
      placeholder="Search by name"
      value={search}
      onChange={(e) => onSearch(e.target.value)}
      className="grow p-2 border border-gray-300 rounded-md focus:ring-green-500! focus:border-green-500! focus:outline-none text-sm"
    />
    <div className="flex gap-4 mt-2 sm:mt-0">
      {["All", "Pending", "Approved"].map((tab) => (
        <button
          key={tab}
          className={`flex items-center bg-blue-500! text-white py-2 px-4 rounded-md hover:bg-blue-700! transition focus:outline-none! text-sm! ${
            filter === tab ? "border-blue-500!" : "border-transparent text-gray-500"
          }`}
          onClick={() => onFilterChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
    </div>
  </div>
  )
};

export default ContentFilterBar;
