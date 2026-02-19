import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface UseNavigationReturn {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    scrolled: boolean;
    mobileMenuRef: React.RefObject<HTMLDivElement>;
    scrollToSection: (href: string) => void;
}

export function useNavigation(): UseNavigationReturn {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        // Check initial scroll position
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mobile menu animation
    useEffect(() => {
        if (!mobileMenuRef.current) return;

        if (isOpen) {
            gsap.to(mobileMenuRef.current, {
                height: "auto",
                duration: 0.5,
                ease: "power2.out"
            });
        } else {
            gsap.to(mobileMenuRef.current, {
                height: 0,
                duration: 0.4,
                ease: "power2.in"
            });
        }
    }, [isOpen]);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return {
        isOpen,
        setIsOpen,
        scrolled,
        mobileMenuRef,
        scrollToSection
    };
}
