import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "./Skeleton";
import BlogCard from "./BlogCard";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blogs");
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const skeletonLoader = Array.from({ length: 8 }).map((_, i) => (
    <Skeleton key={i} />
  ));

  const displayBlogs = loading
    ? skeletonLoader
    : blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />);

  const finalBlogs = [
    ...displayBlogs,
    ...skeletonLoader.slice(displayBlogs.length, 8),
  ];

  return (
    <div className="w-[95%] mx-auto px-4 pt-5 pb-10">
      <div className="mb-5 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          All Blogs
        </h1>
        <Link to="/create-blog">
          <button className="btn btn-primary">Create New Blog</button>
        </Link>
      </div>

      <div className="grid gap-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {finalBlogs.slice(0, 2)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {finalBlogs.slice(2)}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
