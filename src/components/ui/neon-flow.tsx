import React, { useEffect, useRef } from 'react';

import { cn } from "@/lib/utils"; // We'll define this or use inline

// Helper for random colors
const randomColors = (count: number) => {
    return new Array(count)
        .fill(0)
        .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

interface TubesBackgroundProps {
    children?: React.ReactNode;
    className?: string;
    enableClickInteraction?: boolean;
}

export function TubesBackground({
    children,
    className,
    enableClickInteraction = true
}: TubesBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tubesRef = useRef<any>(null); // Library doesn't have types

    useEffect(() => {
        let mounted = true;
        let cleanup: (() => void) | undefined;
        let timeoutId: NodeJS.Timeout;

        const initTubes = async () => {
            if (!canvasRef.current) return;

            // Mobile Guard: Don't load heavy 3D on mobile
            if (window.innerWidth < 768) {
                return;
            }

            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const module = await import('threejs-components/build/cursors/tubes1.min.js');
                const TubesCursor = module.default;

                if (!mounted) return;

                const app = TubesCursor(canvasRef.current, {
                    tubes: {
                        colors: ["#8A2BE2", "#4B0082", "#9400D3", "#4169E1", "#BA55D3"],
                        lights: {
                            intensity: 300,
                            colors: ["#8A2BE2", "#00BFFF", "#FF00FF", "#4B0082"]
                        }
                    }
                });

                tubesRef.current = app;
                // setIsLoaded(true); // Removed as state was unused

                const handleResize = () => {
                    // Library might handle resize
                };
                window.addEventListener('resize', handleResize);
                cleanup = () => {
                    window.removeEventListener('resize', handleResize);
                };

            } catch (error) {
                console.error("Failed to load TubesCursor:", error);
            }
        };

        // Initialize immediately on mount since the parent component already lazily loads this
        const startLoad = () => {
            if (window.innerWidth < 768) return;
            // Small timeout to ensure browser paint is done, but much faster than before
            timeoutId = setTimeout(initTubes, 100);
        };

        startLoad();

        return () => {
            mounted = false;
            // Also clean up listener if unmounted before load
            window.removeEventListener('load', startLoad);
            if (cleanup) cleanup();
            clearTimeout(timeoutId);
        };
    }, []);

    const handleClick = () => {
        if (!enableClickInteraction || !tubesRef.current) return;

        const colors = randomColors(3);
        const lightsColors = randomColors(4);

        tubesRef.current.tubes.setColors(colors);
        tubesRef.current.tubes.setLightsColors(lightsColors);
    };

    return (
        <div
            className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-background", className)}
            onClick={handleClick}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full block"
                style={{ touchAction: 'none' }}
            />

            {/* Content Overlay */}
            <div className="relative z-10 w-full h-full pointer-events-none">
                {children}
            </div>
        </div>
    );
}

// Default export
export default TubesBackground;
