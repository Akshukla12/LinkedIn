import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Custom Cursor Component
 * Professional cursor that follows mouse with smooth delay
 * Shows different states on hover (buttons, links, etc.)
 */
export const useCustomCursor = () => {
    useEffect(() => {
        // Create cursor elements
        const cursor = document.createElement('div');
        const cursorFollower = document.createElement('div');

        cursor.className = 'custom-cursor';
        cursorFollower.className = 'custom-cursor-follower';

        document.body.appendChild(cursor);
        document.body.appendChild(cursorFollower);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
      .custom-cursor {
        width: 10px;
        height: 10px;
        background: rgba(59, 130, 246, 0.8);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.15s ease;
      }
      
      .custom-cursor-follower {
        width: 40px;
        height: 40px;
        border: 2px solid rgba(59, 130, 246, 0.4);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.3s ease;
      }
      
      .custom-cursor.hover {
        transform: scale(0.5);
        background: rgba(239, 68, 68, 0.8);
      }
      
      .custom-cursor-follower.hover {
        transform: scale(1.5);
        border-color: rgba(239, 68, 68, 0.6);
      }
      
      body.custom-cursor-active {
        cursor: none;
      }
      
      body.custom-cursor-active a,
      body.custom-cursor-active button,
      body.custom-cursor-active [role="button"] {
        cursor: none;
      }
    `;
        document.head.appendChild(style);

        // Mouse move handler
        const onMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX - 5,
                y: e.clientY - 5,
                duration: 0.1,
                ease: 'power2.out',
            });

            gsap.to(cursorFollower, {
                x: e.clientX - 20,
                y: e.clientY - 20,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        // Hover handlers for interactive elements
        const onMouseEnter = () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        };

        const onMouseLeave = () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        };

        // Add event listeners
        document.addEventListener('mousemove', onMouseMove);
        document.body.classList.add('custom-cursor-active');

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', onMouseEnter);
            el.addEventListener('mouseleave', onMouseLeave);
        });

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.body.classList.remove('custom-cursor-active');
            cursor.remove();
            cursorFollower.remove();
            style.remove();

            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, []);
};

/**
 * Magnetic Button Effect
 * Buttons follow cursor when nearby
 */
export const useMagneticEffect = (ref, strength = 0.3) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;

            gsap.to(element, {
                x: deltaX,
                y: deltaY,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref, strength]);
};

/**
 * Ripple Effect on Click
 * Creates expanding ripple on click
 */
export const useRippleEffect = (ref) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const createRipple = (e) => {
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.className = 'ripple-effect';

            element.appendChild(ripple);

            gsap.fromTo(
                ripple,
                {
                    scale: 0,
                    opacity: 0.6,
                },
                {
                    scale: 2,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove(),
                }
            );
        };

        // Add ripple styles
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          pointer-events: none;
          transform-origin: center;
        }
      `;
            document.head.appendChild(style);
        }

        // Ensure element has position relative
        element.style.position = 'relative';
        element.style.overflow = 'hidden';

        element.addEventListener('click', createRipple);

        return () => {
            element.removeEventListener('click', createRipple);
        };
    }, [ref]);
};

/**
 * Text Split and Reveal on Hover
 * Each character animates on hover
 */
export const useTextReveal = (ref) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const text = element.textContent;
        const chars = text.split('');

        element.innerHTML = chars
            .map((char, i) =>
                `<span class="char" style="display: inline-block; transition: transform 0.3s ease ${i * 0.02}s;">${char === ' ' ? '&nbsp;' : char}</span>`
            )
            .join('');

        const handleMouseEnter = () => {
            const spans = element.querySelectorAll('.char');
            spans.forEach((span, i) => {
                gsap.to(span, {
                    y: -5,
                    color: '#3b82f6',
                    duration: 0.3,
                    delay: i * 0.02,
                    ease: 'back.out(1.7)',
                });
            });
        };

        const handleMouseLeave = () => {
            const spans = element.querySelectorAll('.char');
            spans.forEach((span, i) => {
                gsap.to(span, {
                    y: 0,
                    color: '',
                    duration: 0.3,
                    delay: i * 0.02,
                    ease: 'power2.out',
                });
            });
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.textContent = text; // Restore original text
        };
    }, [ref]);
};

/**
 * Tilt Effect on Hover
 * 3D tilt effect following mouse
 */
export const useTiltEffect = (ref, maxTilt = 15) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        element.style.transformStyle = 'preserve-3d';
        element.style.transition = 'transform 0.1s ease';

        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const percentX = (e.clientX - centerX) / (rect.width / 2);
            const percentY = (e.clientY - centerY) / (rect.height / 2);

            const tiltX = percentY * maxTilt;
            const tiltY = -percentX * maxTilt;

            gsap.to(element, {
                rotationX: tiltX,
                rotationY: tiltY,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref, maxTilt]);
};

/**
 * Floating Animation
 * Continuous gentle floating motion
 */
export const useFloatingAnimation = (ref, options = {}) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const {
            duration = 3,
            y = 10,
            rotation = 5,
            delay = 0,
        } = options;

        const tl = gsap.timeline({ repeat: -1, yoyo: true });

        tl.to(element, {
            y: y,
            rotation: rotation,
            duration: duration,
            ease: 'sine.inOut',
            delay: delay,
        });

        return () => {
            tl.kill();
        };
    }, [ref, options]);
};
