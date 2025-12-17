import { useState } from "react";
import { useCreateAnnouncement, useGetAnnouncements, useUpdateAnnouncement, useDeleteAnnouncement } from "../../../api/hooks/announcement";
import type { Announcement } from "../../../api/hooks/announcement";

import AnnouncementForm from "../../../components/announcements/AnnouncementForm";
import AnnouncementCard from "../../../components/announcements/AnnouncementCard";
import EditAnnouncementModal from "../../../components/announcements/EditAnnouncementModal";

const Announcements = () => {
  const { data, isLoading, error } = useGetAnnouncements();
  const announcements = data || [];
  const { mutate: createAnnouncement } = useCreateAnnouncement();
  const { mutate: updateAnnouncement } = useUpdateAnnouncement();
  const { mutate: deleteAnnouncement } = useDeleteAnnouncement();
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const [message, setMessage] = useState<string | null>(null);

  // Sort announcements by publishDate descending (fallback to createdAt or 0)
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    const dateA = new Date(a.publishDate || a.createdAt || 0).getTime();
    const dateB = new Date(b.publishDate || b.createdAt || 0).getTime();
    return dateB - dateA;
  });

  const handlePublish = (title: string, content: string, mediaId: string | null) => {
    createAnnouncement({
      title,
      content,
      mediaId: mediaId || undefined,
    }, {
      onSuccess: () => {
        setMessage("✅ Announcement published successfully!");
        // Clear message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      },
      onError: () => {
        setMessage("❌ Failed to publish announcement.");
      }
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      deleteAnnouncement(id, {
        onSuccess: () => {
          setMessage("✅ Announcement deleted successfully!");
          setTimeout(() => setMessage(null), 3000);
        },
        onError: () => {
          setMessage("❌ Failed to delete announcement.");
        }
      });
    }
  };

  const handleEdit = (id: number) => {
    const toEdit = announcements.find((a) => a.id === id);
    if (toEdit) setEditingAnnouncement(toEdit);
  }

  const handleSaveEdit = (updated: Announcement) => {
    updateAnnouncement({
      id: updated.id.toString(),
      data: {
        title: updated.title,
        content: updated.content,
        mediaId: updated.mediaId,
        publishDate: updated.publishDate
      }
    }, {
      onSuccess: () => {
        setMessage("✅ Announcement updated successfully!");
        setEditingAnnouncement(null);
        setTimeout(() => setMessage(null), 3000);
      },
      onError: () => {
        setMessage("❌ Failed to update announcement.");
      }
    });
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-5 text-center sm:text-left">
        Announcements
      </h2>
      <p className="text-gray-600 mb-6">
        Create, publish, and manage system-wide announcements.
      </p>

      {/* Form */}
      <div className="flex">
        <AnnouncementForm onPublish={handlePublish} />
      </div>

      {/* Message Toast */}
      {message && (
        <div className={`mb-4 p-4 rounded-md text-center font-bold ${message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Active Announcements */}
      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-4 text-gray-900">Active Announcements</h2>

        {isLoading && (
          <p className="text-gray-500 text-sm">Loading announcements...</p>
        )}

        {error && (
          <p className="text-red-500 text-sm">Error loading announcements. Please try again.</p>
        )}

        <div className="space-y-4">
          {!isLoading && !error && sortedAnnouncements.length > 0 ? (
            sortedAnnouncements.map((item) => (
              <AnnouncementCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : !isLoading && !error ? (
            <p className="text-gray-500 text-sm">No active announcements.</p>
          ) : null}
        </div>
      </section>

      {/* Edit Modal */}
      {editingAnnouncement && (
        <EditAnnouncementModal
          announcement={editingAnnouncement}
          onClose={() => setEditingAnnouncement(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Announcements;
