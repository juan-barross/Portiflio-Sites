import { useRef } from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';
import { useFooterEffects } from '@/hooks/useFooterEffects';
import { useButtonGSAPInteractions } from '@/hooks/useGSAPInteractions';
import { footerData } from '@/data/footer.data';

const Footer = () => {
  const badgeRef = useRef<HTMLDivElement>(null);

  // Custom hooks for animations and interactions
  const footerRevealRef = useGSAPReveal<HTMLElement>({ direction: 'up', distance: 60 });
  const gridStaggerRef = useGSAPReveal<HTMLDivElement>({ direction: 'up', distance: 20, stagger: 0.2, delay: 0.2 });

  useFooterEffects(badgeRef);
  const { handleHover, handleHoverOut, handleTap } = useButtonGSAPInteractions();
  const { brand, socialLinks, quickLinksTitle, quickLinks, contact, copyright } = footerData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRevealRef} className="relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/30 rounded-full blur-2xl" />

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="footer-particle absolute w-1 h-1 bg-primary rounded-full opacity-30"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div ref={gridStaggerRef} className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center overflow-hidden p-1">
                    <img src={brand.logo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{brand.name}</h3>
                    <p className="text-muted-foreground">{brand.role}</p>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4 max-w-md">
                {brand.description}
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverOut}
                    onMouseDown={handleTap}
                    className="p-3 rounded-xl glass-card hover:glow-primary transition-all duration-300 group inline-block"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">
                  {quickLinksTitle}
                </h4>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => {
                          const element = document.querySelector(link.href);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform transition-transform"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">
                  {contact.title}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">{contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <span className="text-primary">📱</span>
                    </div>
                    <span className="text-muted-foreground">{contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <span className="text-primary">📍</span>
                    </div>
                    <span className="text-muted-foreground">{contact.location}</span>
                  </div>
                </div>

                {/* Availability Badge */}
                <div
                  ref={badgeRef}
                  className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg glass-card mt-6"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">{contact.badge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <p className="text-muted-foreground text-sm flex items-center space-x-1">
                <span>{copyright}</span>
              </p>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
                onMouseDown={handleTap}
                className="p-3 rounded-xl glass-card hover:glow-primary transition-all duration-300 group"
                aria-label="Voltar ao topo"
              >
                <ArrowUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;