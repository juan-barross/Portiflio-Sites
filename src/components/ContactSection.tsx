import { useContactAnimation } from '@/hooks/useContactAnimation';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import { contactData } from '@/data/contact.data';

const ContactSection = () => {
  const {
    sectionRef,
    badgeRevealRef,
    titleRevealRef,
    contentRevealRef,
    buttonRevealRef,
    gradientTextRef,
  } = useContactAnimation();

  const { sendMessage } = useWhatsApp();
  const { badge, title, subtitle, button } = contactData;

  const handleContactClick = () => {
    sendMessage();
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Effects - Hidden on mobile for performance */}
      <div className="absolute inset-0 opacity-30 pointer-events-none hidden md:block">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-2xl" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-glow/20 rounded-full blur-xl animate-pulse" />
      </div>

      {/* Animated Particles - Hidden on mobile for performance */}
      <div className="absolute inset-0 opacity-20 pointer-events-none hidden md:block">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="contact-particle absolute w-2 h-2 bg-primary rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div
            ref={badgeRevealRef}
            className="inline-flex items-center space-x-2 px-8 py-3 rounded-full border border-purple-500/40 bg-purple-500/10 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] mb-8"
          >
            <span className="text-purple-300 font-bold text-xl">{badge}</span>
          </div>

          {/* Main Title */}
          <h2 ref={titleRevealRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title.prefix}{' '}
            <span
              ref={gradientTextRef}
              className="relative inline-block text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            >
              {title.highlight}
              {/* Advanced Multi-layered Glow matching Hero 'Juan' */}
              <span
                className="absolute inset-0 text-purple-500 opacity-40 blur-2xl select-none"
                aria-hidden="true"
              >
                {title.highlight}
              </span>
              <span
                className="absolute inset-0 text-purple-600 opacity-20 blur-3xl select-none scale-125"
                aria-hidden="true"
              >
                {title.highlight}
              </span>
              {/* Aura */}
              <span
                className="absolute -inset-4 bg-purple-500/20 blur-[60px] rounded-full -z-10 animate-pulse"
                aria-hidden="true"
              />
            </span>
          </h2>

          {/* Subtitle Area */}
          <div ref={contentRevealRef}>
            <p className="contact-subtitle text-lg lg:text-xl text-muted-foreground mb-6 leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* WhatsApp Action */}
          <div ref={buttonRevealRef} className="relative inline-block group pt-2">
            {/* Glow Effect */}
            <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <button
              onClick={handleContactClick}
              className="relative block transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95 focus:outline-none"
              aria-label={button.alt}
            >
              <img
                src={button.image}
                alt={button.alt}
                className="h-24 md:h-28 w-auto object-contain"
                width="300"
                height="112"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;