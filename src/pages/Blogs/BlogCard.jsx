import React from "react";
import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog }) {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blogs/${blog._id}`);
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
      <figure>
        <img
          src={blog.imageUrl}
          alt="Blog"
          className="h-64 w-full object-cover bg-gray-100"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{blog.title}</h2>
        <p>{blog.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleReadMore}>
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
