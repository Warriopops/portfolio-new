import { SKILL, TSkill } from "./skills";

export type TExperienceType = {
  title: string;
  description: string;
  url: string;
  img_path: string;
  categories: Array<TSkill>;
};

export const EXPERIENCES = [
  {
    img_path: "/project1.png",
    title: "Motocross The Game",
    description:
      "Customized an HTML/CSS template, implemented advanced animations with GSAP, integrated Tailwind CSS, developed a WYSIWYG interface for the editorial team, ensured GDPR compliance, integrated captcha, and provided technical support via Discord.",
    categories: [
      SKILL.NEXT,
      SKILL.TAILWIND,
      SKILL.GSAP,
      SKILL.NODEJS,
      SKILL.MONGODB,
      SKILL.XSOLLA,
      SKILL.API,
    ],
    url: "https://www.motocrossthegame.com/",
  },
  {
    img_path: "/project2.png",
    title: "D&G",
    description:
      "Implemented advanced animations with GSAP, integrated Tailwind CSS, added captcha, integrated a CMS with Strapi, designed a MongoDB database, enabled multilingual support, and optimized SEO.",
    categories: [
      SKILL.NEXT,
      SKILL.TAILWIND,
      SKILL.GSAP,
      SKILL.STRAPI,
      SKILL.MONGODB,
      SKILL.API,
    ],
    url: "https://d-g.staging.kapsloc.com/",
  },
  {
    img_path: "/project3.png",
    title: "Time To Play",
    description:
      "Designed and implemented a MongoDB database and developed a backend with Node.js. Created and structured REST APIs to ensure communication between the frontend and backend.",
    categories: [SKILL.NODEJS, SKILL.MONGODB, SKILL.API],
    url: "https://www.time-to-play.fr/",
  },
  {
    img_path: "/project4.png",
    title: "Usipanel",
    description:
      "Writing technical tickets, breaking down and planning tasks, managing priorities and the backlog, maintaining a microservice, frontend development (React, Three.js), CSS integration with Tailwind, backend development (Node.js), and creating a back-office with user, role, and middleware management.",
    categories: [
      SKILL.REACT,
      SKILL.TAILWIND,
      SKILL.THREEJS,
      SKILL.NODEJS,
      SKILL.POSTGRES,
      SKILL.API,
    ],
    url: "https://mycover-up.fr/configurateur/",
  },
  {
    img_path: "/project5.png",
    title: "France Surgery",
    description:
      "Developed a responsive frontend using Next.js and implemented advanced animations with GSAP. Integrated Tailwind CSS and set up multilingual support for the site.",
    categories: [SKILL.NEXT, SKILL.TAILWIND, SKILL.GSAP],
    url: "https://iris-prevention.fr/comment-ca-marche/",
  },
] as const satisfies Array<TExperienceType>;
