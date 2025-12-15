import React, { useState } from "react";
import { FaTimes, FaImage } from "react-icons/fa";
import { Announcement } from "../../api/hooks/announcement";

interface EditAnnouncementModalProps {
  announcement: Announcement;
  onClose: () => void;
  onSave: (updated: Announcement) => void;
}

const EditAnnouncementModal: React.FC<EditAnnouncementModalProps> = ({
  announcement,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(announcement.title);
  const [content, setContent] = useState(announcement.content);
  const [image, setImage] = useState<string | null>(announcement.imageUrl || null);
  const [publishDate, setPublishDate] = useState(announcement.publishDate || "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => setImage(null);

  const handleSave = () => {
    onSave({
      ...announcement,
      title,
      content,
      imageUrl: image,
      publishDate,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Edit Announcement
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-400 focus:outline-none!"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:ring-1 focus:ring-green-400 focus:outline-none!"
          />
        </div>

        {/* Publish Date */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Publish Date</label>
          <input
            type="datetime-local"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-400 focus:outline-none!"
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Image (optional)
          </label>

          {!image ? (
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 transition">
              <FaImage className="text-gray-400 text-3xl mb-2" />
              <p className="text-gray-500 text-sm">Click to upload image</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          ) : (
            <div className="relative w-full">
              <img
                src={image}
                alt="Preview"
                className="rounded-lg w-full h-40 object-cover border"
              />
              <button
                type="button"
                onClick={handleImageRemove}
                className="absolute top-2 right-2 bg-black/60! text-white rounded-full p-1 hover:bg-black! transition focus:outline-none! border-none!"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200! text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300! hover:text-black transition focus:outline-none! border-none! text-sm!"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600! text-white px-4 py-2 rounded-lg hover:bg-green-700! transition focus:outline-none! border-none! text-sm!"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAnnouncementModal;
