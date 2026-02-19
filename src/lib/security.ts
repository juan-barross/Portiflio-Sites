// Security utilities
import { VALIDATION_RULES } from './constants';

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHTML = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

/**
 * Validate input against XSS patterns
 */
export const validateInput = (input: string): boolean => {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi
  ];

  return !xssPatterns.some(pattern => pattern.test(input));
};

/**
 * Validate form data
 */
export const validateFormData = (data: {
  name?: string;
  email?: string;
  message?: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate name
  if (data.name) {
    if (data.name.length < VALIDATION_RULES.NAME.minLength) {
      errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    if (data.name.length > VALIDATION_RULES.NAME.maxLength) {
      errors.push('Nome deve ter no máximo 50 caracteres');
    }
    if (!VALIDATION_RULES.NAME.pattern.test(data.name)) {
      errors.push('Nome contém caracteres inválidos');
    }
    if (!validateInput(data.name)) {
      errors.push('Nome contém conteúdo suspeito');
    }
  }

  // Validate email
  if (data.email) {
    if (!VALIDATION_RULES.EMAIL.pattern.test(data.email)) {
      errors.push('Email inválido');
    }
    if (!validateInput(data.email)) {
      errors.push('Email contém conteúdo suspeito');
    }
  }

  // Validate message
  if (data.message) {
    if (data.message.length < VALIDATION_RULES.MESSAGE.minLength) {
      errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }
    if (data.message.length > VALIDATION_RULES.MESSAGE.maxLength) {
      errors.push('Mensagem deve ter no máximo 500 caracteres');
    }
    if (!validateInput(data.message)) {
      errors.push('Mensagem contém conteúdo suspeito');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generate secure random string
 */
export const generateSecureId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Rate limiting utility
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 15 * 60 * 1000 // 15 minutes
  ) { }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];

    // Remove old attempts outside the window
    const validAttempts = userAttempts.filter(
      attempt => now - attempt < this.windowMs
    );

    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }

    // Add current attempt
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);

    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}