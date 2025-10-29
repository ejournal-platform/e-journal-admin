import { useState } from "react";
import AnnouncementForm from "../../../components/announcements/AnnouncementForm";
import AnnouncementCard from "../../../components/announcements/AnnouncementCard";
import { Announcement } from "../../../components/announcements/types";
import EditAnnouncementModal from "../../../components/announcements/EditAnnouncementModal";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Upcoming Webinar on Food Safety",
      content:
        "Join our webinar on food safety practices on July 15th at 2 PM EST. Register now!",
      image: "https://via.placeholder.com/300x150.png?text=Food+Safety+Webinar",
    },
    {
      id: 2,
      title: "New Article Published: Foodborne Illness Prevention",
      content:
        "Check out our latest article on preventing foodborne illnesses in your home and community.",
      image: "https://via.placeholder.com/300x150.png?text=Illness+Prevention",
    },
  ]);

  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const handlePublish = (title: string, content: string, image: string | null) => {
    const newAnnouncement: Announcement = {
      id: Date.now(),
      title,
      content,
      image: image || "https://via.placeholder.com/300x150.png?text=New+Announcement",
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  };

  const handleDelete = (id: number) =>
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));

  const handleEdit = (id: number) => {
    const toEdit = announcements.find((a) => a.id === id);
    if (toEdit) setEditingAnnouncement(toEdit);
  }

  const handleSaveEdit = (updated: Announcement) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
    setEditingAnnouncement(null)
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
        <div className="space-y-4">
          {announcements.length > 0 ? (
            announcements.map((item) => (
              <AnnouncementCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No active announcements.</p>
          )}
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
