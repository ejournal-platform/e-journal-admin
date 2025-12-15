import { useState } from "react";
import { useCreateAnnouncement, useGetAnnouncements } from "../../../api/hooks/announcement";
import type { Announcement } from "../../../api/hooks/announcement";

import AnnouncementForm from "../../../components/announcements/AnnouncementForm";
import AnnouncementCard from "../../../components/announcements/AnnouncementCard";
import EditAnnouncementModal from "../../../components/announcements/EditAnnouncementModal";

const Announcements = () => {
  const { data: announcements = [], isLoading, error } = useGetAnnouncements();
  const { mutate: createAnnouncement } = useCreateAnnouncement();

  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const handlePublish = (title: string, content: string, image: string | null, publishDate: string) => {
    createAnnouncement({
      title,
      content,
      imageUrl: image || undefined,
      publishDate,
    });
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete API call
    console.log('Delete announcement:', id);
  };

  const handleEdit = (id: number) => {
    const toEdit = announcements.find((a) => a.id === id);
    if (toEdit) setEditingAnnouncement(toEdit);
  }

  const handleSaveEdit = (updated: Announcement) => {
    // TODO: Implement update API call
    console.log('Update announcement:', updated);
    setEditingAnnouncement(null);
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

      {/* Active Announcements */}
      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-4">Active Announcements</h2>

        {isLoading && (
          <p className="text-gray-500 text-sm">Loading announcements...</p>
        )}

        {error && (
          <p className="text-red-500 text-sm">Error loading announcements. Please try again.</p>
        )}

        <div className="space-y-4">
          {!isLoading && !error && announcements.length > 0 ? (
            announcements.map((item) => (
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
