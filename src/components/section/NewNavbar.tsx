"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyWebsite</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6">
        <li>
          <a href="#" className="hover:text-gray-200">
            Beranda
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-200">
            Tentang
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-200">
            Layanan
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-200">
            Kontak
          </a>
        </li>
      </ul>

      {/* Mobile Toggle Button */}
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 right-6 bg-blue-600 w-48 rounded-lg p-4 flex flex-col gap-4 transition-all md:hidden ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <a href="#" className="hover:text-gray-300">
          Beranda
        </a>
        <a href="#" className="hover:text-gray-300">
          Tentang
        </a>
        <a href="#" className="hover:text-gray-300">
          Layanan
        </a>
        <a href="#" className="hover:text-gray-300">
          Kontak
        </a>
      </div>
    </nav>
  );
}
