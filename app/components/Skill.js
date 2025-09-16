'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const skillsData = {
  'Front-End': ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind', 'GSAP', 'Framer Motion', 'Three.js', 'Vue.js'],
  'Back-End': ['Node.js', 'Ruby', 'Strapi', 'PostgreSQL', 'MongoDB', 'AWS'],
  Tools: ['Figma', 'TypeScript', 'Tampermonkey', 'Linux', 'Windows', 'Shell', 'Docker', 'Git', 'Discord'],
};

const SkillsElegant = () => {
  const skillsRef = useRef({});

  useEffect(() => {
    Object.values(skillsRef.current).forEach((arr) => {
      gsap.fromTo(
        arr,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out' }
      );
    });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black text-white flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category} className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-6">{category}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  ref={(el) => {
                    if (!skillsRef.current[category]) skillsRef.current[category] = [];
                    skillsRef.current[category].push(el);
                  }}
                  className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium hover:bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-transform cursor-pointer"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsElegant;
