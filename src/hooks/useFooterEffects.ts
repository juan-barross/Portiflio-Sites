import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useFooterEffects(badgeRef: React.RefObject<HTMLElement>) {
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Availability Badge Pulse
            if (badgeRef.current) {
                gsap.to(badgeRef.current, {
                    opacity: 0.5,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }

            // Floating particles animation
            gsap.utils.toArray<HTMLElement>('.footer-particle').forEach((particle, index) => {
                gsap.to(particle, {
                    y: -15,
                    duration: 3 + index * 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });

                gsap.to(particle, {
                    opacity: 0.8,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            });
        });

        return () => ctx.revert();
    }, [badgeRef]);
}

export { }; // Just in case, though usually not needed if only exporting one thing
