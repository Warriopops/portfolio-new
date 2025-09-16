'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ProjectCard from "../components/Card"; // ton composant card

export default function ProjectGrid({ projects = [] }) {
  const gridRef = useRef([]);

  useEffect(() => {
    gsap.from(gridRef.current, {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out"
    });
  }, [projects]);

  return (
    <section className="py-16 bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Guide des couleurs */}
        <div className="flex justify-center items-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
            <span>Front-end</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-green-500 rounded-full"></span>
            <span>Back-end</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
            <span>DB</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
            <span>Others</span>
          </div>
        </div>

        {/* Grille des projets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => (gridRef.current[i] = el)}
            >
              <ProjectCard
                image={project.image}
                title={project.title}
                description={project.description}
                categories={project.categories}
                url={project.url}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
