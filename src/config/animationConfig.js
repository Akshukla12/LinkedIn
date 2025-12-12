/**
 * Global Animation Configuration
 * Customize all animation settings from this single file
 */

export const animationConfig = {
    // ===== SMOOTH SCROLL SETTINGS =====
    smoothScroll: {
        duration: 1.2,                    // Scroll duration (higher = slower)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
        smooth: true,                     // Enable smooth scroll
        smoothTouch: false,               // Disable on touch for performance
        touchMultiplier: 2,               // Touch scroll speed multiplier
    },

    // ===== FADE IN ANIMATIONS =====
    fadeIn: {
        duration: 0.8,                    // Animation duration in seconds
        delay: 0,                         // Delay before animation starts
        y: 60,                            // Distance to move from (pixels)
        ease: 'power3.out',               // Easing function
        start: 'top 85%',                 // When to trigger (viewport position)
    },

    // ===== STAGGER ANIMATIONS =====
    stagger: {
        duration: 0.6,                    // Duration for each item
        stagger: 0.15,                    // Delay between items
        y: 40,                            // Distance to move from
        ease: 'power2.out',
        start: 'top 85%',
    },

    // ===== PARALLAX SETTINGS =====
    parallax: {
        speed: 0.5,                       // Parallax speed (0.5 = half scroll speed)
        start: 'top bottom',
        end: 'bottom top',
        ease: 'none',                     // Linear for smooth parallax
    },

    // ===== SCALE ANIMATIONS =====
    scale: {
        from: 0.8,                        // Starting scale
        to: 1,                            // Ending scale
        duration: 1,
        ease: 'power2.out',
        start: 'top 80%',
        end: 'top 20%',
    },

    // ===== HORIZONTAL SCROLL =====
    horizontalScroll: {
        speed: 1,                         // Scroll speed
        pin: true,                        // Pin container during scroll
        anticipatePin: 1,
        start: 'top top',
    },

    // ===== REVEAL ANIMATIONS =====
    reveal: {
        duration: 1.2,
        ease: 'power3.inOut',
        start: 'top 80%',
    },

    // ===== HOVER ANIMATIONS =====
    hover: {
        scale: 1.05,                      // Scale on hover
        duration: 0.3,
        ease: 'power2.out',
    },

    // ===== CARD ANIMATIONS =====
    card: {
        lift: -8,                         // Pixels to lift on hover
        scale: 1.02,                      // Scale on hover
        duration: 0.3,
        shadowIntensity: 2,               // Shadow multiplier on hover
    },

    // ===== ICON ANIMATIONS =====
    icon: {
        scale: 1.2,                       // Scale on hover
        rotation: 360,                    // Rotation degrees
        duration: 0.5,
        ease: 'back.out(1.7)',
    },

    // ===== SECTION TRANSITIONS =====
    sectionTransition: {
        fadeOutOpacity: 0.7,              // Opacity when section is not active
        duration: 0.6,
        ease: 'power2.out',
    },

    // ===== HERO ANIMATIONS =====
    hero: {
        titleDelay: 0.3,                  // Delay for title animation
        titleStagger: 0.1,                // Stagger between words
        subtitleDelay: 0.6,               // Delay for subtitle
        backgroundPulseDuration: 8,       // Background pulse duration
    },

    // ===== TABLE ANIMATIONS =====
    table: {
        rowDelay: 0.1,                    // Delay between rows
        cellStagger: 0.05,                // Stagger between cells
        highlightGlowDuration: 2,         // Pulsing glow duration
        hoverScale: 1.02,
    },

    // ===== FOOTER ANIMATIONS =====
    footer: {
        fadeInDuration: 1,
        socialIconDelay: 0.1,             // Delay between social icons
        socialIconRotation: -180,         // Initial rotation
        heartFloatDuration: 1,            // Floating heart animation
    },

    // ===== RESPONSIVE BREAKPOINTS =====
    breakpoints: {
        mobile: 768,                      // Mobile breakpoint (px)
        tablet: 1024,                     // Tablet breakpoint (px)
        desktop: 1280,                    // Desktop breakpoint (px)
    },

    // ===== MOBILE ADJUSTMENTS =====
    mobile: {
        reducedY: 30,                     // Reduced movement on mobile
        reducedDuration: 0.5,             // Faster animations on mobile
        disableParallax: true,            // Disable parallax on mobile
        disableHorizontalScroll: true,    // Disable horizontal scroll on mobile
    },

    // ===== ACCESSIBILITY =====
    accessibility: {
        respectReducedMotion: true,       // Respect prefers-reduced-motion
        reducedMotionDuration: 0.01,      // Duration when reduced motion is on
    },

    // ===== DEBUG =====
    debug: {
        showMarkers: false,               // Show ScrollTrigger markers
        logAnimations: false,             // Log animation events to console
    },
};

