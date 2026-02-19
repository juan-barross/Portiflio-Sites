import { Menu, X } from 'lucide-react';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';
import { useButtonGSAPInteractions } from '@/hooks/useGSAPInteractions';
import { navItems } from '@/data/navigation';
import { useNavigation } from '@/hooks/useNavigation';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import { APP_CONFIG } from '@/lib/constants';

const Navigation = () => {
  const {
    isOpen,
    setIsOpen,
    scrolled,
    mobileMenuRef,
    scrollToSection
  } = useNavigation();

  const { sendMessage } = useWhatsApp();

  const navRevealRef = useGSAPReveal({
    direction: 'down',
    distance: 100,
    delay: 1.5,
    duration: 0.8
  });

  const { handleHover, handleHoverOut, handleTap } = useButtonGSAPInteractions({ scale: 1.05, y: 0, duration: 0.3 });

  const handleWhatsAppClick = () => {
    sendMessage(undefined, APP_CONFIG.whatsapp.message);
  };

  const handleLogoClick = () => {
    // Optionally scroll to top or reload
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRevealRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={handleLogoClick}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            className="flex items-center space-x-2 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
          >
            <img
              src={APP_CONFIG.logo}
              alt={`${APP_CONFIG.name} Logo`}
              className="w-10 h-10 rounded-xl object-contain"
            />
            <span className="font-semibold text-foreground hidden sm:block">{APP_CONFIG.name}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
                onMouseDown={(e) => handleTap(e, 0.95)}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
            <button
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverOut}
              onMouseDown={(e) => handleTap(e, 0.95)}
              onClick={handleWhatsAppClick}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow-lg hover:from-green-400 hover:to-emerald-500 transition-all duration-300"
            >
              WhatsApp
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg glass-card"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Contents */}
      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden glass h-0"
      >
        <div className="px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={handleWhatsAppClick}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium"
          >
            WhatsApp
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;