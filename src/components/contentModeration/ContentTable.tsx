import React from "react";
import { ContentItem } from "../contentModeration/types";

interface Props {
  data: ContentItem[];
  onView: (item: ContentItem) => void;
}

const ContentTable = ({ data, onView }: Props) => (
  <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
   <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {["Title", "Author", "Status", "Date", "Actions"].map((h) => (
            <th
              key={h}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 font-sans font-semibold">
        {data.map((item) => (
          <tr key={item.id}>
            <td className="px-6 py-4 text-sm text-gray-700">{item.title}</td>
            <td className="px-6 py-4 text-sm text-gray-800 font-bold">{item.author}</td>
            <td className="px-6 py-4 text-sm">
              <span
                className={`px-3 py-2 rounded-full text-xs font-medium ${
                  item.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.status}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
            <td className="px-6 py-4 text-sm text-blue-600 cursor-pointer" onClick={() => onView(item)}>
              View
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ContentTable;
