import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Use custom hook for scroll reveal animations
  const headerRef = useGSAPReveal<HTMLDivElement>({ direction: 'up', distance: 30 });
  const faqListRef = useGSAPReveal<HTMLDivElement>({ direction: 'up', distance: 50, stagger: 0.1, delay: 0.2 });

  // Background particles animation - DISABLED ON MOBILE
  // Background particles animation handled by ParticleBackground component

  // Handle FAQ open/close animations (Interaction based)
  useEffect(() => {
    answerRefs.current.forEach((el, index) => {
      if (!el) return;

      const isOpen = openIndex === index;

      if (isOpen) {
        gsap.to(el, {
          height: "auto",
          opacity: 1,
          duration: 0.6,
          ease: "expo.out",
          overwrite: true
        });

        // Animate content fade in with slight slide up
        const content = el.querySelector('.answer-content');
        if (content) {
          gsap.fromTo(content,
            { y: 20, opacity: 0, filter: 'blur(10px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, delay: 0.1, ease: "power3.out" }
          );
        }
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut",
          overwrite: true
        });
      }
    });

  }, [openIndex]);



  const faqs = [
    {
      question: "Como funciona o processo de criação do site ou landing page?",
      answer: "Nosso processo começa com uma conversa consultiva para entender seus objetivos e necessidades. Em seguida, criamos um layout personalizado e ajudamos com o copy. Uma vez aprovado, construímos o site e fornecemos suporte contínuo."
    },
    {
      question: "Quanto tempo leva para criar um site?",
      answer: "O tempo de entrega depende da complexidade do projeto, mas garantimos um serviço rápido e eficiente. A maioria dos sites são concluídos em 1-2 dias úteis."
    },
    {
      question: "Como meu site vai se destacar da concorrência?",
      answer: "Personalizamos totalmente seu site de acordo com a identidade da sua marca para maximizar seus resultados."
    },
    {
      question: "Como posso confiar na qualidade dos seus serviços?",
      answer: "Meu compromisso é entregar qualidade e resultados excepcionais para impulsionar o seu negócio. Cada projeto é tratado com dedicação única e foco total na sua satisfação."
    },
    {
      question: "Quanto custa para criar um site?",
      answer: "O preço varia dependendo das necessidades específicas do projeto. Entre em contato conosco para uma consulta gratuita e um orçamento personalizado baseado em seus objetivos."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 relative overflow-hidden">
      {/* Sci-fi Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-accent/20 rounded-full blur-2xl" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-1/2 w-32 h-32 bg-primary-glow/20 rounded-full blur-xl animate-pulse" />
      </div>

      {/* Particle Grid - Hidden on mobile for performance */}
      <ParticleBackground className="bg-primary" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 relative">
          {/* Special Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none -z-10" />

          <div className="mb-6 inline-block">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]">
              <span className="text-violet-300 font-bold text-sm">Tire suas Dúvidas</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tight">
            Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-violet-400 animate-gradient-xy">Frequentes</span>
          </h2>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Processo premium e transparente. Foco total no <span className="text-violet-400 font-semibold shadow-violet-500/50 drop-shadow-sm">seu sucesso</span>.
          </p>
        </div>

        {/* FAQ Container */}
        <div ref={faqListRef} className="faq-container max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item group"
              >
                <div className="relative">
                  {/* Purple Cloud/Nebula Effect - Amplified */}
                  <div
                    className={`absolute -inset-4 bg-purple-900/20 rounded-[50%] blur-3xl transition-all duration-700 pointer-events-none z-0
                    ${openIndex === index ? 'opacity-100 scale-105' : 'opacity-0 scale-90'}`}
                  />

                  {/* FAQ Card */}
                  <div className={`relative glass-card rounded-2xl overflow-hidden backdrop-brightness-110 transition-all duration-300 border
                     ${openIndex === index
                      ? 'bg-purple-900/40 border-purple-500/40 shadow-[0_0_30px_-10px_rgba(168,85,247,0.15)]'
                      : 'bg-white/[0.02] border-purple-500/20 hover:border-purple-500/40 hover:bg-white/5'
                    }`}>

                    {/* Question */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full p-6 lg:p-8 text-left flex items-center justify-between transition-all duration-300"
                    >
                      <h3 className={`text-lg lg:text-xl font-bold pr-4 transition-all duration-300 
                        ${openIndex === index ? 'text-white' : 'text-foreground group-hover:text-white'}`}>
                        {faq.question}
                      </h3>

                      <div
                        className={`faq-icon flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-[transform,colors] duration-300 ease-out
                          ${openIndex === index
                            ? 'bg-purple-500 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] rotate-180 scale-110'
                            : 'bg-white/5 border-white/10 text-muted-foreground group-hover:border-white/30 group-hover:text-white rotate-0 scale-100'
                          }`}
                      >
                        <span className="text-lg font-bold">?</span>
                      </div>
                    </button>

                    {/* Answer */}
                    <div
                      ref={el => answerRefs.current[index] = el}
                      className="overflow-hidden h-0 opacity-0"
                    >
                      <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                        <div className="answer-content pt-2">
                          <p className="text-muted-foreground leading-relaxed text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;