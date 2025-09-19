'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../components/Card";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectGrid({ projects = [] }) {
  const gridRef = useRef([]);
  const guideRef = useRef(null);

  useEffect(() => {
    gsap.from(gridRef.current, {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out"
    });

    if (guideRef.current) {
      const texts = guideRef.current.querySelectorAll("span.text-letter");
      gsap.set(texts, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: guideRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(texts, {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "power3.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(texts, {
            opacity: 0,
            y: 20,
            stagger: 0.03,
            duration: 0.3,
            ease: "power3.in"
          });
        }
      });
    }
  }, [projects]);

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="text-letter inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section className="py-16 bg-gradient-to-r from-black via-gray-900 to-black text-white" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={guideRef} className="flex justify-center items-center gap-6 mb-12 text-lg font-medium mx-2">
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full mx-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></span>
            {splitText("Front-end")}
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full mx-2 bg-gradient-to-r from-green-400 to-blue-500"></span>
            {splitText("Back-end")}
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full mx-2 bg-gradient-to-r from-yellow-400 to-orange-400"></span>
            {splitText("DB")}
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full mx-2 bg-gradient-to-r from-gray-400 to-gray-600"></span>
            {splitText("Others")}
          </div>
        </div>


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
