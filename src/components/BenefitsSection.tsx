import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HolographicCard from '@/components/ui/holographic-card';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { benefitsData } from '@/data/benefits';

const BenefitsSection = () => {
  // Custom "Supreme" Animation Logic
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Animation (Blur + Slide Up)
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          }
        }
      );

      // 2. Benefits Grid (Supreme 3D Stagger) - OPTIMIZED FOR MOBILE
      // Cards start smaller, rotated, and lower, then "land" with elasticity
      if (gridRef.current) {
        const cards = gridRef.current.children;
        const isMobile = window.innerWidth < 768;

        gsap.fromTo(cards,
          {
            opacity: 0,
            y: isMobile ? 50 : 100,
            scale: isMobile ? 0.95 : 0.8,
            rotationX: isMobile ? 0 : 45,
            z: isMobile ? 0 : -100,
            transformPerspective: isMobile ? 0 : 1000
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            z: 0,
            duration: isMobile ? 0.6 : 1.2,
            stagger: isMobile ? 0.1 : 0.15,
            ease: isMobile ? "power2.out" : "back.out(1.2)", // simpler easing on mobile
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
            }
          }
        );
      }

      // 3. Parallax Background
      gsap.to(".bg-particle-benefits", {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Background particles animation (Replicated from FAQ) - DISABLED ON MOBILE
  // Background particles animation handled by ParticleBackground component

  return (
    <section ref={sectionRef} id="benefits" className="py-16 md:py-24 relative overflow-hidden z-20 bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-accent/30 rounded-full blur-2xl" style={{ animationDelay: '4s' }} />
        <div className="absolute top-3/4 left-1/2 w-32 h-32 bg-primary-glow/30 rounded-full blur-xl" style={{ animationDelay: '2s' }} />
      </div>

      {/* Rotating Semi-Circle Tech Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[50vh] sm:w-[800px] sm:h-[800px] pointer-events-none opacity-30 z-0 select-none">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-[2px] border-transparent border-t-purple-500 border-r-indigo-500/50 blur-[1px] animate-[spin_60s_linear_infinite]" />
        {/* Inner Ring (Reverse) */}
        <div className="absolute inset-[15%] rounded-full border-[2px] border-transparent border-b-fuchsia-500/30 border-l-purple-400/30 animate-[spin_45s_linear_infinite_reverse]" />
      </div>

      {/* Particle Grid - Reduced on mobile for performance */}
      <ParticleBackground className="bg-primary" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Benefícios que{' '}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-gradient-flow bg-[length:200%_auto]">
                impulsionam
              </span>{' '}
              seu negócio
            </h2>
            {/* Purple ambient glow behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/20 blur-3xl -z-10 rounded-full opacity-60" />
          </div>

          <p className="text-muted-foreground font-medium drop-shadow-sm text-base max-w-2xl mx-auto">
            Cada escolha estratégica que fazemos visa maximizar o impacto
            do seu investimento e acelerar seus resultados.
          </p>
        </div>

        {/* Benefits Grid */}
        <div ref={gridRef} className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefitsData.map((benefit) => (
            <div
              key={benefit.title}
              className="benefit-card-wrapper h-full group"
            >
              <HolographicCard className="p-6 lg:p-8 h-full rounded-2xl backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-12px_rgba(168,85,247,0.4)] group-hover:bg-white/[0.03] group-hover:border-purple-500/30">
                <div className="holo-content relative z-10 h-full flex flex-col mb-0">
                  <div className="mb-8 relative z-10 w-fit">
                    {/* Interactive Orbit Ring - Faster & Single Arc */}
                    <div className="hidden md:block absolute -inset-3 rounded-full border-2 border-transparent border-t-purple-500 animate-[spin_4s_linear_infinite] group-hover:animate-[spin_1s_linear_infinite] opacity-80" />
                    <div className="icon-orbit-container">
                      <div className="icon-orbit-glow" />
                      <div className="icon-orbit-ring" />
                      <div className={`inline-flex p-4 rounded-full bg-white/5 border border-white/10 relative z-10 backdrop-blur-sm`}>
                        <benefit.icon className={`w-6 h-6 ${benefit.textColor}`} />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground relative z-10 tracking-tight group-hover:text-purple-300 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10 flex-grow group-hover:text-gray-200 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>
              </HolographicCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;