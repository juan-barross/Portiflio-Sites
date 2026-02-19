import { gsap } from 'gsap';

export function useButtonGSAPInteractions(options = { scale: 1.1, y: -2, duration: 0.3 }) {
    const handleHover = (e: React.MouseEvent<HTMLElement>) => {
        gsap.to(e.currentTarget, {
            scale: options.scale,
            y: options.y,
            duration: options.duration,
            ease: "power1.out"
        });
    };

    const handleHoverOut = (e: React.MouseEvent<HTMLElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            y: 0,
            duration: options.duration,
            ease: "power1.out"
        });
    };

    const handleTap = (e: React.MouseEvent<HTMLElement>, tapScale = 0.95) => {
        gsap.fromTo(e.currentTarget,
            { scale: tapScale },
            { scale: options.scale, duration: 0.2, ease: "elastic.out(1, 0.3)" }
        );
    };

    return { handleHover, handleHoverOut, handleTap };
}
