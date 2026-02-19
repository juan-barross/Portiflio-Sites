import { lazy, Suspense, useState, useCallback } from 'react';
import Tilt from 'react-parallax-tilt';
import { GradientButton } from '@/components/ui/gradient-button';
import { GlowText } from '@/components/ui/GlowText';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ROUTES } from '@/lib/constants';
import { heroData } from '@/data/hero.data';

const TubesBackground = lazy(() => import('@/components/ui/neon-flow').then(module => ({ default: module.TubesBackground })));

const HeroSection = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // FIXED: Memoize callback to preventing infinite re-render loop
  const handleAnimationComplete = useCallback(() => {
    setIsAnimationComplete(true);
  }, []);

  const { heroRef, titleRef, ctaRef } = useHeroAnimation(handleAnimationComplete);
  const { greeting, name, cta } = heroData;

  // Magnetic effects
  const ctaMagnetic = useMagneticEffect();
  const pleasureMagnetic = useMagneticEffect();
  const nameMagnetic = useMagneticEffect();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const scrollToAbout = () => {
    const aboutSection = document.querySelector(ROUTES.ABOUT);
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {!isMobile && (
        <Suspense fallback={null}>
          <TubesBackground className="absolute inset-0 z-0" />
        </Suspense>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-background/30 via-background/50 to-background/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-7xl sm:text-8xl md:text-7xl lg:text-8xl font-bold leading-none mb-8 tracking-tight perspective-container flex flex-col items-center sm:flex-row sm:justify-center sm:gap-4"
        >
          <div
            ref={pleasureMagnetic.ref}
            onMouseMove={pleasureMagnetic.handleMouseMove}
            onMouseLeave={pleasureMagnetic.handleMouseLeave}
            className="-mb-4 sm:mb-0 will-change-transform cursor-default z-10 flex gap-1 sm:gap-2"
          >
            {/* Split text for supreme staggered animation */}
            <div className="flex">
              {greeting.split('').map((char, i) => (
                <span key={i} className="inline-block origin-bottom">{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </div>
          </div>

          <div
            ref={nameMagnetic.ref}
            onMouseMove={nameMagnetic.handleMouseMove}
            onMouseLeave={nameMagnetic.handleMouseLeave}
            className="relative inline-block cursor-default z-10"
          >
            {isMobile ? (
              <GlowText text={name} variant="mobile" />
            ) : (
              <Tilt
                tiltEnable={isAnimationComplete}
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                perspective={1000}
                transitionSpeed={1500}
                gyroscope={true}
                className="preserve-3d will-change-transform"
                style={{ display: 'inline-block' }}
              >
                <GlowText text={name} variant="desktop" />
              </Tilt>
            )}
          </div>
        </h1>

        {/* CTA Button */}
        <div ref={ctaRef} className="flex justify-center items-center mt-12 perspective-1000">
          <div
            ref={ctaMagnetic.ref}
            className="relative will-change-transform transform-style-3d" // Optimizes 3D rendering
            onMouseMove={ctaMagnetic.handleMouseMove}
            onMouseLeave={ctaMagnetic.handleMouseLeave}
          >
            {/* 3D Glow Effect Layers */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[12px] blur opacity-40 group-hover:opacity-70 transition duration-500 -z-10" />

            <GradientButton
              onClick={scrollToAbout}
              variant="variant"
              className="relative z-10 px-8 py-4 text-lg font-bold shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {cta}
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;