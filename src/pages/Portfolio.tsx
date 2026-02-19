
import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import LoadingScreen from '../components/LoadingScreen';

import HeroSection from '../components/HeroSection'; // Keep Hero static for immediate LCP paint
const AboutSection = lazy(() => import('../components/AboutSection'));
const ProjectsSection = lazy(() => import('../components/ProjectsSection'));
const BenefitsSection = lazy(() => import('../components/BenefitsSection'));

// Lazy load heavy sections below the fold for Supreme Performance
const TestimonialsSection = lazy(() => import('../components/TestimonialsSection'));
const FAQSection = lazy(() => import('../components/FAQSection'));
const ContactSection = lazy(() => import('../components/ContactSection'));
const Footer = lazy(() => import('../components/Footer'));

const SectionLoader = () => <div className="w-full h-96 flex items-center justify-center text-purple-500/20">Loading...</div>;

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);


  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleStartFadeOut = useCallback(() => {
    setContentVisible(true);
  }, []);

  // Lock scroll during loading to prevent scrollbar flash
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [loading]);

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/30">
      {loading && (
        <LoadingScreen
          onComplete={handleLoadingComplete}
          onStartFadeOut={handleStartFadeOut}
        />
      )}

      {contentVisible && (
        <>
          <main>
            <div className="-mb-32 sm:mb-40 md:mb-48">
              <HeroSection />
            </div>

            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
              {/* Espaço entre About e Benefits mantido original (sem margem extra) */}

              <div className="mt-[25vh] md:mt-0 mb-32 sm:mb-40 md:mb-48">
                <BenefitsSection />
              </div>

              <div className="mb-32 sm:mb-40 md:mb-48">
                <ProjectsSection />
              </div>

              <div className="mb-32 sm:mb-40 md:mb-48">
                <TestimonialsSection />
              </div>

              <div className="mb-32 sm:mb-40 md:mb-48">
                <FAQSection />
              </div>

              <ContactSection />
            </Suspense>
          </main>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Portfolio;