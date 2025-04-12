import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-gray-900 h-60 flex flex-col justify-between text-white"
      style={{ marginTop: "100px" }}
    >
      <div
        className="w-full flex flex-col sm:px-6 lg:px-12"
        style={{ padding: "50px 50px" }}
      >
        {/* Footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="footer-logo">
            <h2 className="text-3xl font-bold">CarNexa</h2>
            <p className="text-sm sm:text-base text-gray-400">
              Your trusted car dealership
            </p>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-sm sm:text-base text-gray-400 hover:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-sm sm:text-base text-gray-400 hover:text-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-sm sm:text-base text-gray-400 hover:text-white"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-sm sm:text-base text-gray-400 hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="footer-social flex gap-5 space-x-4 mt-4 sm:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-gray-400 hover:text-white"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-gray-400 hover:text-white"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-gray-400 hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-gray-400 hover:text-white"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* Contact Information */}
          <div className="footer-contact text-sm sm:text-base">
            <p>
              Contact us: <strong>+123 456 7890</strong>
            </p>
            <p>
              Email: <strong>info@carnexa.com</strong>
            </p>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="footer-bottom bg-gray-800">
        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} CarNexa. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
