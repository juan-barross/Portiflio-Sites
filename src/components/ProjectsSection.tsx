import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projectsData } from '@/data/projects';

const ProjectsSection = () => {
    // Supreme Entrance Animations (No 3D Tilt)
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // State for mobile check - still needed for animation logic inside this component? 
    // Wait, isMobile is used in useEffect for listeners?
    // Let's check. Yes, checkMobile sets it. But is it used anywhere else?
    // It's used on line 11 - no, it's defined there.
    // It's NOT used in the GSAP context (it calculates its own logic or doesn't care).
    // It WAS used in the card rendering (onClick isMobile check).
    // So if the card rendering is gone, isMobile might be unused *in this component*.
    // But checkMobile function is defined.
    // Let's remove them.



    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Header Reveal (Split & Center)
            const titleSpans = headerRef.current?.querySelectorAll('span');
            if (titleSpans) {
                // "Meus" slides from left
                gsap.fromTo(titleSpans[0],
                    { opacity: 0, x: -60, filter: "blur(12px)" },
                    {
                        opacity: 1, x: 0, filter: "blur(0px)",
                        duration: 0.8, ease: "power4.out",
                        scrollTrigger: { trigger: headerRef.current, start: "top 92%" }
                    }
                );
                // "Projetos" slides from right
                gsap.fromTo(titleSpans[1],
                    { opacity: 0, x: 60, filter: "blur(12px)" },
                    {
                        opacity: 1, x: 0, filter: "blur(0px)",
                        duration: 0.8, ease: "power4.out", delay: 0.1,
                        scrollTrigger: { trigger: headerRef.current, start: "top 92%" }
                    }
                );
            }

            // Subtitle Reveal
            gsap.fromTo(headerRef.current?.querySelector('p'),
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.2,
                    scrollTrigger: { trigger: headerRef.current, start: "top 92%" }
                }
            );

            // 2. Projects Grid (Granular Supreme Entrance)
            if (containerRef.current) {
                const cards = gsap.utils.toArray(containerRef.current.children) as HTMLElement[];

                cards.forEach((card) => {
                    const preview = card.querySelector('.project-preview');
                    const details = card.querySelectorAll('.project-reveal-item');

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: card,
                            start: "top 92%",
                            toggleActions: "play none none reverse"
                        }
                    });

                    // Card Container Entrance
                    tl.fromTo(card,
                        { opacity: 0, y: 100, scale: 0.95 },
                        {
                            opacity: 1, y: 0, scale: 1,
                            duration: 0.6, ease: "power3.out"
                        }
                    );

                    // Internal Content Stagger (Supreme Details)
                    if (preview && details.length > 0) {
                        // Image slides in or unfolds
                        tl.fromTo(preview,
                            { opacity: 0, x: -30, filter: "blur(5px)" },
                            { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
                            "-=0.4"
                        );

                        // Text details cascade in
                        tl.fromTo(details,
                            { opacity: 0, y: 20 },
                            {
                                opacity: 1, y: 0,
                                duration: 0.6, stagger: 0.1,
                                ease: "back.out(1.2)"
                            },
                            "-=0.6"
                        );
                    }
                });
            }

            // 3. Background Parallax (Subtle depth)
            gsap.to(".bg-particle-projects", {
                y: -100,
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

    return (
        <section ref={sectionRef} id="projects" className="py-24 relative overflow-hidden bg-background">
            {/* Futuristic Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
            </div>

            {/* Particle Grid - Hidden on mobile for performance */}
            <div className="absolute inset-0 opacity-10 pointer-events-none hidden md:block">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-particle-projects absolute w-1 h-1 bg-primary rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div ref={headerRef} className="text-center mb-12 md:mb-24 relative">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight">
                        <span className="text-foreground drop-shadow-2xl">Meus </span>
                        <span className="hero-gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent">Projetos</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        As imagens de pessoas e modelos apresentadas nestes projetos foram geradas por Inteligência Artificial.
                    </p>
                </div>

                <div ref={containerRef} className="grid grid-cols-1 gap-8 md:gap-24">
                    {projectsData.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section >
    );
};

export default ProjectsSection;
