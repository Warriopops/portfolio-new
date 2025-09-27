// Un skill dois avoir un nom (ex: Node.JS) et un type
export type TSkill = {
  name: String;
  // Le type d'un skill qui dois etre EXACTEMENT un des SKILL_TYPE, ne fonctionne que si SKILL_TYPE est en as const
  type: keyof typeof SKILL_TYPE;
};

// Dictionnaire de tous les types de skill possible, c'est mieux quand la lé et la valeur sont les mêmes
export const SKILL_TYPE = {
  FRONT: "FRONT",
  BACK: "BACK",
  DB: "DB",
  TOOL: "TOOL",
  OTHER: "OTHER",
  // As const indique que les types sont EXACT, sans le as const FRONT serait un string, là FRONT ne peux etre que "FRONT".
} as const;

export const SKILL = {
  // FRONT
  HTML: { name: "Html", type: SKILL_TYPE.FRONT },
  CSS: { name: "CSS", type: SKILL_TYPE.FRONT },
  JS: { name: "JavaScript", type: SKILL_TYPE.FRONT },
  REACT: { name: "React", type: SKILL_TYPE.FRONT },
  NEXT: { name: "Next.js", type: SKILL_TYPE.FRONT },
  TAILWIND: { name: "Tailwind", type: SKILL_TYPE.FRONT },
  GSAP: { name: "GSAP", type: SKILL_TYPE.FRONT },
  FRAMER_MOTION: { name: "Framer Motion", type: SKILL_TYPE.FRONT },
  THREEJS: { name: "Three.js", type: SKILL_TYPE.FRONT },
  VUE: { name: "Vue.js", type: SKILL_TYPE.FRONT },

  // BACK
  NODEJS: { name: "Node.js", type: SKILL_TYPE.BACK },
  RUBY: { name: "Ruby", type: SKILL_TYPE.BACK },
  STRAPI: { name: "Strapi", type: SKILL_TYPE.BACK },
  AWS: { name: "AWS", type: SKILL_TYPE.BACK },

  // DB
  POSTGRES: { name: "PostgreSQL", type: SKILL_TYPE.DB },
  MONGODB: { name: "MongoDB", type: SKILL_TYPE.DB },

  // TOOLS

  // OTHER
  FIGMA: { name: "Figma", type: SKILL_TYPE.TOOL },
  TAMPER_MONKEY: { name: "Tampermonkey", type: SKILL_TYPE.TOOL },
  TS: { name: "TypeScript", type: SKILL_TYPE.TOOL },
  LINUX: { name: "Linux", type: SKILL_TYPE.TOOL },
  WINDOWS: { name: "Windows", type: SKILL_TYPE.TOOL },
  SHELL: { name: "Shell", type: SKILL_TYPE.TOOL },
  DOCKER: { name: "Docker", type: SKILL_TYPE.TOOL },
  GIT: { name: "Git", type: SKILL_TYPE.TOOL },
  DISCORD: { name: "Discord", type: SKILL_TYPE.TOOL },

  XSOLLA: { name: "XSolla", type: SKILL_TYPE.OTHER },
  API: { name: "API", type: SKILL_TYPE.OTHER },

  // As const aussi pour ne pas avoir les type convertit en string
  // Satisfies est comme un export const skill: Record<string, TSKILL>, mais il ne fait que vérifier le type sans le convertir
} as const satisfies Record<string, TSkill>;
