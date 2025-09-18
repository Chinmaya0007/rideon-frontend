import React, { useState } from "react";
import {
  Car,
  Clock,
  User,
  HelpCircle,
  Menu,
  X,
  LogOut,
  LogIn,
  ListChecks,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ your auth context

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logoutUser } = useAuth();

  // ✅ Different links for drivers and users
  const userLinks = [
    { name: "Booking", icon: <Car size={20} />, path: "/booking" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
    { name: "History", icon: <Clock size={20} />, path: "/history" },
    { name: "Help", icon: <HelpCircle size={20} />, path: "/help" },
  ];

  const driverLinks = [
    { name: "Ride Requests", icon: <ListChecks size={20} />, path: "/requests" },
    { name: "History", icon: <Clock size={20} />, path: "/history" },
    { name: "Help", icon: <HelpCircle size={20} />, path: "/help" },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const links = user?.role === "driver" ? driverLinks : userLinks;

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between border-b border-b-[#223449] px-4 md:px-6 py-3 bg-[#101923] z-[9999] shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-3 text-white">
        <div className="w-5 h-5">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-white text-lg font-bold">RideOn</h2>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        {user ? (
          <>
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-[#0d78f2]"
                    : "text-white"
                } hover:text-[#0d78f2]`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#0d78f2] hover:bg-[#0b5ec1] px-4 py-2 rounded-lg text-sm font-medium text-white transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          // ✅ Show Login button if no user
          <Link
            to="/login"
            className="flex items-center gap-2 bg-[#0d78f2] hover:bg-[#0b5ec1] px-4 py-2 rounded-lg text-sm font-medium text-white transition"
          >
            <LogIn size={18} />
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button (only if logged in) */}
      {user && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Mobile Dropdown */}
      {user && (
        <div
          className={`fixed top-[60px] left-0 w-full bg-[#101923] border-t border-[#223449] flex flex-col items-start px-6 py-4 transition-all duration-300 md:hidden shadow-lg ${
            isOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
          style={{ zIndex: 9999 }}
        >
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 text-base font-medium py-3 w-full ${
                location.pathname === link.path
                  ? "text-[#0d78f2]"
                  : "text-white"
              } hover:text-[#0d78f2]`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {/* Logout Button Mobile */}
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 bg-[#0d78f2] hover:bg-[#0b5ec1] px-4 py-2 rounded-lg text-base font-medium text-white mt-4 w-full justify-center"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
