'use client';

import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  const links = [
    { name: "Home", id: "home" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" }
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-4 border-t border-gray-700">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center">
        
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
        </div>

        <div className="mb-6 md:mb-0 flex flex-col md:flex-row gap-6">
          {links.map((link, i) => (
            <span
              key={i}
              onClick={() => scrollToSection(link.id)}
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

        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <Image
            src="/icon.png"
            alt="Logo"
            width={80}
            height={80}
            className="object-contain cursor-pointer"
            onClick={() => scrollToSection("home")}
          />
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-2">
        CopyRight &copy; {new Date().getFullYear()}. All Right Reserved - Thomas Laizé
      </div>
    </footer>
  );
}
