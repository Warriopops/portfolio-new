'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Banner() {
  const containerRef = useRef();
  const titleRef = useRef();
  const dynamicTextRef = useRef();
  const buttonRef = useRef();
  const logoRef = useRef();
  const textContainerRef = useRef();

  const texts = [
    "Fullstack Developer",
    "Creative Problem Solver",
    "Passionate About Tech",
    "Building Modern Web Apps"
  ];

  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      paused: true
    });

    tl.from(titleRef.current, { y: 50, opacity: 0, duration: 0.8 })
      .from(dynamicTextRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(buttonRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(logoRef.current, { x: 100, opacity: 0, duration: 0.8 }, "-=0.8");

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => tl.play(),
      onLeave: () => tl.reverse(),
      onEnterBack: () => tl.play(),
      onLeaveBack: () => tl.reverse(),
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Effet de "cassure" du texte au scroll
  useEffect(() => {
    // Créer des spans pour chaque lettre du titre
    const titleElement = titleRef.current;
    if (titleElement && !titleElement.classList.contains('split')) {
      const text = titleElement.innerText;
      titleElement.innerHTML = '';
      titleElement.classList.add('split');
      
      // Créer un span pour chaque caractère
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'char';
        span.style.display = 'inline-block';
        titleElement.appendChild(span);
      });
    }

    // Animation de cassure au scroll
    const chars = titleRef.current?.querySelectorAll('.char');
    if (chars) {
      chars.forEach((char, i) => {
        gsap.to(char, {
          y: () => Math.random() * 200 - 100, // Déplacement aléatoire vertical
          x: () => Math.random() * 100 - 50,  // Déplacement aléatoire horizontal
          rotation: () => Math.random() * 360 - 180, // Rotation aléatoire
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }

    // Animation du conteneur de texte qui se réduit
    gsap.to(textContainerRef.current, {
      scale: 0.8,
      opacity: 0.7,
      y: 50,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

  }, []);

  // Texte dynamique
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(dynamicTextRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setCurrentText(prev => (prev + 1) % texts.length);
          gsap.to(dynamicTextRef.current, { opacity: 1, duration: 0.5 });
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ⚡ Animation du logo qui tourne au scroll (CORRIGÉE)
  useEffect(() => {
    const logo = logoRef.current;

    gsap.to(logo, {
      rotationY: 360 * 2,       // rotation sur l'axe Y (3D)
      transformPerspective: 600, // perspective pour le 3D
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,            // suit le scroll
      }
    });
  }, []);

  // Effet WOW 3D + flip au survol et clic
  useEffect(() => {
    const logo = logoRef.current;
    const rotationRef = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const rect = logo.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;

      gsap.to(logo, {
        rotationY: rotationRef.y + offsetX / 10,
        rotationX: rotationRef.x - offsetY / 10,
        transformPerspective: 600,
        transformStyle: "preserve-3d",
        ease: "power2.out",
        duration: 0.2
      });
    };

    const handleMouseLeave = () => {
      gsap.to(logo, {
        rotationY: rotationRef.y,
        rotationX: rotationRef.x,
        ease: "power2.out",
        duration: 0.4
      });
    };

    const handleClick = () => {
      rotationRef.y += 360;
      gsap.to(logo, {
        rotationY: rotationRef.y,
        ease: "power2.inOut",
        duration: 1.2
      });
    };

    logo.addEventListener("mousemove", handleMouseMove);
    logo.addEventListener("mouseleave", handleMouseLeave);
    logo.addEventListener("click", handleClick);

    return () => {
      logo.removeEventListener("mousemove", handleMouseMove);
      logo.removeEventListener("mouseleave", handleMouseLeave);
      logo.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white h-screen flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center px-8 md:px-0">
        <div ref={textContainerRef} className="flex flex-col items-start md:w-1/2 mb-8 md:mb-0">
          <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I'm Thomas Laizé
          </h1>
          <p
            ref={dynamicTextRef}
            className="text-xl md:text-2xl text-gray-300 mb-8 h-8"
          >
            {texts[currentText]}
          </p>
          <div ref={buttonRef}>
            <Link
              href="/projects"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 inline-block"
            >
              See my projects
            </Link>
          </div>
        </div>

        {/* Logo interactif */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Image
            ref={logoRef}
            src="/assets/icon.png"
            alt="Logo"
            width={200}
            height={200}
            className="object-contain cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}