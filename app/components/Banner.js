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

    tl.from(titleRef.current, {  y: 50, opacity: 0, duration: 0.8 })
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

  useEffect(() => {
    const logo = logoRef.current;

    gsap.to(logo, {
      y: -20,
      duration: 1,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });
  }, []);


  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement && !titleElement.classList.contains('split')) {
      const text = titleElement.innerText;
      titleElement.innerHTML = '';
      titleElement.classList.add('split');

      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'char';
        span.style.display = 'inline-block ml-2';
        titleElement.appendChild(span);
      });
    }

    const chars = titleRef.current?.querySelectorAll('.char');
    if (chars) {
      chars.forEach((char, i) => {
        gsap.to(char, {
          y: () => Math.random() * 200 - 100,
          x: () => Math.random() * 100 - 50,
          rotation: () => Math.random() * 360 - 180,
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

  useEffect(() => {
    const logo = logoRef.current;

    gsap.to(logo, {
      rotationY: 360 * 2,
      transformPerspective: 600,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, []);


  useEffect(() => {
    const logo = logoRef.current;
    const rotationRef = { x: 0, y: 0 };





    const handleClick = () => {
      rotationRef.y += 360;
      gsap.to(logo, {
        rotationY: rotationRef.y,
        ease: "power2.inOut",
        duration: 1.2
      });
    };


    logo.addEventListener("click", handleClick);

    return () => {

      logo.removeEventListener("click", handleClick);
    };
  }, []);


  return (
   <section
  ref={containerRef}
  className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white h-screen flex items-center justify-center overflow-hidden"
  id="home"
>
  <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-center md:justify-between items-center px-8 md:px-0 text-center md:text-left">
    {/* Texte */}
    <div ref={textContainerRef} className="flex flex-col items-center md:items-start md:w-1/2 mb-8 md:mb-0">
<div className="px-4 md:px-0">
  <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-snug sm:leading-normal md:leading-tight">
    <span className="block md:inline">Hi, I&apos;m </span>
    <span className="block md:inline">Thomas Laizé</span>
  </h1>
</div>




      <p
        ref={dynamicTextRef}
        className="text-xl md:text-2xl text-gray-300 mb-8 h-8"
      >
        {texts[currentText]}
      </p>

      <div ref={buttonRef} className="flex flex-col md:flex-row gap-4 md:gap-8">
        <button
          onClick={() => {
            const section = document.getElementById("projects");
            if (section) section.scrollIntoView({ behavior: "smooth" });
          }}
          className="relative overflow-hidden text-white px-6 py-3 text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 inline-block group cursor-pointer"
          style={{
            borderWidth: '2px',
            borderStyle: 'solid',
            borderImageSlice: 1,
            borderImageSource: 'linear-gradient(to right, #22c55e, #3b82f6)',
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 transition-opacity duration-300 group-hover:opacity-0"></span>
          <span className="relative ">See my projects</span>
        </button>

        <button
          onClick={() => {
            const section = document.getElementById("contact");
            if (section) section.scrollIntoView({ behavior: "smooth" });
          }}
          className="relative overflow-hidden text-white px-6 py-3 text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 inline-block group cursor-pointer"
          style={{
            borderWidth: '2px',
            borderStyle: 'solid',
            borderImageSlice: 1,
            borderImageSource: 'linear-gradient(to right, #22c55e, #3b82f6)',
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></span>
          <span className="relative">Contact me</span>
        </button>
      </div>
    </div>

    {/* Logo */}
    <div className="md:w-1/2 flex justify-center md:justify-end">
      <Image
        ref={logoRef}
        src="/assets/icon.png"
        alt="Logo"
        width={250}
        height={250}
        className="mx-auto md:mx-0"
      />
    </div>
  </div>
</section>

  );
}