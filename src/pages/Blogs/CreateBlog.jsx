import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const onSubmit = async (data) => {
    const blogData = {
      ...data,
      author: user.name,
      authorEmail: user.email,
    };
    try {
      setLoading(true);
      await axios.post(
        "https://gub-blog-server.vercel.app/create-blog",
        blogData
      );
      toast.success("Blog created successfully!");
      reset();
      navigate("/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-8 bg-base-100 rounded-lg shadow-md space-y-4"
      >
        <div className="w-fit mb-5">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center border-b-4 border-blue-500">
            Create New Blog
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-lg">Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter blog title"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-lg">
                Image URL
              </span>
            </label>
            <input
              type="text"
              placeholder="Paste image URL"
              {...register("imageUrl", { required: "Image URL is required" })}
              className="input input-bordered w-full"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold text-lg">Category</span>
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="select select-bordered w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Education">Education</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-lg">
              Short Description
            </span>
          </label>
          <textarea
            placeholder="Write a short description..."
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-lg">Content</span>
          </label>
          <textarea
            placeholder="Write the full blog content..."
            {...register("content", { required: "Content is required" })}
            className="textarea textarea-bordered w-full"
            rows="6"
          ></textarea>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold text-white ${
              loading ? "bg-gray-400" : "bg-blue-500"
            } rounded hover:bg-blue-600 transition duration-200`}
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
