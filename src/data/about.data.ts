export interface AboutData {
    title: {
        prefix: string;
        highlight: string;
    };
    description: {
        mobile: string;
        desktop: {
            text: string;
            highlight: string;
        };
    };
    buttons: {
        portfolio: string;
        contact: string;
    };
    image: {
        src: string;
        alt: string;
    };
}

export const aboutData: AboutData = {
    title: {
        prefix: "VISÃO",
        highlight: "ALÉM DO CÓDIGO"
    },
    description: {
        mobile: "Desenvolvemos experiências digitais que marcam. Engenharia robusta, design inesquecível.",
        desktop: {
            text: "Transformamos ideias complexas em realidades digitais imersivas. Nossa missão é elevar o padrão da sua presença online, combinando engenharia robusta com um design inesquecível.",
            highlight: "realidades digitais imersivas"
        }
    },
    buttons: {
        portfolio: "Ver Portfolio",
        contact: "Entrar em Contato"
    },
    image: {
        src: "/images/placeholder-avatar.webp",
        alt: "Avatar placeholder"
    }
};
