"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { TExperienceType } from "../data/experiences";
import { SKILL_TYPE, TSkill } from "../data/skills";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({
  img_path,
  title,
  description,
  categories = [],
  url = "#", // URL de destination
}: TExperienceType) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;

    gsap.fromTo(
      el,
      { opacity: 0.1, y: 100, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
          scrub: 0.3,
          markers: false,
        },
      }
    );
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.08,
      transformPerspective: 500,
      ease: "power3.out",
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: "power3.out",
      duration: 0.5,
    });
  };

  const getCategoryColor = (cat: TSkill) => {
    if (cat.type === SKILL_TYPE.FRONT)
      return "bg-gradient-to-r from-green-400 to-blue-500";
    if (cat.type === SKILL_TYPE.DB)
      return "bg-gradient-to-r from-yellow-400 to-orange-400";
    if (cat.type === SKILL_TYPE.BACK)
      return "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500";
    return "bg-gradient-to-r from-gray-400 to-gray-600";
  };

  return (
    <Link href={url} passHref legacyBehavior>
      <a target="_blank" rel="noopener noreferrer" className="block">
        <div
          ref={cardRef}
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseLeave={handleMouseLeave}
          className="bg-gray-900 text-white rounded-xl shadow-xl overflow-hidden w-full max-w-sm h-[34rem] flex flex-col cursor-pointer"
          style={{ perspective: 1000 }}
        >
          {/* Image */}
          <div className="w-full h-56 overflow-hidden flex-shrink-0">
            <Image
              src={img_path}
              alt={title}
              height={0}
              width={0}
              sizes="100%"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          {/* Contenu */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-300 mb-4 flex-grow">{description}</p>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <span
                  key={i}
                  className={`${getCategoryColor(
                    cat
                  )} text-white text-xs px-2 py-1 rounded-full`}
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
