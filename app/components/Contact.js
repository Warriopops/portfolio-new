'use client';

import { useState } from "react";
import { Github, Linkedin } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a contact object
    const contactData = {
      name: form.name,
      email: form.email,
      message: form.message,
      date: new Date().toISOString()
    };

    console.log("Contact object:", contactData);

    // You can send contactData to your API endpoint here
    // fetch('/api/contact', { method: 'POST', body: JSON.stringify(contactData) })

    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
        <p className="text-gray-400 mb-12">
          You can contact me via this form or directly through my social networks.
        </p>

        {submitted && (
          <div className="bg-green-600 text-white p-4 rounded mb-6">
            Thank you! Your message has been sent.
          </div>
        )}
<form onSubmit={handleSubmit} className="flex flex-col gap-4">
  {/* Name */}
  <div className="rounded-lg p-[2px] bg-gray-800 focus-within:bg-gradient-to-r focus-within:from-green-400 focus-within:to-blue-500 transition-all">
    <input
      type="text"
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Name"
      required
      className="w-full p-3 rounded-lg bg-black border-none focus:outline-none"
    />
  </div>

  {/* Object */}
  <div className="rounded-lg p-[2px] bg-gray-800 focus-within:bg-gradient-to-r focus-within:from-green-400 focus-within:to-blue-500 transition-all">
    <input
      type="text"
      name="object"
      value={form.object}
      onChange={handleChange}
      placeholder="Object"
      required
      className="w-full p-3 rounded-lg bg-black border-none focus:outline-none"
    />
  </div>

  {/* Email */}
  <div className="rounded-lg p-[2px] bg-gray-800 focus-within:bg-gradient-to-r focus-within:from-green-400 focus-within:to-blue-500 transition-all">
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="Email"
      required
      className="w-full p-3 rounded-lg bg-black border-none focus:outline-none"
    />
  </div>
  <div className="rounded-lg p-[2px] bg-gray-800 focus-within:bg-gradient-to-r focus-within:from-green-400 focus-within:to-blue-500 transition-all ">
<textarea
  name="message"
  value={form.message}
  onChange={handleChange}
  placeholder="Message"
  required
  rows={5}
  className="w-full py-3 px-3 rounded-lg bg-black border-none focus:outline-none "
/>

  </div>
  {/* Message */}


  <button
    type="submit"
    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-300 hover:to-blue-400 transition-transform cursor-pointer py-3 rounded font-medium text-black"
  >
    Send
  </button>
</form>




        <div className="flex justify-center gap-6 mt-12">
               <a
              href="https://github.com/Warriopops"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-transform cursor-pointer border-2 border-white"
            >
              <Github size={20} className="text-white" />
            </a>

            {/* LinkedIn */}
            <a
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
