import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white fixed bottom-0 left-0 right-0 z-50 border-t border-gray-700">
        <Link to="https://www.linkedin.com/in/pepo-abanob-472189255/" target="_blank" >
        <h2 className="text-center font-bold text-white ">
        © 2025  Pepo Abanob, ❤️.
            </h2>
        </Link>
    </footer>
  );
}