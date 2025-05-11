import { useEffect, useState } from "react";
import BlogCard from "../Blogs/BlogCard";
import axios from "axios";
import Skeleton from "../Blogs/Skeleton";

function Home() {
  const [featureBlogs, setFeatureBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blogs");
        const blogs = response.data.blogs;

        const randomBlogs = getRandomBlogs(blogs, 2);

        setFeatureBlogs(randomBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const getRandomBlogs = (blogs, n) => {
    const randomBlogs = [];
    while (randomBlogs.length < n) {
      const randomIndex = Math.floor(Math.random() * blogs.length);
      if (!randomBlogs.includes(blogs[randomIndex])) {
        randomBlogs.push(blogs[randomIndex]);
      }
    }
    return randomBlogs;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex flex-col items-center justify-center flex-1 bg-blue-50 text-center py-20 px-6 bg-[url('https://i.ibb.co.com/prKstLKw/hero-bg.jpg')] bg-no-repeat bg-cover bg-bottom">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-lg md:text-xl text-white mb-8">
          Sharing knowledge, ideas, and stories one post at a time.
        </p>
        <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
          Get Started
        </button>
      </section>

      <section className="py-10 bg-white">
        <div className="w-[90%] mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Featured Blogs
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {featureBlogs.length === 0 ? (
              <>
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              featureBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center py-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
