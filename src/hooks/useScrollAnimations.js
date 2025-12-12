import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade in from bottom animation
 * Elements fade in and slide up as they enter viewport
 */
export const useFadeInUp = (options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const {
            delay = 0,
            duration = 0.8,
            y = 60,
            stagger = 0,
            start = 'top 85%',
            markers = false,
        } = options;

        const targets = options.children ? element.children : element;

        gsap.fromTo(
            targets,
            {
                opacity: 0,
                y: y,
            },
            {
                opacity: 1,
                y: 0,
                duration: duration,
                delay: delay,
                stagger: stagger,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: start,
                    toggleActions: 'play none none reverse',
                    markers: markers,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [options]);

    return ref;
};

/**
 * Parallax effect for elements
 * Creates subtle depth with different scroll speeds
 */
export const useParallax = (options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const {
            speed = 0.5,
            start = 'top bottom',
            end = 'bottom top',
            markers = false,
        } = options;

        gsap.to(element, {
            y: () => -(element.offsetHeight * speed),
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: start,
                end: end,
                scrub: true,
                markers: markers,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [options]);

    return ref;
};

/**
 * Scale animation on scroll
 * Elements scale up/down as they enter/exit viewport
 */
export const useScaleOnScroll = (options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const {
            from = 0.8,
            to = 1,
            duration = 1,
            start = 'top 80%',
            end = 'top 20%',
            markers = false,
        } = options;

        gsap.fromTo(
            element,
            { scale: from, opacity: 0 },
            {
                scale: to,
                opacity: 1,
                duration: duration,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: start,
                    end: end,
                    scrub: 1,
                    markers: markers,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [options]);

    return ref;
};

/**
 * Horizontal scroll animation
 * Scroll horizontally through content on vertical scroll
 */
export const useHorizontalScroll = (options = {}) => {
    const containerRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const scrollContent = scrollRef.current;
        if (!container || !scrollContent) return;

        const {
            speed = 1,
            start = 'top top',
            end = () => `+=${scrollContent.scrollWidth}`,
            pin = true,
            markers = false,
        } = options;

        const scrollWidth = scrollContent.scrollWidth - container.offsetWidth;

        gsap.to(scrollContent, {
            x: -scrollWidth,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: start,
                end: end,
                scrub: speed,
                pin: pin,
                anticipatePin: 1,
                markers: markers,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [options]);

    return { containerRef, scrollRef };
};

/**
 * Stagger fade-in animation for lists/grids
 * Children elements appear one after another
 */
export const useStaggerFade = (options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const {
            stagger = 0.1,
            duration = 0.6,
            y = 40,
            start = 'top 85%',
            markers = false,
        } = options;

        gsap.fromTo(
            element.children,
            {
                opacity: 0,
                y: y,
            },
            {
                opacity: 1,
                y: 0,
                duration: duration,
                stagger: stagger,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: start,
                    toggleActions: 'play none none reverse',
                    markers: markers,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [options]);

    return ref;
};

/**
 * Reveal animation with clip-path
 * Creates a reveal effect from left to right
 */
export const useReveal = (options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const {
            duration = 1.2,
            start = 'top 80%',
            markers = false,
        } = options;

        gsap.fromTo(
            element,
            {
                clipPath: 'inset(0 100% 0 0)',
            },
            {
                clipPath: 'inset(0 0% 0 0)',
                duration: duration,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: element,
                    start: start,
                    toggleActions: 'play none none reverse',
                    markers: markers,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [options]);

    return ref;
};
