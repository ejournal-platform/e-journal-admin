import { usePendingPosts, useApprovePost, useRejectPost } from "../../../api/hooks/posts";
import { useMemo, useState } from "react";

interface PostPreview {
  id: string;
  description: string;
  author: string;
  date: string;
  images: number;
  caption: string;
  mediaUrls: string[];
}

const ContentModeration = () => {
  const { data: postsData, isLoading, error } = usePendingPosts();
  const { mutate: approvePost, isPending: isApproving } = useApprovePost();
  const { mutate: rejectPost, isPending: isRejecting } = useRejectPost();
  const [viewingPost, setViewingPost] = useState<PostPreview | null>(null);

  const pendingPosts = useMemo(() => {
    if (!postsData) return [];
    return postsData.map((post) => ({
      id: post.id,
      description:  post.caption.split('\n')[2].length > 0
        ? post.caption.split('\n')[2].length > 20
          ? post.caption.split('\n')[2].slice(0, 20) + "..." : post.caption.split('\n')[2]
        : "Untitled",
      author: `${post.author.firstName} ${post.author.lastName}`,
      date: new Date(post.createdAt).toLocaleDateString(),
      images: post.mediaUrls.length,
      caption: post.caption,
      mediaUrls: post.mediaUrls,
    }));
  }, [postsData]);

  const handleApprove = (id: string) => {
    // if (window.confirm("Approve this post?")) {
      approvePost(id);
      setViewingPost(null);
    // }
  };

  const handleReject = (id: string) => {
    // if (window.confirm("Reject this post?")) {
      rejectPost(id);
      setViewingPost(null);
    // }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl! md:text-4xl! font-bold text-gray-900 mb-6 sm:mb-5 text-center sm:text-left">
        Content Moderation
      </h1>

      {isLoading && <p className="text-center text-gray-500">Loading pending posts...</p>}
      {error && <p className="text-center text-red-500">Failed to load pending posts.</p>}

      {!isLoading && !error && (
        <>
          <div className="w-full overflow-x-auto rounded-lg shadow-sm border border-gray-100 bg-white p-3 sm:p-5">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-sm font-semibold text-gray-700">Description</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Author</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Date</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Media</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingPosts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-800 max-w-xs truncate">
                      {post.description}
                    </td>
                    <td className="py-3 text-sm text-gray-600">{post.author}</td>
                    <td className="py-3 text-sm text-gray-600">{post.date}</td>
                    <td className="py-3 text-sm text-gray-600">{post.images}</td>
                    <td className="py-3 gap-3 text-center space-x-3">
                      <button
                        onClick={() => setViewingPost(post)}
                        className="px-3 py-1 bg-blue-600! text-white text-sm! rounded hover:bg-blue-700! focus:outline-none! border-none!"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleApprove(post.id)}
                        disabled={isApproving || isRejecting}
                        className="px-3 py-1 bg-green-600! text-white text-sm! rounded hover:bg-green-700! disabled:opacity-50 focus:outline-none! border-none!"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(post.id)}
                        disabled={isApproving || isRejecting}
                        className="px-3 py-1 bg-red-600! text-white text-sm! rounded hover:bg-red-700! disabled:opacity-50 focus:outline-none! border-none!"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {pendingPosts.length === 0 && (
              <p className="text-center text-gray-500 py-8">No pending posts to review.</p>
            )}
          </div>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 text-right">
            Showing {pendingPosts.length} pending {pendingPosts.length === 1 ? "post" : "posts"}.
          </p>
        </>
      )}

      {/* Post Preview Modal */}
      {viewingPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600/60 bg-opacity-1000 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Post Preview</h2>
                <button
                  onClick={() => setViewingPost(null)}
                  className="text-gray-400! hover:text-gray-600! text-2xl bg-gray-200! hover:bg-gray-400! focus:outline-none! border-none!"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Author</p>
                  <p className="text-lg font-semibold text-gray-900">{viewingPost.author}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-lg text-gray-900">{viewingPost.date}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Caption</p>
                  <p className="text-gray-800 whitespace-pre-wrap bg-gray-50 p-4 rounded">
                    {viewingPost.caption.split('\n')[2]}
                  </p>
                </div>

                {viewingPost.mediaUrls.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Media ({viewingPost.mediaUrls.length})</p>
                    <div className="grid grid-cols-2 gap-2">
                      {viewingPost.mediaUrls.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Post image ${index + 1}`}
                          className="w-full h-48 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/400x300/cccccc/333333?text=Image+Not+Available";
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex mt-6 pt-6 justify-end border-t">
                {/* <button
                  onClick={() => handleApprove(viewingPost.id)}
                  disabled={isApproving || isRejecting}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(viewingPost.id)}
                  disabled={isApproving || isRejecting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  Reject
                </button> */}
                <button
                  onClick={() => setViewingPost(null)}
                  className="px-4 py-2 bg-gray-200! text-sm! text-gray-700 rounded hover:bg-gray-300! focus:outline-none! border-none!"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentModeration;
