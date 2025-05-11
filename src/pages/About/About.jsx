function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        About Us
      </h1>

      <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
        <p>
          Welcome to{" "}
          <span className="text-primary font-semibold">Our Blog</span> — a cozy
          corner on the internet where ideas, inspiration, and creativity meet!
        </p>

        <p>
          Our mission is simple:{" "}
          <span className="font-medium text-gray-800">
            to share knowledge, stories, and experiences
          </span>{" "}
          that spark curiosity and ignite passions. Whether you're here for tech
          tutorials, lifestyle tips, personal growth hacks, or just a good story
          — you're in the right place!
        </p>

        <p>
          Built with love 🧡 using{" "}
          <span className="text-primary font-semibold">React</span>, styled
          beautifully with{" "}
          <span className="text-primary font-semibold">TailwindCSS</span> and{" "}
          <span className="text-primary font-semibold">DaisyUI</span>, our
          platform is designed to be fast, friendly, and easy to navigate.
        </p>

        <p>
          Thank you for being a part of our journey. We believe that every idea
          matters, every voice counts, and together, we can make the internet a
          little brighter. 🌟
        </p>

        <div className="text-center mt-10">
          <p className="font-semibold">Want to join the community?</p>
          <button className="btn btn-primary mt-4">Contact Us</button>
        </div>
      </div>
    </div>
  );
}

export default About;
