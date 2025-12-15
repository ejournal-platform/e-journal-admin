import React, { useState } from "react";
import { FaImage, FaTimes } from "react-icons/fa";

interface AnnouncementFormProps {
  onPublish: (title: string, content: string, image: string | null, publishDate: string) => void;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ onPublish }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [publishDate, setPublishDate] = useState("");

  // Handle image selection
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Remove selected image
  const handleImageRemove = () => setImage(null);

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !publishDate) return;

    onPublish(title, content, image, publishDate);

    // Reset form
    setTitle("");
    setContent("");
    setImage(null);
    setPublishDate("");
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-gray-800 font-semibold text-lg mb-4">
        Create New Announcement
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Upcoming Webinar on Food Safety"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none! focus:ring-1 focus:ring-green-400"
            required
            maxLength={40}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter announcement details..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none! focus:ring-1 focus:ring-green-400"
            required
            maxLength={300}
          />
        </div>

        {/* Publish Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Publish Date</label>
          <input
            type="datetime-local"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none! focus:ring-1 focus:ring-green-400"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload Image (optional)</label>

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
            <div className="relative w-full sm:w-64">
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600! hover:bg-green-700! text-white font-semibold px-4 py-2 rounded-lg transition w-full sm:w-auto focus:outline-none! border-none!"
        >
          Publish Announcement
        </button>
      </form>
    </div>
  );
};

export default AnnouncementForm;
