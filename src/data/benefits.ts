import {
    DollarSign,
    Clock,
    Palette,
    TrendingUp,
    HeadphonesIcon,
    Lightbulb,
    LucideIcon
} from 'lucide-react';

export interface Benefit {
    icon: LucideIcon;
    title: string;
    description: string;
    gradient: string;
    textColor: string;
}

export const benefitsData: Benefit[] = [
    {
        icon: DollarSign,
        title: "ECONOMIZE DINHEIRO",
        description: "Um site eficaz pode impulsionar seus negócios, fornecendo uma presença online que faz a diferença.",
        gradient: "from-green-400 to-emerald-600",
        textColor: "text-emerald-400",
    },
    {
        icon: Clock,
        title: "ECONOMIZE TEMPO",
        description: "Chega de perder tempo procurando designers para produzir seu produto.",
        gradient: "from-blue-400 to-cyan-600",
        textColor: "text-cyan-400",
    },
    {
        icon: Palette,
        title: "PERSONALIZAÇÃO TOTAL",
        description: "Desenvolvemos sites que refletem completamente a identidade visual do seu negócio.",
        gradient: "from-purple-400 to-pink-600",
        textColor: "text-pink-400",
    },
    {
        icon: TrendingUp,
        title: "IMPACTO DIRETO NOS NEGÓCIOS",
        description: "Nossos sites são projetados estrategicamente para gerar novos contatos e clientes para o seu negócio.",
        gradient: "from-orange-400 to-red-600",
        textColor: "text-orange-400",
    },
    {
        icon: HeadphonesIcon,
        title: "SUPORTE",
        description: "Oferecemos suporte e manutenção contínua para garantir que seu site esteja funcionando.",
        gradient: "from-indigo-400 to-purple-600",
        textColor: "text-indigo-400",
    },
    {
        icon: Lightbulb,
        title: "ABRAÇAMOS SUAS IDEIAS",
        description: "Coloca suas ideias em prática e transforme em um Site.",
        gradient: "from-yellow-400 to-orange-600",
        textColor: "text-yellow-400",
    }
];
