import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Star, MessageCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import Tilt from 'react-parallax-tilt';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

import { testimonialsData } from '@/data/testimonials';

const TestimonialsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  // Background particles animation (Replicated from FAQ) - DISABLED ON MOBILE
  // Background particles animation handled by ParticleBackground component

  return (
    <section id="testimonials" className="py-20 md:py-32 relative overflow-hidden">
      {/* Particle Grid - Hidden on mobile for performance */}
      <ParticleBackground className="bg-primary" />

      <div ref={sectionRef} className="container mx-auto px-4">
        {/* Título da Seção */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            O que nossos <span className="gradient-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">clientes dizem</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mt-4">
            Estes depoimentos são modelos ilustrativos. As imagens utilizadas foram geradas por Inteligência Artificial.
          </p>
        </div>

        {/* Carrossel de Depoimentos */}
        <div className="py-8 max-w-7xl mx-auto relative">
          <Swiper
            modules={[Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            initialSlide={testimonialsData.length}
            speed={1200}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 20 },
              640: { slidesPerView: 1.5, spaceBetween: 30 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="testimonials-swiper !overflow-visible"
          >
            {[...testimonialsData, ...testimonialsData, ...testimonialsData, ...testimonialsData].map((testimonial, index) => (
              <SwiperSlide key={index} className="testimonial-slide pointer-events-none flex justify-center">
                {({ isActive, isPrev }) => (
                  <div className={`group relative h-full flex items-center justify-center ${isActive ? 'z-10' : 'z-0'}`}>
                    <Tilt
                      tiltMaxAngleX={12}
                      tiltMaxAngleY={12}
                      scale={1.02}
                      glareEnable={true}
                      glareMaxOpacity={0.15}
                      glareColor="#8b5cf6"
                      tiltEnable={true}
                      className="h-fit w-fit rounded-3xl isolate pointer-events-auto will-change-transform"
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div className="relative bg-white backdrop-blur-xl rounded-3xl p-8 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col min-h-[480px] overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>

                        {/* Gradient Shadow Overlay for Lateral Cards */}
                        {!isActive && (
                          <div
                            className={`absolute inset-0 rounded-3xl pointer-events-none z-30 ${isPrev
                              ? 'bg-gradient-to-l from-black/40 via-black/20 to-transparent'
                              : 'bg-gradient-to-r from-black/40 via-black/20 to-transparent'
                              }`}
                          />
                        )}

                        {/* Ícone e Estrelas */}
                        <div className="flex items-center justify-between mb-6" style={{ transform: 'translateZ(60px)' }}>
                          <div className="w-10 h-10 bg-[#8b5cf6] rounded-full flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex gap-1">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>

                        {/* Info do Cliente */}
                        <div className="flex items-center gap-4 mb-8" style={{ transform: 'translateZ(80px)' }}>
                          <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                            <p className="text-sm text-primary font-medium">{testimonial.profession}</p>
                          </div>
                        </div>

                        {/* Texto do Depoimento */}
                        <div className="flex-1" style={{ transform: 'translateZ(100px)' }}>
                          <p className="text-gray-600 text-base leading-relaxed">"{testimonial.testimonial}"</p>
                        </div>
                      </div>
                    </Tilt>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
