import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { currentUser, logoutUser } from "../../redux/features/auth/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav
      className="bg-[#1E40AF] h-20  flex items-center"
      style={{ padding: "0 10px" }}
    >
      <div className="flex justify-between items-center w-full custom-link-style">
        {/* Left: Logo */}
        <Link to="/" className=" text-white text-2xl lg:text-4xl font-bold">
          CarNexa
        </Link>

        {/* Right: Nav Links & Buttons (Hidden on Small Screens) */}
        <div className="hidden lg:flex items-center gap-5">
          <Link to="/home" className="text-white hover:text-gray-200">
            Home
          </Link>
          {user ? (
            <Link
              to={`/${user.role}/dashboard`}
              className="text-white hover:text-gray-200"
            >
              Profile
            </Link>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-200">
              Profile
            </Link>
          )}

          <Link to="/cars" className="text-white hover:text-gray-200">
            Cars
          </Link>
          {user ? (
            <Link to="/about" className="text-white hover:text-gray-200">
              About
            </Link>
          ) : (
            <Link to="/about-us" className="text-white hover:text-gray-200">
              About
            </Link>
          )}

          {user ? (
            <Link to="/contact" className="text-white hover:text-gray-200">
              Contact
            </Link>
          ) : (
            <Link to="/contact-us" className="text-white hover:text-gray-200">
              Contact
            </Link>
          )}

          {user ? (
            <div>
              <Button
                onClick={handleLogout}
                style={{
                  margin: "auto 20px",
                  backgroundColor: "red",
                  color: "white",
                  border: "0",
                  fontWeight: "800",
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button type="primary">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger Button (Mobile & Tablet) */}
        <button
          className="lg:hidden text-white text-2xl"
          style={{ margin: "0 10px" }}
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      {/* Mobile Drawer (Smooth Open & Close) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`fixed right-0 top-0 w-64 h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>

          {/* Mobile Nav Links (Centered with Spacing) */}
          <nav className="flex flex-col mt-12 gap-2 text-center">
            <Link
              to="/"
              className="text-gray-700 text-lg font-medium hover:text-[#1E40AF]"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className="text-gray-700 text-lg font-medium hover:text-[#1E40AF]"
              onClick={() => setIsOpen(false)}
            >
              Cars
            </Link>
            <Link
              to="/about"
              className="text-gray-700 text-lg font-medium hover:text-[#1E40AF]"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to={"/contact"}
              className="text-gray-700 text-lg font-medium hover:text-[#1E40AF]"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Login & Signup Buttons */}
          <div className="mt-12 flex flex-col items-center gap-3 w-full">
            <Link
              to="/login"
              className="w-full px-5 py-2 border border-[#1E40AF] text-[#1E40AF] text-lg font-semibold rounded-lg text-center hover:bg-[#1E40AF] hover:text-white transition duration-300 shadow-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-full px-5 py-2 bg-[#1E40AF] text-white text-lg font-semibold rounded-lg text-center hover:opacity-90 transition duration-300 shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
