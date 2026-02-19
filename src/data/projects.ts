export interface Project {
    title: string;
    category: string;
    url: string;
    imageDesktop: string;
    imageMobile: string;
    description: string;
    tech: string[];
}

export const projectsData: Project[] = [
    {
        title: "Dra. Carolina Mendes",
        category: "Psicologia",
        url: "https://carolinamendes.netlify.app",
        imageDesktop: "/projects/nutritionist-desktop.webp",
        imageMobile: "/projects/nutritionist-mobile-v2.webp",
        description: "Um ambiente online leve e acolhedor que reflete a essência do seu trabalho, facilitando a conexão e o agendamento dos pacientes.",
        tech: ["React", "TypeScript", "Tailwind CSS"]
    },
    {
        title: "Advocacia Especialista",
        category: "Jurídico",
        url: "https://advogadoespecialista.netlify.app",
        imageDesktop: "/projects/lawyer-desktop.webp",
        imageMobile: "/projects/lawyer-mobile.webp",
        description: "Design estratégico focado em autoridade e alta conversão, transformando a presença digital do escritório em uma máquina de captação de clientes.",
        tech: ["React", "TypeScript", "Tailwind CSS"]
    }
];
