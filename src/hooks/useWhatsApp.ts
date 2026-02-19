import { useCallback } from 'react';
import { APP_CONFIG, WHATSAPP_MESSAGES } from '@/lib/constants';
import { validateInput } from '@/lib/security';

type WhatsAppMessageType = keyof typeof WHATSAPP_MESSAGES;

interface UseWhatsAppReturn {
  sendMessage: (type?: WhatsAppMessageType, customMessage?: string) => void;
  generateWhatsAppUrl: (message: string) => string;
}

export const useWhatsApp = (): UseWhatsAppReturn => {
  const generateWhatsAppUrl = useCallback((message: string): string => {
    // Validate and sanitize the message
    if (!validateInput(message)) {
      console.warn('Invalid message detected, using default message');
      message = WHATSAPP_MESSAGES.DEFAULT;
    }

    const encodedMessage = encodeURIComponent(message);
    return `https://api.whatsapp.com/send/?phone=${APP_CONFIG.WHATSAPP_NUMBER}&text=${encodedMessage}&type=phone_number&app_absent=0`;
  }, []);

  const sendMessage = useCallback((
    type: WhatsAppMessageType = 'DEFAULT',
    customMessage?: string
  ) => {
    try {
      const message = customMessage || WHATSAPP_MESSAGES[type];
      const whatsappUrl = generateWhatsAppUrl(message);

      // Log analytics event
      if (typeof window !== 'undefined' && 'gtag' in window) {
        window.gtag('event', 'whatsapp_click', {
          event_category: 'contact',
          event_label: type,
          value: 1
        });
      }

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    }
  }, [generateWhatsAppUrl]);

  return { sendMessage, generateWhatsAppUrl };
};