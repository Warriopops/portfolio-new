import Banner from "../app/components/Banner";
import ScrollBar from "../app/components/ScrollBar";
import Projects from "../app/components/Projects";
import Skill from "../app/components/Skill";
import Footer from "../app/components/Footer";
import Contact from "../app/components/Contact";

export default function Home() {
  const myProjects = [
    {
      image: "/project1.png",
      title: "Motocross The Game",
      description: "Customized an HTML/CSS template, implemented advanced animations with GSAP, integrated Tailwind CSS, developed a WYSIWYG interface for the editorial team, ensured GDPR compliance, integrated captcha, and provided technical support via Discord.",
      categories: ["NextJS", "Tailwind","Gsap", "NodeJS", "MongoDB", "Xsolla", "API"],
      url: "https://www.motocrossthegame.com/"
    },
    {
      image: "/project2.png",
      title: "D&G",
      description: "Implemented advanced animations with GSAP, integrated Tailwind CSS, added captcha, integrated a CMS with Strapi, designed a MongoDB database, enabled multilingual support, and optimized SEO.",
      categories: ["NextJS", "Tailwind", "Gsap","Strapi", "MongoDB", "API"],
      url: "https://d-g.staging.kapsloc.com/"
    },
    {
      image: "project3.png",
      title: "Time To Play",
      description: "Designed and implemented a MongoDB database and developed a backend with Node.js. Created and structured REST APIs to ensure communication between the frontend and backend.",
      categories: ["NodeJS", "MongoDB" , "API"],
      url: "https://www.time-to-play.fr/"
    },
    {
      image: "project4.png",
      title: "Usipanel",
      description: "Writing technical tickets, breaking down and planning tasks, managing priorities and the backlog, maintaining a microservice, frontend development (React, Three.js), CSS integration with Tailwind, backend development (Node.js), and creating a back-office with user, role, and middleware management.",
      categories: ["React", "Tailwind", "ThreeJS", "NodeJS", "PostgreSQL", "API"],
      url: "https://mycover-up.fr/configurateur/"
    },
    {
      image: "project5.png",
      title: "France Surgery",
      description: "Developed a responsive frontend using Next.js and implemented advanced animations with GSAP. Integrated Tailwind CSS and set up multilingual support for the site.",
      categories: ["NextJS", "Tailwind", "Gsap"],
      url: "https://iris-prevention.fr/comment-ca-marche/"
    }
  ];

  return (
    <div className="">
      <Banner />
      <ScrollBar speed={250}></ScrollBar>
      <Projects projects={myProjects} />
      <Skill />
      <Contact />
      <Footer />
    </div>
  );
}
