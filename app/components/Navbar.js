'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Download, Github, Linkedin } from "lucide-react";
import { gsap } from "gsap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const linksRef = useRef([]);
  const navRef = useRef();

  const links = [
    { name: "Home", id: "home" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" }
  ];

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        linksRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  return (
    <nav ref={navRef} className="border-b border-gray-700 bg-black shadow-md fixed w-full z-50 font-sans bg-gradient-to-r from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/icon.png"
                alt="Logo"
                width={80}
                height={80}
                className="mr-2"
              />
            </Link>
            {links.map((link, i) => (
   <span
    key={i}
    onClick={() => {
      const section = document.getElementById(link.id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); 
    }}
    className="
      relative
      text-white
      hover:text-transparent
      hover:bg-clip-text
      hover:bg-gradient-to-r
      hover:from-green-400
      hover:to-blue-500
      hover:scale-105
      transition-transform
      cursor-pointer
      hidden md:inline-block
      text-lg font-medium

      after:content-['']
      after:absolute
      after:left-0
      after:-bottom-1
      after:h-0.5
      after:w-0
      after:bg-gradient-to-r
      after:from-green-400
      after:to-blue-500
      after:rounded-full
      after:transition-all
      after:duration-300
      hover:after:w-full
    "
  >
    {link.name}
  </span>


            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/Warriopops"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-transform cursor-pointer border-2 border-white"
            >
              <Github size={20} className="text-white" />
            </a>

            <a
              href="https://www.linkedin.com/in/thomas-laiz%C3%A9-b82b4516a/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-transform cursor-pointer border-2 border-white"
            >
              <Linkedin size={20} className="text-white" />
            </a>

            <a
              href="../CV.pdf"
              download
              className="inline-flex items-center px-5 py-2 border border-white text-white rounded hover:bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-transform cursor-pointer text-lg font-medium"
            >
              <Download size={20} className="mr-2" /> CV
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-black shadow-md flex flex-col px-4 py-4"
        >
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              ref={(el) => (linksRef.current[i] = el)}
              className="block px-4 py-3 text-white hover:text-blue-500 transition text-lg font-medium rounded"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile GitHub + LinkedIn + CV */}
          <div className="flex space-x-4 mt-2">
            <a
              href="https://github.com/tonPseudo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-500 transition duration-300"
            >
              <Github size={20} className="text-white" />
            </a>
            <a
              href="https://linkedin.com/in/tonProfil"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-500 transition duration-300 border-1 border-white"
            >
              <Linkedin size={20} className="text-white" />
            </a>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center px-5 py-2 border border-white text-white rounded hover:bg-blue-500 hover:border-blue-500 transition duration-300 text-lg font-medium border-1 border-white"
            >
              <Download size={20} className="mr-2" /> CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
