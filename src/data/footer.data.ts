import { Github, Linkedin, Instagram, Mail, LucideIcon } from 'lucide-react';

export interface SocialLink {
    icon: LucideIcon;
    href: string;
    label: string;
}

export interface QuickLink {
    name: string;
    href: string;
}

export interface FooterData {
    brand: {
        name: string;
        role: string;
        description: string;
        logo: string;
    };
    socialLinks: SocialLink[];
    quickLinksTitle: string;
    quickLinks: QuickLink[];
    contact: {
        title: string;
        email: string;
        phone: string;
        location: string;
        badge: string;
    };
    copyright: string;
}

export const footerData: FooterData = {
    brand: {
        name: "Premium Portfolio",
        role: "Desenvolvedor Web",
        description: "Transformando ideias em experiências digitais extraordinárias. Sites modernos, funcionais e que impulsionam seu negócio para o próximo nível.",
        logo: "/images/logo.png"
    },
    socialLinks: [
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Mail, href: "mailto:contato@exemplo.com", label: "Email" },
    ],
    quickLinksTitle: "Links Rápidos",
    quickLinks: [
        { name: "Início", href: "#home" },
        { name: "Sobre", href: "#about" },
        { name: "Projetos", href: "#projects" },
        { name: "Contato", href: "#contact" },
    ],
    contact: {
        title: "Contato",
        email: "contato@exemplo.com",
        phone: "+55 (XX) 9XXXX-XXXX",
        location: "Brasil",
        badge: "Disponível para novos projetos"
    },
    copyright: "© 2024 Innova – Todos os direitos reservados."
};
