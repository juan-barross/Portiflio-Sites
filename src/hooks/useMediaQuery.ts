import { useState, useEffect } from "react";

/**
 * Custom hook to detect if a media query matches.
 * Hydration-safe: matches defaults to false on server/initial render.
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);

        // Modern browsers support addEventListener on MediaQueryList, but some older ones use addListener
        // For widest support we can stick to window resize or use the proper API if purely modern
        try {
            media.addEventListener("change", listener);
        } catch {
            // Fallback for older browsers (unlikely needed for this portfolio but good practice)
            media.addListener(listener);
        }

        return () => {
            window.removeEventListener("resize", listener);
            try {
                media.removeEventListener("change", listener);
            } catch {
                media.removeListener(listener);
            }
        };
    }, [matches, query]);

    return matches;
}
