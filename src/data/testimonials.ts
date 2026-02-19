export interface Testimonial {
    image: string;
    name: string;
    profession: string;
    rating: number;
    testimonial: string;
}

export const testimonialsData: Testimonial[] = [
    {
        image: "/images/testimonials/avatar_new_6.webp",
        name: "Carlos Santos",
        profession: "Veterinário",
        rating: 5,
        testimonial: "Precisava de um site profissional para minha clínica veterinária e o resultado foi excepcional. O design transmite confiança e os clientes elogiam constantemente a facilidade de navegação e agendamento online."
    },
    {
        image: "/images/testimonials/avatar_new_2.webp",
        name: "Fernanda Lima",
        profession: "Nutricionista",
        rating: 5,
        testimonial: "O site criado para meu consultório de nutrição superou todas as expectativas. A integração com as redes sociais e o blog de receitas saudáveis aumentou significativamente minha cartela de pacientes."
    },
    {
        image: "/images/testimonials/avatar_new_1.webp",
        name: "Ricardo Oliveira",
        profession: "Dentista",
        rating: 5,
        testimonial: "Como dentista, precisava de um site que inspirasse confiança nos pacientes. O resultado foi um design elegante e funcional que aumentou em 40% os agendamentos através da plataforma online."
    },
    {
        image: "/images/testimonials/avatar_new_3.webp",
        name: "Marcelo Vieira",
        profession: "Advogado",
        rating: 5,
        testimonial: "Fiz meu site com a Innova e durante todo o atendimento tive fácil comunicação com ele, que também foi muito prestativo e atencioso. Quando precisei fazer alterações, foi muito diligente. Recomendo!"
    },
    {
        image: "/images/testimonials/avatar_new_5.webp",
        name: "Amanda Costa",
        profession: "Empreendedora",
        rating: 5,
        testimonial: "Lançamos nossa startup com o site desenvolvido pela equipe e foi fundamental para conquistar nossos primeiros investidores. A qualidade do design e a funcionalidade impecável fizeram toda a diferença."
    },
    {
        image: "/images/testimonials/avatar_new_4.webp",
        name: "Paulo Mendes",
        profession: "Advogado",
        rating: 5,
        testimonial: "Meu escritório de advocacia ganhou uma presença digital sólida e profissional. O site transmite credibilidade e já recebo contatos de clientes corporativos que encontraram nossos serviços online."
    }
];
