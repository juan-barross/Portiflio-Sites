import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseGSAPRevealProps {
    threshold?: number;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    duration?: number;
    stagger?: number;
    scale?: number;
    rotate?: number;
    rotationX?: number;
    rotationY?: number;
    blur?: number;
    scrub?: boolean | number;
    triggerOnce?: boolean;
}

export function useGSAPReveal<T extends HTMLElement = HTMLElement>(
    options: UseGSAPRevealProps = {}
) {
    const ref = useRef<T>(null);

    const {
        threshold = 0.2,
        delay = 0,
        direction = 'up',
        distance = 50,
        duration = 0.8,
        stagger = 0,
        scale = 1,
        rotate = 0,
        rotationX = 0,
        rotationY = 0,
        blur = 0,
        scrub = false,
        triggerOnce = false
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let x = 0;
        let y = 0;

        if (direction === 'up') y = distance;
        else if (direction === 'down') y = -distance;
        else if (direction === 'left') x = distance;
        else if (direction === 'right') x = -distance;

        const ctx = gsap.context(() => {
            const target = stagger ? (el.children.length ? el.children : el) : el;

            gsap.fromTo(target,
                {
                    opacity: 0,
                    x: x,
                    y: y,
                    scale: scale !== 1 ? scale : undefined,
                    rotate: rotate !== 0 ? rotate : undefined,
                    rotationX: rotationX !== 0 ? rotationX : undefined,
                    rotationY: rotationY !== 0 ? rotationY : undefined,
                    filter: blur > 0 ? `blur(${blur}px)` : undefined,
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    rotationX: 0,
                    rotationY: 0,
                    filter: "blur(0px)",
                    duration: duration,
                    delay: delay,
                    stagger: stagger,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: `top ${100 - (threshold * 100) + 10}%`,
                        toggleActions: triggerOnce ? "play none none none" : "play none none reverse",
                        scrub: scrub
                    }
                }
            );
        }, ref);

        return () => ctx.revert();
    }, [direction, distance, duration, delay, stagger, threshold, scale, rotate, rotationX, rotationY, blur, scrub, triggerOnce]);

    return ref;
}
