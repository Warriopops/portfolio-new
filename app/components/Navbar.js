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
    { name: "Home", href: "/" },
    { name: "Projects", href: "/about" },
    { name: "Skills", href: "/projects" },
    { name: "Contact", href: "/contact" }
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
    <nav ref={navRef} className="bg-black shadow-md fixed w-full z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo + Links à gauche */}
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
              <Link
                key={i}
                href={link.href}
                className="text-white hover:text-blue-500 transition duration-300 hidden md:inline-block text-lg font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Boutons à droite : GitHub + LinkedIn + CV */}
          <div className="hidden md:flex items-center space-x-4">
            {/* GitHub */}
            <a
              href="https://github.com/Warriopops"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-500 transition duration-300 border-2 border-white"
            >
              <Github size={20} className="text-white" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/thomas-laiz%C3%A9-b82b4516a/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-500 transition duration-300 border-2 border-white"
            >
              <Linkedin size={20} className="text-white" />
            </a>

            {/* CV */}
            <a
              href="../CV.pdf"
              download
              className="inline-flex items-center px-5 py-2 border border-white text-white rounded hover:bg-blue-500 hover:border-blue-500 transition duration-300 text-lg font-medium"
            >
              <Download size={20} className="mr-2" /> CV
            </a>
          </div>

          {/* Mobile Hamburger */}
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
