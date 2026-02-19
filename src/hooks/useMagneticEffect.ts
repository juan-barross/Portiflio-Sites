import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

interface UseMagneticEffectProps {
    strength?: number; // Movement strength (0-1)
    rotationStrength?: number; // Rotation strength
}

export function useMagneticEffect({ strength = 0.3, rotationStrength = 0.05 }: UseMagneticEffectProps = {}) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        // Mobile optimization: Disable magnetic effect on touch devices
        if (typeof window !== 'undefined' && window.innerWidth < 768) return;

        const element = ref.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
            x: x * strength,
            y: y * strength - 10, // Maintain the offset if there's a floating animation
            rotation: x * rotationStrength,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
        });
    }, [strength, rotationStrength]);

    const handleMouseLeave = useCallback(() => {
        const element = ref.current;
        if (!element) return;

        gsap.to(element, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
            onComplete: () => {
                // Resume floating animation if needed (this part assumes specific behavior, 
                // ideally controlled outside or via a separate 'floating' prop/hook, 
                // but for now we restore the 'y-10' offset typical of the hero button)
                gsap.to(element, {
                    y: -10,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        });
    }, []);

    return { ref, handleMouseMove, handleMouseLeave };
}
