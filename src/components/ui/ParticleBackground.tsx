import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ParticleBackgroundProps {
    count?: number;
    className?: string;
}

export const ParticleBackground = ({ count = 30, className = 'bg-primary' }: ParticleBackgroundProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Skip on mobile for performance
        if (typeof window !== 'undefined' && window.innerWidth < 768) return;

        const ctx = gsap.context(() => {
            // Scope selection to this container
            gsap.utils.toArray<HTMLElement>('.particle').forEach((particle) => {
                gsap.to(particle, {
                    opacity: 0.8,
                    scale: 1.5,
                    duration: 3 + Math.random() * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: Math.random() * 2
                });

                // Add some random movement
                gsap.to(particle, {
                    x: Math.random() * 20 - 10,
                    y: Math.random() * 20 - 10,
                    duration: 4 + Math.random() * 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 opacity-10 pointer-events-none hidden md:block">
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className={`particle absolute w-1 h-1 rounded-full opacity-20 ${className}`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                />
            ))}
        </div>
    );
};
