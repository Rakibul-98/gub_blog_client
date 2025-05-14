import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "./Skeleton";
import BlogCard from "./BlogCard";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hasMore, setHasMore] = useState(true);

  const itemsPerLoad = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/blogs");
        setBlogs(res.data.blogs);
        setFilteredBlogs(res.data.blogs);
        setVisibleBlogs(res.data.blogs.slice(2, 2 + itemsPerLoad));
        setHasMore(res.data.blogs.length > 2 + itemsPerLoad);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const fetchMoreBlogs = () => {
    setTimeout(() => {
      const start = visibleBlogs.length + 2;
      const next = filteredBlogs.slice(start, start + itemsPerLoad);
      setVisibleBlogs((prev) => [...prev, ...next]);

      if (start + next.length >= filteredBlogs.length) {
        setHasMore(false);
      }
    }, 800);
  };

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    setLoading(true);

    setTimeout(() => {
      const newFiltered =
        selected === "All"
          ? blogs
          : blogs.filter((blog) => blog.category === selected);

      setFilteredBlogs(newFiltered);
      setVisibleBlogs(newFiltered.slice(2, 2 + itemsPerLoad));
      setHasMore(newFiltered.length > 2 + itemsPerLoad);
      setLoading(false);
    }, 300);
  };

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];
  const featured = loading ? [] : filteredBlogs.slice(0, 2);

  return (
    <div className="w-[95%] mx-auto px-4 pt-5 pb-10">
      <div className="mb-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl border-b-4 border-primary font-bold text-gray-800 whitespace-nowrap">
          All Blogs
        </h1>
        <div className="flex gap-5 items-center">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="select select-bordered"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <Link to="/create-blog">
            <button className="btn btn-primary whitespace-nowrap">
              Create New Blog
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} />)
          : featured.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
      </div>

      <InfiniteScroll
        dataLength={visibleBlogs.length}
        next={fetchMoreBlogs}
        hasMore={hasMore}
        loader={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        }
        endMessage={
          <p className="text-center text-gray-600 mt-10">
            🚩 You’ve reached the end of the blogs!
          </p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Blogs;
