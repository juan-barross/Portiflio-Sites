import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useAboutAnimation() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const finalContentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        // DESKTOP ANIMATION
        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                }
            });

            // Initial State for Desktop
            gsap.set(cardRef.current, {
                rotateX: 10,
                y: 50,
                z: -50,
                width: "60vw",
                height: "40vw",
                borderRadius: "2rem",
                transformPerspective: 1000
            });

            gsap.set(finalContentRef.current, {
                opacity: 0,
                x: 100,
                pointerEvents: 'none'
            });

            // Desktop Sequence
            tl.to(cardRef.current, { rotateX: 0, y: 0, z: 0, duration: 2, ease: "power2.out" })
                .to(cardRef.current, { width: "35vw", height: "70vh", x: "-25vw", y: 0, borderRadius: "3rem", duration: 4, ease: "power2.inOut" }, "+=0.2")
                .to(contentRef.current, { opacity: 0, y: -50, scale: 0.9, duration: 2 }, "<")
                .to(finalContentRef.current, { opacity: 1, x: 0, pointerEvents: 'auto', duration: 3, ease: "power2.out" }, "-=2");
        });

        // MOBILE ANIMATION
        mm.add("(max-width: 767px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5, // Reduced scrub for more responsive feel
                }
            });

            // Initial State for Mobile
            gsap.set(cardRef.current, {
                rotateX: 10,
                y: 0,
                z: 0,
                width: "85vw",
                height: "40vh",
                borderRadius: "1.5rem",
                transformPerspective: 1000,
                x: 0, // Ensure centered
                force3D: true // Hardware acceleration
            });

            gsap.set(finalContentRef.current, {
                opacity: 0,
                y: 50,
                pointerEvents: 'none',
                force3D: true
            });

            // Mobile Sequence: Simple Tilt Only
            tl.to(cardRef.current, {
                rotateX: 0,
                duration: 2,
                ease: "power2.out",
                force3D: true
            });

            // Move Card Up significantly and remove shadow
            tl.to(cardRef.current, {
                y: "-22vh",
                scale: 0.95,
                boxShadow: "none", // Remove shadow at the end
                duration: 2,
                force3D: true
            }, "<");

            // Text Reveal - Closer gap
            tl.to(finalContentRef.current, {
                opacity: 1,
                y: "-12vh", // Move up more to close gap
                pointerEvents: 'auto',
                duration: 2,
                force3D: true
            }, "-=1.5");
        });

        return () => mm.revert();
    }, []);

    return { sectionRef, triggerRef, cardRef, contentRef, finalContentRef };
}
