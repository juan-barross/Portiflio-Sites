import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HolographicCardProps {
    children?: React.ReactNode;
    className?: string;
}

const HolographicCard = ({ children, className }: HolographicCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Reduced sensitivity for subtler effect
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
            card.style.setProperty("--bg-x", `${(x / rect.width) * 100}%`);
            card.style.setProperty("--bg-y", `${(y / rect.height) * 100}%`);

            card.style.transition = "transform 0.1s ease-out";
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const handleMouseLeave = () => {
            card.style.transition = "transform 0.4s ease-out";
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
            card.style.setProperty("--x", "50%");
            card.style.setProperty("--y", "50%");
            card.style.setProperty("--bg-x", "50%");
            card.style.setProperty("--bg-y", "50%");
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={cn(
                "holographic-card relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-card to-purple-950/30 text-card-foreground shadow-lg shadow-purple-500/10 transition-all duration-200 hover:shadow-purple-500/20 hover:border-purple-500/50",
                className
            )}
        >
            <div className="relative z-10 h-full w-full">
                {children}
            </div>
            <div className="holo-glow absolute inset-0 z-0 pointer-events-none bg-gradient-radial from-purple-500/10 to-transparent" />
        </div>
    );
};

export default HolographicCard;
