'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillsData = {
  'Front-End': ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind', 'GSAP', 'Framer Motion', 'Three.js', 'Vue.js'],
  'Back-End': ['Node.js', 'Ruby', 'Strapi', 'PostgreSQL', 'MongoDB', 'AWS'],
  Tools: ['Figma', 'TypeScript', 'Tampermonkey', 'Linux', 'Windows', 'Shell', 'Docker', 'Git', 'Discord'],
};

const categoryTextGradients = {
  'Front-End': 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
  'Back-End': 'bg-gradient-to-r from-green-400 to-blue-500',
  Tools: 'bg-gradient-to-r from-yellow-400 to-orange-400',
};

const categoryHoverColors = {
  'Front-End': 'hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500',
  'Back-End': 'hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500',
  Tools: 'hover:bg-gradient-to-r from-yellow-400 to-orange-400  ',
};

const SkillsElegant = () => {
  const skillsRef = useRef({});
  const categoryRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    // Animation du titre "Skills"
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: -50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true,
          },
        }
      );
    }

    // Animation des catégories
    categoryRef.current.forEach((catEl, i) => {
      gsap.fromTo(
        catEl,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.5)',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: catEl,
            start: 'top 90%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );
    });

    // Animation des skills
    Object.entries(skillsRef.current).forEach(([category, elements]) => {
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.5)',
            delay: i * 0.05,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      });
    });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black text-white flex flex-col items-center" id="skills">
      <h2 ref={titleRef} className="text-4xl font-bold mb-12 text-center">
        Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl">
        {Object.entries(skillsData).map(([category, skills], idx) => (
          <div key={category} className="flex flex-col items-center">
            <h3
              ref={(el) => categoryRef.current.push(el)}
              className={`text-2xl font-semibold mb-6 bg-clip-text text-transparent ${categoryTextGradients[category]}`}
            >
              {category}
            </h3>

            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  ref={(el) => {
                    if (!skillsRef.current[category]) skillsRef.current[category] = [];
                    skillsRef.current[category].push(el);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium bg-gray-800 transition-transform cursor-pointer ${categoryHoverColors[category]} hover:scale-105`}
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
