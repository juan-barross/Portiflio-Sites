import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface GlowTextProps extends ComponentProps<"span"> {
    text: string;
    variant?: "mobile" | "desktop";
}

export const GlowText = ({ text, variant = "desktop", className, ...props }: GlowTextProps) => {
    return (
        <span className={cn("relative inline-block hero-gradient-text", className)} {...props}>
            {text}

            {/* Base Glow Layer - Common to both */}
            <span
                className="absolute inset-0 hero-gradient-text opacity-40 blur-xl select-none"
                aria-hidden="true"
            >
                {text}
            </span>

            {/* Advanced Layers for Desktop */}
            {variant === "desktop" && (
                <>
                    <span
                        className="absolute inset-0 hero-gradient-text opacity-40 blur-2xl select-none"
                        aria-hidden="true"
                        style={{ transform: 'translateZ(-20px)' }}
                    >
                        {text}
                    </span>
                    <span
                        className="absolute inset-0 hero-gradient-text opacity-20 blur-3xl select-none scale-125"
                        aria-hidden="true"
                        style={{ transform: 'translateZ(-40px)' }}
                    >
                        {text}
                    </span>
                    {/* Outer Glow Pulse - Stopped for performance */}
                    <span
                        className="absolute -inset-4 bg-primary/20 blur-[60px] rounded-full -z-10 opacity-50"
                        aria-hidden="true"
                    />
                </>
            )}
        </span>
    );
};
