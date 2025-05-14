// components/UpdateBlog.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //   console.log(blog.blog.title);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch existing blog data
  useEffect(() => {
    axios
      .get(`https://gub-blog-server.vercel.app/blogs/${id}`)
      .then((res) => {
        reset(res.data.blog);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        toast.error("Failed to load blog data");
      });
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.put(`https://gub-blog-server.vercel.app/update/${id}`, data);
      toast.success("Blog updated successfully!");
      navigate("/blogs");
    } catch (err) {
      console.error("Error updating blog:", err);
      toast.error("Update failed. Please try again.");
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
            Update Blog
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

          {/* Image URL */}
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
        </div>

        {/* Short Description */}
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

        {/* Full Content */}
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

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold text-white ${
              loading ? "bg-gray-400" : "bg-blue-500"
            } rounded hover:bg-blue-600 transition duration-200`}
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBlog;
