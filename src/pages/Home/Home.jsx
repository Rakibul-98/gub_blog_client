import { useEffect, useState } from "react";
import BlogCard from "../Blogs/BlogCard";
import axios from "axios";
import Skeleton from "../Blogs/Skeleton";
import img1 from "../../assets/image/banner.jpg";
import img2 from "../../assets/image/banner (1).jpg";
import img4 from "../../assets/image/banner (3).jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

function Home() {
  const [featureBlogs, setFeatureBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://gub-blog-server.vercel.app/blogs"
        );
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
    while (randomBlogs.length < n && blogs.length > 0) {
      const randomIndex = Math.floor(Math.random() * blogs.length);
      const selected = blogs[randomIndex];
      if (!randomBlogs.includes(selected)) {
        randomBlogs.push(selected);
      }
    }
    return randomBlogs;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative">
        <Carousel
          showArrows={true}
          autoPlay
          infiniteLoop
          showThumbs={false}
          interval={5000}
          transitionTime={800}
          showStatus={false}
          renderIndicator={() => null}
        >
          {[img1, img2, img4].map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="md:h-[60vh] object-cover w-full"
              />
            </div>
          ))}
        </Carousel>

        <div className="absolute inset-0 flex items-center justify-end px-6 lg:px-20">
          <div className="text-white text-right max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Insightful Stories
            </h2>
            <p className="mb-6 text-sm md:text-base">
              Dive into a world of ideas, experiences, and creativity through
              our curated blog posts.
            </p>
            <Link
              to="/blogs"
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <section className="py-10">
        <div className=" mx-auto px-4">
          <div className="w-fit mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-5 text-center border-b-4 border-blue-500">
              Featured Blogs
            </h2>
          </div>
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

      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="w-fit mx-auto mb-5">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center border-b-4 border-blue-500">
              What Our Readers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah A.",
                quote:
                  "This blog changed how I view the world. The articles are insightful and beautifully written.",
              },
              {
                name: "David R.",
                quote:
                  "A great place to discover new ideas and read diverse voices. Highly recommended!",
              },
              {
                name: "Mina T.",
                quote:
                  "I love how curated everything feels. It’s like having a personal library of thought-provoking pieces.",
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded shadow-md">
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <p className="text-gray-900 font-semibold text-right">
                  – {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="w-fit mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center border-b-4 border-blue-500">
                Explore Categories
              </h2>
            </div>
            <p className="text-gray-600">
              Find stories that speak to your interests
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2">
            {["Technology", "Lifestyle", "Health", "Travel"].map(
              (category, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 p-6 text-center rounded shadow hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg">{category}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              About Our Blog
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe every story has the power to inspire. Our platform
              brings together passionate writers and curious minds to share
              ideas, experiences, and perspectives that matter.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 bg-blue-500 text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop!</h2>
          <p className="mb-6">
            Get the latest blog posts delivered straight to your inbox. No spam,
            only inspiration.
          </p>
          <form className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded bg-white text-black w-full sm:w-auto outline-none focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <footer className="bg-blue-500 text-white text-center py-6 mt-auto border-t">
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
