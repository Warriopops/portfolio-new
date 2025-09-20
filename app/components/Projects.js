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
  // Animation des cartes de projet
  gsap.from(gridRef.current, {
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out"
  });

  if (guideRef.current) {
    const texts = guideRef.current.querySelectorAll("span.text-letter");
    const circles = guideRef.current.querySelectorAll("span.rounded-full");

    // Initial state
    gsap.set(texts, { opacity: 0, y: 20 });
    gsap.set(circles, { opacity: 0, scale: 0.5 });

    ScrollTrigger.create({
      trigger: guideRef.current,
      start: "top 80%",
      onEnter: () => {
        // Animation des lettres
        gsap.to(texts, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "power3.out"
        });
        // Animation des ronds
        gsap.to(circles, {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)"
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
        gsap.to(circles, {
          opacity: 0,
          scale: 0.5,
          stagger: 0.05,
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
       <div
  ref={guideRef}
  className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mb-12 text-base md:text-lg font-medium mx-2"
>
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
              {...project}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
