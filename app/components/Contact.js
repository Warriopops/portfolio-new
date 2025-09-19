'use client';

import { useState, useRef, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", object: "" });
  const [submitted, setSubmitted] = useState(false);

  // refs
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const successRef = useRef(null);
  const formFieldsRef = useRef([]);
  const buttonRef = useRef(null);
  const socialRef = useRef([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactData = {
      ...form,
      date: new Date().toISOString(),
    };
    console.log("Contact object:", contactData);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "", object: "" });
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Titre
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: -50, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 90%",
              end: "top 70%",
              scrub: true,
            },
          }
        );
      }

      // Sous-titre
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 90%",
              end: "top 70%",
              scrub: true,
            },
          }
        );
      }

      // Champs du formulaire
      formFieldsRef.current.forEach((field, i) => {
        gsap.fromTo(
          field,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.5)",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: field,
              start: "top 95%",
              end: "top 70%",
              scrub: true,
            },
          }
        );
      });

      // Bouton
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: buttonRef.current,
              start: "top 95%",
              end: "top 70%",
              scrub: true,
            },
          }
        );
      }

      // Icônes sociales
      socialRef.current.forEach((icon, i) => {
        gsap.fromTo(
          icon,
          { y: 30, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.5)",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: icon,
              start: "top 95%",
              end: "top 70%",
              scrub: true,
            },
          }
        );
      });

      // Message de succès (si affiché)
      if (successRef.current) {
        gsap.fromTo(
          successRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [submitted]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 px-6 md:px-12"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 ref={titleRef} className="text-4xl font-bold mb-6">
          Contact Me
        </h2>
        <p ref={subtitleRef} className="text-gray-400 mb-12">
          You can contact me via this form or directly through my social networks.
        </p>

        {submitted && (
          <div ref={successRef} className="bg-green-600 text-white p-4 rounded mb-6">
            Thank you! Your message has been sent.
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {["name", "object", "email", "message"].map((field, i) => (
            <div
              key={field}
              ref={(el) => (formFieldsRef.current[i] = el)}
              className="rounded-lg p-[2px] bg-gray-800 focus-within:bg-gradient-to-r focus-within:from-green-400 focus-within:to-blue-500 transition-all"
            >
              {field === "message" ? (
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  rows={5}
                  className="w-full py-3 px-3 rounded-lg bg-black border-none focus:outline-none"
                />
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                  className="w-full p-3 rounded-lg bg-black border-none focus:outline-none"
                />
              )}
            </div>
          ))}

          <button
            ref={buttonRef}
            type="submit"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-300 hover:to-blue-400 transition-transform cursor-pointer py-3 rounded font-medium text-black"
          >
            Send
          </button>
        </form>

        <div className="flex justify-center gap-6 mt-12">
          <a
            ref={(el) => (socialRef.current[0] = el)}
            href="https://github.com/Warriopops"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-transform cursor-pointer border-2 border-white"
          >
            <Github size={20} className="text-white" />
          </a>

          <a
            ref={(el) => (socialRef.current[1] = el)}
            href="https://www.linkedin.com/in/thomas-laiz%C3%A9-b82b4516a/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-transform cursor-pointer border-2 border-white"
          >
            <Linkedin size={20} className="text-white" />
          </a>
        </div>
      </div>
    </section>
  );
}
