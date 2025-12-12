import { useEffect, useState } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * Respects accessibility preferences
 */
export const usePrefersReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (event) => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return prefersReducedMotion;
};

/**
 * Get animation config based on reduced motion preference
 * Returns simplified config if user prefers reduced motion
 */
export const getAnimationConfig = (prefersReducedMotion, config = {}) => {
    if (prefersReducedMotion) {
        return {
            duration: 0.01,
            delay: 0,
            ease: 'none',
            ...config,
        };
    }

    return config;
};

/**
 * Conditionally apply animation based on reduced motion preference
 */
export const shouldAnimate = () => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return !mediaQuery.matches;
};
