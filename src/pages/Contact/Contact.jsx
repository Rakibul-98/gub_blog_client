import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import contactImg from "../../assets/svg/contact (2).svg"; // Adjust the path as necessary

function Contact() {
  // Set up form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data); // Just log the data to console
    toast.success("Thank you for reaching out! We will get back to you soon.");
  };

  return (
    <div className="grid lg:grid-cols-2 w-[90%] mx-auto px-6">
      <div className="hidden lg:block">
        <img src={contactImg} alt="" />
      </div>
      <div className="w-[90%] mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Message</span>
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              placeholder="Enter your message"
              className="textarea textarea-bordered w-full"
              rows="4"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-full md:w-1/2">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
