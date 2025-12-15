import { FaEdit, FaTrash, FaUndo, FaArchive } from "react-icons/fa";
import { Announcement } from "../../api/hooks/announcement";

interface AnnouncementCardProps {
    item: Announcement;
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
}

const AnnouncementCard = ({ item, onDelete, onEdit, }: AnnouncementCardProps) => {
    return (
        <div className="bg-white border border-gray-300 rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Image */}
            <div className="shrink-0">
                <img
                    src={item.imageUrl || "https://via.placeholder.com/150"}
                    alt={item.title}
                    className="w-full sm:w-50 h-38 object-cover rounded-lg"
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between h-38">
                <div>
                    <h3 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                    {item.publishDate && (
                        <p className="text-xs text-gray-500 mb-1">
                            {new Date(item.publishDate).toLocaleDateString()}
                        </p>
                    )}
                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">{item.content}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    <button
                        onClick={() => onEdit?.(item.id)}
                        className="flex items-center gap-1 bg-blue-100! text-blue-600 px-3 py-2 rounded-lg text-sm! font-semibold hover:bg-blue-200! focus:outline-none! border-none!"
                    >
                        <FaEdit /> Edit
                    </button>
                    <button
                        onClick={() => onDelete?.(item.id)}
                        className="flex items-center gap-1 bg-red-100! text-red-600  rounded-lg text-sm! font-semibold hover:bg-red-200! focus:outline-none! border-none!"
                    >
                        <FaTrash /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementCard;
