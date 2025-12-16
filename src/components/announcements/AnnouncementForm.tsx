import React, { useState } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { useUploadMedia } from "../../api/hooks/media";

interface AnnouncementFormProps {
  onPublish: (title: string, content: string, mediaId: string | null) => void;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ onPublish }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mediaId, setMediaId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: uploadMedia } = useUploadMedia();

  // Handle image selection
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    setImagePreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      // 1. Get Presigned URL
      const { mediaId, uploadUrl } = await uploadMedia({ fileName: file.name, type: "IMAGE" });

      // 2. Upload to S3/R2
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      // 3. Store media ID
      setMediaId(mediaId);
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Failed to upload image");
      setImagePreview(null);
      setMediaId(null);
    } finally {
      setIsUploading(false);
    }
  };

  // Remove selected image
  const handleImageRemove = () => {
    setImagePreview(null);
    setMediaId(null);
  };

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onPublish(title, content, mediaId);

    // Reset form
    setTitle("");
    setContent("");
    setImagePreview(null);
    setMediaId(null);
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none! focus:ring-1 focus:ring-green-400 text-gray-900"
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none! focus:ring-1 focus:ring-green-400 text-gray-900"
            required
            maxLength={300}
          />
        </div>



        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload Image (optional)</label>

          {!imagePreview ? (
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
                src={imagePreview}
                alt="Preview"
                className={`rounded-lg w-full h-40 object-cover border ${isUploading ? 'opacity-50' : ''}`}
              />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white font-bold bg-black/50 px-2 py-1 rounded">Uploading...</p>
                </div>
              )}
              {!isUploading && (
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="absolute top-2 right-2 bg-black/60! text-white rounded-full p-1 hover:bg-black! transition focus:outline-none! border-none!"
                >
                  <FaTimes className="text-sm" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className={`bg-green-600! hover:bg-green-700! text-white font-semibold px-4 py-2 rounded-lg transition w-full sm:w-auto focus:outline-none! border-none! ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? 'Uploading Image...' : 'Publish Announcement'}
        </button>
      </form>
    </div>
  );
};

export default AnnouncementForm;
