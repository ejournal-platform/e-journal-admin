import React from "react";
import { ContentItem } from "../contentModeration/types";
import { IoClose } from "react-icons/io5";

interface Props {
  item: ContentItem | null;
  onClose: () => void;
  onConfirm: (id: number) => void
  onReject: (id: number) => void;
  onDelete: (id: number) => void;
}

const ViewContentModal = ({ item, onClose, onConfirm, onReject, onDelete }: Props) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500! hover:text-white! focus:outline-none! border-none! bg-gray-200! hover:bg-gray-600!"
        >
          <IoClose className="h-4 w-4 font-bold"/>
        </button>
        <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
        <p className="text-gray-600 mb-4">{item.description}</p>

        {/* Images */}
        {item.images && item.images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {item.images.slice(0, 3).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Content ${i}`}
                className="rounded-md object-cover"
              />
            ))}
          </div>
        )}

        {/* PDFs */}
        {item.pdfs && item.pdfs.length > 0 && (
          <div className="space-y-2 mb-4">
            {item.pdfs.slice(0, 3).map((pdf, i) => (
              <a
                key={i}
                href={pdf}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View PDF {i + 1}
              </a>
            ))}
          </div>
        )}

        {/* Videos */}
        {item.videos && item.videos.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {item.videos.slice(0, 2).map((v, i) => (
              <video key={i} src={v} controls className="rounded-md" />
            ))}
          </div>
        )}

        {item.status === "Pending" ? (
          <div className="flex justify-end gap-3 mt-4 text-sm">
            <button
              onClick={() => onReject(item.id)}
              className="px-4 py-2 bg-red-500! text-white rounded hover:bg-red-600! focus:outline-none! border-none!"
            >
              Reject
            </button>
            <button
              onClick={() => onConfirm(item.id)} 
              className="px-4 py-2 bg-green-500! text-white rounded hover:bg-green-600! focus:outline-none! border-none!"
            >
              Confirm
            </button>
          </div>
        ) : (
          <div className="flex justify-end mt-4 text-sm">
            <button
              onClick={() => onDelete(item.id)}
              className="px-4 py-2 bg-red-500! text-white rounded hover:bg-red-600! focus:outline-none! border-none!"
            >
              Delete
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewContentModal;
