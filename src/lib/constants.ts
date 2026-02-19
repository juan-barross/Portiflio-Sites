export const APP_CONFIG = {
  name: 'Innova',
  logo: '/images/logo.png',
  whatsapp: {
    message: 'Olá! Gostaria de conversar sobre meu projeto de site. Pode me ajudar?',
  },
  WHATSAPP_NUMBER: '5521960169230',
  SITE_NAME: 'Innova',
  SITE_DESCRIPTION: 'Desenvolvimento Web Profissional e Design de Interface',
  SITE_URL: 'https://innova.com.br', // Placeholder
  SOCIAL_LINKS: {
    INSTAGRAM: 'https://instagram.com/innova',
    LINKEDIN: 'https://linkedin.com/in/innova',
    GITHUB: 'https://github.com/innova',
  },
} as const;

export const WHATSAPP_MESSAGES = {
  DEFAULT: APP_CONFIG.whatsapp.message,
  PROJECT: "Olá! Quero iniciar um projeto.",
  SUPPORT: "Preciso de suporte.",
} as const;

export const ROUTES = {
  HOME: '/',
  ABOUT: '#about',
  PORTFOLIO: '#portfolio',
  CONTACT: '#contact',
} as const;

export const VALIDATION_RULES = {
  NAME: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s]*$/
  },
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  MESSAGE: {
    minLength: 10,
    maxLength: 500
  }
} as const;