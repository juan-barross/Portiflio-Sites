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

export const socialLinks: SocialLink[] = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Mail, href: "mailto:juan@exemplo.com", label: "Email" },
];

export const quickLinks: QuickLink[] = [
    { name: "Início", href: "#home" },
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Contato", href: "#contact" },
];
