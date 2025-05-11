import React, { useEffect, useState } from "react";
import logo from "../assets/gub.png";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="w-[95%] mx-auto flex items-center justify-between py-2">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          <img className="h-10 w-10" src={logo} alt="logo" />
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/" className=" hover:text-blue-500 transition">
            Home
          </Link>
          <Link to="/about" className=" hover:text-blue-500 transition">
            About
          </Link>
          <Link to="/blogs" className=" hover:text-blue-500 transition">
            Blog
          </Link>
          <Link to="/contact" className=" hover:text-blue-500 transition">
            Contact
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-[5px] text-sm bg-red-500 text-white hover:bg-red-600 transition"
            >
              LOGOUT
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-[5px] text-sm bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