/**
 * Get animation config for specific type
 * @param {string} type - Animation type (e.g., 'fadeIn', 'stagger')
 * @param {object} overrides - Custom overrides for this instance
 * @returns {object} Merged configuration
 */
export const getConfig = (type, overrides = {}) => {
    const baseConfig = animationConfig[type] || {};
    return { ...baseConfig, ...overrides };
};

/**
 * Check if device is mobile
 * @returns {boolean}
 */
export const isMobile = () => {
    return window.innerWidth < animationConfig.breakpoints.mobile;
};

/**
 * Check if device is tablet
 * @returns {boolean}
 */
export const isTablet = () => {
    return (
        window.innerWidth >= animationConfig.breakpoints.mobile &&
        window.innerWidth < animationConfig.breakpoints.desktop
    );
};

/**
 * Get responsive config based on device
 * @param {object} desktopConfig - Desktop configuration
 * @param {object} mobileConfig - Mobile configuration (optional)
 * @returns {object} Appropriate configuration for device
 */
export const getResponsiveConfig = (desktopConfig, mobileConfig = {}) => {
    if (isMobile()) {
        return {
            ...desktopConfig,
            ...animationConfig.mobile,
            ...mobileConfig,
        };
    }
    return desktopConfig;
};

/**
 * Easing functions library
 */
export const easings = {
    // Power easings
    power1: {
        in: 'power1.in',
        out: 'power1.out',
        inOut: 'power1.inOut',
    },
    power2: {
        in: 'power2.in',
        out: 'power2.out',
        inOut: 'power2.inOut',
    },
    power3: {
        in: 'power3.in',
        out: 'power3.out',
        inOut: 'power3.inOut',
    },
    power4: {
        in: 'power4.in',
        out: 'power4.out',
        inOut: 'power4.inOut',
    },

    // Elastic
    elastic: {
        in: 'elastic.in(1, 0.5)',
        out: 'elastic.out(1, 0.5)',
        inOut: 'elastic.inOut(1, 0.5)',
    },

    // Back
    back: {
        in: 'back.in(1.7)',
        out: 'back.out(1.7)',
        inOut: 'back.inOut(1.7)',
    },

    // Bounce
    bounce: {
        in: 'bounce.in',
        out: 'bounce.out',
        inOut: 'bounce.inOut',
    },

    // Circ
    circ: {
        in: 'circ.in',
        out: 'circ.out',
        inOut: 'circ.inOut',
    },

    // Expo
    expo: {
        in: 'expo.in',
        out: 'expo.out',
        inOut: 'expo.inOut',
    },

    // Sine
    sine: {
        in: 'sine.in',
        out: 'sine.out',
        inOut: 'sine.inOut',
    },

    // None (linear)
    none: 'none',
};

/**
 * Common animation presets
 */
export const presets = {
    // Quick and snappy
    snappy: {
        duration: 0.3,
        ease: easings.power2.out,
    },

    // Smooth and elegant
    smooth: {
        duration: 0.8,
        ease: easings.power3.out,
    },

    // Bouncy and playful
    bouncy: {
        duration: 0.6,
        ease: easings.back.out,
    },

    // Elastic and attention-grabbing
    elastic: {
        duration: 1,
        ease: easings.elastic.out,
    },

    // Slow and dramatic
    dramatic: {
        duration: 1.5,
        ease: easings.power4.out,
    },
};

export default animationConfig;
