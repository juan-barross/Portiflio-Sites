import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export function useLoadingAnimation(onComplete: () => void, onStartFadeOut?: () => void) {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressTextRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                onComplete();
            }
        });

        const progressObj = { value: 0 };

        // 1. Progress Animation
        tl.to(progressObj, {
            value: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
                if (progressBarRef.current) {
                    progressBarRef.current.style.width = `${progressObj.value}%`;
                }
                if (progressTextRef.current) {
                    progressTextRef.current.textContent = `${Math.round(progressObj.value)}%`;
                }
            }
        });

        // 2. Animate Inner Elements OUT First (While pure clean state)
        // This runs at 60fps because nothing heavy is rendering yet

        // Text flies up
        tl.to(textRef.current, {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "back.in(1.7)",
            force3D: true
        });

        // Progress bar collapses
        tl.to(progressBarRef.current?.parentElement || null, {
            scaleX: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
            force3D: true
        }, "<");

        // Percentage drops down
        tl.to(progressTextRef.current?.parentElement || null, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            force3D: true
        }, "<");

        // 3. NOW Mount the Heavy Content (Behind the solid curtain)
        // User sees a static solid background here, so lag is unnoticeable
        tl.call(() => {
            if (onStartFadeOut) onStartFadeOut();
        });

        // 4. Wait for React to render the heavy stuff behind the scenes
        tl.to({}, { duration: 0.8 });

        // 5. Finally, fade out the curtain to reveal the ready site
        tl.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            force3D: true
        });

        // Initial entry animation for text
        gsap.fromTo(textRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 }
        );

        return () => {
            tl.kill();
        };
    }, [onComplete, onStartFadeOut]);

    return { containerRef, progressBarRef, textRef, progressTextRef };
}
