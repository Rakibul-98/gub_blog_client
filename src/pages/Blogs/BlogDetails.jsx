import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(blog);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogRes = await axios.get(
          `https://gub-blog-server.vercel.app/blogs/${id}`
        );
        setBlog(blogRes.data.blog);

        const allRes = await axios.get(
          "https://gub-blog-server.vercel.app/blogs"
        );
        const allBlogs = allRes.data.blogs;

        const filtered = allBlogs
          .filter((b) => b._id !== id)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 2);

        setRecentBlogs(filtered);
      } catch (err) {
        console.error(err);
        setError("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex gap-8">
        <div className="flex-1 space-y-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
        <div className="w-72 space-y-4 animate-pulse hidden md:block">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;
  if (!blog) return <p>No blog found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1 bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{blog.title}</h1>
          <span className=" bg-primary px-3 py-1 flex items-center text-sm text-white rounded-full">
            {blog.category}
          </span>
        </div>

        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-4 bg-gray-100"
        />

        <p className="text-lg italic mb-4 text-primary">{blog.description}</p>

        <div className="text-gray-800 leading-relaxed mb-6 whitespace-pre-line">
          {blog.content}
        </div>

        <div className="text-sm text-gray-500 space-y-1">
          <p>
            <strong>Author:</strong>{" "}
            {blog.author?.name || blog.author || "Unknown"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {moment(blog.createdAt).format("MMMM D, YYYY")}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {moment(blog.updatedAt).format("MMMM D, YYYY")}
          </p>
        </div>
      </div>

      <div className="w-full md:w-72 space-y-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">About the Author</h2>
          <p className="text-gray-700 text-sm">
            {blog.author
              ? `${blog.author} is a passionate writer and regular contributor.`
              : "Unknown author."}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Recent Posts
          </h2>
          <div className="flex flex-col gap-4">
            {recentBlogs.length === 0 && <p>No recent posts found.</p>}
            {recentBlogs.map((item) => (
              <Link
                key={item._id}
                to={`/blogs/${item._id}`}
                className="space-y-2 rounded-lg transition group"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-28 object-cover rounded-md bg-gray-100"
                />
                <div className="">
                  <p className="text-sm font-medium text-gray-800 truncate group-hover:text-blue-500">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
