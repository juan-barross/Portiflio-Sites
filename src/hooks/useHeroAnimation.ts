import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export function useHeroAnimation(onComplete?: () => void) {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const ctaButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        const ctx = gsap.context(() => {
            const prazerContainer = titleRef.current?.querySelector('div:first-child > div');
            const prazerLetters = prazerContainer?.children;
            const juanContainer = titleRef.current?.children[1];

            // Setup: Hide initially with autoAlpha
            if (prazerLetters) gsap.set(prazerLetters, { autoAlpha: 0, y: 100, rotateX: -90 });
            if (juanContainer) gsap.set(juanContainer, { autoAlpha: 0, scale: 0.95 }); // Subtle start scale, NO BLUR
            if (ctaRef.current) gsap.set(ctaRef.current, { autoAlpha: 0, y: 40 });
            if (subtitleRef.current) gsap.set(subtitleRef.current, { autoAlpha: 0, y: 30 });

            // Timeline with slight initial delay
            const tl = gsap.timeline({ delay: 0.5 });

            // 1. "Prazer" Text -- Smooth & Heavy
            if (prazerLetters?.length) {
                tl.to(prazerLetters, {
                    autoAlpha: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1.5,
                    stagger: { amount: 0.5, from: "start" },
                    ease: "power4.out",
                    force3D: true,
                    onStart: () => { gsap.set(prazerLetters, { willChange: "transform, opacity" }); },
                    onComplete: () => { gsap.set(prazerLetters, { willChange: "auto" }); }
                });
            }

            // 2. "Juan" Name -- Majestic, Slow, No Blur
            if (juanContainer) {
                tl.fromTo(juanContainer,
                    {
                        autoAlpha: 0,
                        scale: 0.95
                    },
                    {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 1.8,
                        ease: "power3.out",
                        force3D: true,
                        onStart: () => { gsap.set(juanContainer, { willChange: "transform, opacity" }); },
                        onComplete: () => {
                            gsap.set(juanContainer, { willChange: "auto" });
                            if (onComplete) onComplete();
                        }
                    },
                    prazerLetters?.length ? "-=1.2" : "0"
                );
            }

            // 3. Subtitle -- Fluid Rise
            if (subtitleRef.current) {
                tl.to(subtitleRef.current, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    force3D: true
                }, "-=1.4");
            }

            // 4. CTA Button -- Soft Entry
            if (ctaRef.current) {
                tl.to(ctaRef.current, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    force3D: true
                }, "-=1.0");
            }

            // Continuous Floating (Desktop)
            if (!isMobile && ctaButtonRef.current) {
                gsap.to(ctaButtonRef.current, {
                    y: -10,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 2
                });
            }

        }, heroRef);

        return () => ctx.revert();
    }, [onComplete]);

    return { heroRef, titleRef, subtitleRef, ctaRef, ctaButtonRef };
}

