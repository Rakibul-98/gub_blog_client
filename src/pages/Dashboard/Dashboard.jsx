import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://gub-blog-server.vercel.app/blogs/user/${userEmail}`
        );
        setBlogs(response.data.blogs || []);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [userEmail]);

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`https://gub-blog-server.vercel.app/blogs/${blogId}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Blog List */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-primary w-fit">
            My Blogs
          </h1>

          {loading ? (
            <p className="text-gray-600">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-gray-500">You haven't created any blogs yet.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white flex flex-col md:flex-row shadow-md rounded-lg overflow-hidden border border-gray-200"
                >
                  {/* Image */}
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Content */}
                  <div className="p-4 flex flex-col justify-between w-full">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {blog.title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-4">
                        Created on:{" "}
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/update-blog/${blog._id}`}
                        className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side Widgets */}
        <div className="w-full lg:w-1/3 space-y-3 mt-16">
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              📊 Blog Stats
            </h2>
            <p className="text-gray-600 text-sm">
              Total Blogs Created:{" "}
              <span className="font-medium">{blogs.length}</span>
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              ⚡ Quick Actions
            </h2>
            <Link
              to="/create-blog"
              className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
            >
              ➕ Create New Blog
            </Link>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              💡 Dashboard Tips
            </h2>
            <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
              <li>Click “Update” to edit your blog content.</li>
              <li>Use high-quality images for better engagement.</li>
              <li>Preview before publishing.</li>
              <li>Share your blog on social media!</li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 border-t">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              🌟 Inspiration
            </h2>
            <blockquote className="text-gray-500 italic text-sm">
              “Start writing, no matter what. The water does not flow until the
              faucet is turned on.”
              <br />
              <span className="block text-right text-xs text-gray-400 mt-1">
                — Louis L’Amour
              </span>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
