'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollBar({
  text = "↓ My Projects",
  speed = 26,
  bgColor = "linear-gradient(to right, #000000, #111827, #000000)",
  borderColor = "#D3DAD9",
  fontSize = 30,
  color = "white",
  repeatCount = 50,
  spacing = 50
}) {
  const scrollRef = useRef(null);
  const tweenRef = useRef(null);
  const containerRef = useRef(null);
  const topBorderRef = useRef(null);
  const bottomBorderRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // continuous marquee
    const totalWidth = el.scrollWidth;
    tweenRef.current = gsap.fromTo(
      el,
      { x: 0 },
      { x: -totalWidth / 2, duration: speed, ease: "linear", repeat: -1 }
    );

    // état initial des fausses bordures
    gsap.set([topBorderRef.current, bottomBorderRef.current], {
      scaleX: 0,
      transformOrigin: "left center"
    });

    // fonctions réutilisables pour l'anim des bordures
    const expand = () =>
      gsap.to([topBorderRef.current, bottomBorderRef.current], {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 3,
        ease: "power2.out"
      });

    const retract = () =>
      gsap.to([topBorderRef.current, bottomBorderRef.current], {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power2.in"
      });

    // ScrollTrigger explicite
    triggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 90%",
      onEnter: () => expand(),
      onLeave: () => retract(),
      onEnterBack: () => expand(),
      onLeaveBack: () => retract(),
      // markers: true
    });

    return () => {
      tweenRef.current?.kill();
      triggerRef.current?.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [speed]);

  // --- handlers pour stopper / relancer le marquee ---
  const handlePause = () => {
    // approche douce : timeScale -> 0
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.18, ease: "power1.out" });
    }
  };

  const handleResume = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.18, ease: "power1.out" });
    }
  };

  // Si tu préfères un arrêt instantané, remplace la logique par:
  // const handlePause = () => tweenRef.current?.pause();
  // const handleResume = () => tweenRef.current?.play();

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden relative uppercase"
      style={{ background: bgColor }}
    >
      {/* fausses bordures */}
      <div
        ref={topBorderRef}
        className="absolute top-0 left-0 h-[1px] w-full"
        style={{ backgroundColor: borderColor }}
      />
      <div
        ref={bottomBorderRef}
        className="absolute bottom-0 left-0 h-[1px] w-full"
        style={{ backgroundColor: borderColor }}
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        ref={scrollRef}
        // onPointer* gère souris / stylet ; onTouch* pour certains mobiles ; onFocus/onBlur pour clavier
        onPointerEnter={handlePause}
        onPointerLeave={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
        onFocus={handlePause}
        onBlur={handleResume}
        tabIndex={0} // pour permettre le focus clavier
        className="inline-block whitespace-nowrap text-lg font-medium px-4 cursor-pointer"
        style={{ fontFamily: "Inter, sans-serif", fontSize, color }}
      >
        {Array.from({ length: repeatCount }).map((_, i) => (
          <span key={i} style={{ marginRight: spacing }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
