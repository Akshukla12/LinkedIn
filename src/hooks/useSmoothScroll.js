import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for smooth scrolling with Lenis
 * Provides buttery-smooth inertia scrolling inspired by Zentry.com
 */
export const useSmoothScroll = () => {
    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,        // Scroll duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
            direction: 'vertical', // Scroll direction
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,   // Disable on touch devices for better performance
            touchMultiplier: 2,
        });

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);
};

// Re-export useCustomCursor from useMicroInteractions
export { useCustomCursor } from './useMicroInteractions';
