import React, { useState } from "react";
import { FaTimes, FaImage } from "react-icons/fa";
import { Announcement } from "../../api/hooks/announcement";
import { useUploadMedia } from "../../api/hooks/media";

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

  // Track new media ID: null = no change, "" = removed, "id" = new image
  const [newMediaId, setNewMediaId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: uploadMedia } = useUploadMedia();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    setImage(URL.createObjectURL(file));
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

      // 3. Store new media ID
      setNewMediaId(mediaId);
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Failed to upload image");
      // Revert to original if failed? Or just clear?
      // For now, clear preview if upload fails
      setImage(null);
      setNewMediaId("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setNewMediaId(""); // Mark as removed
  };

  const handleSave = () => {
    // Determine final mediaId
    // If newMediaId is null, use original (announcement.mediaId)
    // If newMediaId is string ("" or "id"), use it
    const finalMediaId = newMediaId !== null ? newMediaId : announcement.mediaId;

    onSave({
      ...announcement,
      title,
      content,
      imageUrl: image,
      mediaId: finalMediaId,
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-400 focus:outline-none! text-gray-900"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:ring-1 focus:ring-green-400 focus:outline-none! text-gray-900"
          />
        </div>

        {/* Publish Date */}
        {/* <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Publish Date</label>
          <input
            type="datetime-local"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-400 focus:outline-none! text-gray-900"
          />
        </div> */}

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
            disabled={isUploading}
            className={`bg-green-600! text-white px-4 py-2 rounded-lg hover:bg-green-700! transition focus:outline-none! border-none! text-sm! ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isUploading ? 'Uploading...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAnnouncementModal;
