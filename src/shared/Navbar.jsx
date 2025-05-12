import React, { useEffect, useState } from "react";
import logo from "../assets/gub.png";
import { NavLink, useNavigate } from "react-router-dom";

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
    <nav className="bg-gray-100 shadow-md sticky top-0 z-50">
      <div className="w-[95%] mx-auto flex items-center justify-between py-2">
        <NavLink
          to="/"
          className="flex items-center space-x-2 text-gray-800 transition"
        >
          <img className="h-10 w-10" src={logo} alt="logo" />
          <h2 className="text-3xl font-extrabold tracking-tight font-mono">
            Ink<span className="text-blue-500">spire</span>
          </h2>
        </NavLink>

        <div className="flex items-center space-x-6">
          {[
            { to: "/", label: "Home" },
            { to: "/blogs", label: "Blogs" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold underline underline-offset-4"
                  : "hover:text-blue-500 transition"
              }
            >
              {label}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold underline underline-offset-4"
                    : "hover:text-blue-500 transition"
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-4 py-[5px] text-sm bg-red-500 text-white hover:bg-red-600 transition"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-[5px] text-sm bg-blue-600 text-white"
                  : "px-4 py-[5px] text-sm bg-blue-500 text-white hover:bg-blue-600 transition"
              }
            >
              LOGIN
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
