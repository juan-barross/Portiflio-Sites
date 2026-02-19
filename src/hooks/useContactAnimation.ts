import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

interface UseContactAnimationReturn {
    sectionRef: React.MutableRefObject<HTMLDivElement | null>;
    badgeRevealRef: React.MutableRefObject<HTMLDivElement | null>;
    titleRevealRef: React.MutableRefObject<HTMLHeadingElement | null>;
    contentRevealRef: React.MutableRefObject<HTMLDivElement | null>;
    buttonRevealRef: React.MutableRefObject<HTMLDivElement | null>;
    gradientTextRef: React.MutableRefObject<HTMLSpanElement | null>;
    handleButtonHover: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    handleButtonHoverOut: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function useContactAnimation(): UseContactAnimationReturn {
    const gradientTextRef = useRef<HTMLSpanElement>(null);

    // Unified reveal hooks
    const sectionRef = useGSAPReveal<HTMLDivElement>({ direction: 'up', distance: 50, threshold: 0.05, duration: 0.5 });
    const badgeRevealRef = useGSAPReveal<HTMLDivElement>({ scale: 0.8, duration: 0.4, delay: 0.1, threshold: 0.05 });
    const titleRevealRef = useGSAPReveal<HTMLHeadingElement>({ direction: 'up', distance: 30, blur: 10, delay: 0.15, threshold: 0.05, duration: 0.5 });
    const contentRevealRef = useGSAPReveal<HTMLDivElement>({ direction: 'up', distance: 20, stagger: 0.1, delay: 0.2, threshold: 0.05, duration: 0.5 });
    const buttonRevealRef = useGSAPReveal<HTMLDivElement>({ direction: 'up', distance: 40, scale: 0.9, delay: 0.25, threshold: 0.05, duration: 0.5 });

    useEffect(() => {
        // Skip heavy infinite animations on mobile for performance
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

        const ctx = gsap.context(() => {
            // Gradient text animation - Infinite loop (skip on mobile)
            if (gradientTextRef.current && !isMobile) {
                gsap.to(gradientTextRef.current, {
                    backgroundPosition: '200% 50%',
                    ease: "linear",
                    duration: 3,
                    repeat: -1
                });
            }

            // Animated Particles - Ambient movement (skip on mobile)
            if (!isMobile) {
                gsap.utils.toArray<HTMLElement>('.contact-particle').forEach((particle) => {
                    gsap.to(particle, {
                        y: -30,
                        duration: 4 + Math.random() * 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                    gsap.to(particle, {
                        opacity: 1,
                        duration: 2 + Math.random() * 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                });
            }
        });

        return () => ctx.revert();
    }, []);

    const handleButtonHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "power1.out" });
    };

    const handleButtonHoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power1.out" });
    };

    return {
        sectionRef,
        badgeRevealRef,
        titleRevealRef,
        contentRevealRef,
        buttonRevealRef,
        gradientTextRef,
        handleButtonHover,
        handleButtonHoverOut
    };
}
