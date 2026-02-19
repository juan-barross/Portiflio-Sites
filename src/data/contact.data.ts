export interface ContactData {
    badge: string;
    title: {
        prefix: string;
        highlight: string;
    };
    subtitle: string;
    button: {
        alt: string;
        image: string;
    };
}

export const contactData: ContactData = {
    badge: "Pronto para começar?",
    title: {
        prefix: "Estamos esperando",
        highlight: "você!"
    },
    subtitle: "Clique no botão abaixo para conversarmos e encontrarmos a melhor solução para o seu negócio.",
    button: {
        alt: "Atendimento via WhatsApp",
        image: "/whatsapp-button.webp"
    }
};
