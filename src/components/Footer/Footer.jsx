import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white absolute left-0 right-0 z-50 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center md:text-left">
          
          {/* About Section */}
          <div className="mb-2 md:mb-0">
            <h3 className="text-md font-semibold text-green-400">Pepo Abanob</h3>
            <p className="text-gray-300 text-xs mt-1">
              Full Stack Developer passionate about creating web solutions
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-2 md:mb-0">
            <h4 className="text-md font-medium mb-1">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link to="#" className="text-2 hover:text-green-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#" className="text-xs hover:text-green-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="#" className="text-xs hover:text-green-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-sm font-medium mb-1">Social Media</h4>
            <div className="flex justify-center md:justify-start">
              <Link
                to="https://www.linkedin.com/in/pepo-abanob-472189255/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
              >
                <FaLinkedin className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-3 pt-3 text-center border-t border-gray-700">
          <p className="text-[0.6rem] text-gray-400">
            &copy; {new Date().getFullYear()} Pepo Abanob. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}