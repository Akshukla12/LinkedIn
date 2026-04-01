import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Modern Custom Cursor Component
 * Features:
 * - Smooth cursor follower with delay
 * - Glowing ring effect
 * - Interactive hover states
 * - Click ripple effect
 */
const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    const isHoveringRef = useRef(false);

    useEffect(() => {
        const cursorDot = cursorDotRef.current;
        const cursorRing = cursorRingRef.current;

        if (!cursorDot || !cursorRing) return;

        // Mouse move handler
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;

            // Instant dot movement
            gsap.to(cursorDot, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: 'power2.out',
            });

            // Delayed ring movement for smooth follow effect
            gsap.to(cursorRing, {
                x: clientX,
                y: clientY,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        // Mouse down handler
        const handleMouseDown = () => {
            gsap.to([cursorDot, cursorRing], {
                scale: 0.8,
                duration: 0.2,
                ease: 'power2.out',
            });
        };

        // Mouse up handler
        const handleMouseUp = () => {
            gsap.to([cursorDot, cursorRing], {
                scale: isHoveringRef.current ? 1.5 : 1,
                duration: 0.3,
                ease: 'elastic.out(1, 0.5)',
            });
        };

        // Hover handlers for interactive elements
        const handleMouseEnter = () => {
            isHoveringRef.current = true;
            setIsHovering(true);
            gsap.to(cursorDot, { scale: 0.5, duration: 0.3, ease: 'power2.out' });
            gsap.to(cursorRing, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
        };

        const handleMouseLeave = () => {
            isHoveringRef.current = false;
            setIsHovering(false);
            gsap.to([cursorDot, cursorRing], { scale: 1, duration: 0.3, ease: 'power2.out' });
        };

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, input, textarea, select, [role="button"], .cursor-pointer'
        );

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);

            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []); // ← runs once on mount only

    return (
        <div className="custom-cursor-container pointer-events-none fixed inset-0 z-[9999] hidden md:block mix-blend-difference">
            <div
                ref={cursorDotRef}
                className="cursor-dot absolute top-0 left-0 w-2.5 h-2.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-sm"
            />
            <div
                ref={cursorRingRef}
                className="cursor-ring absolute top-0 left-0 w-8 h-8 border border-white/50 rounded-full -translate-x-1/2 -translate-y-1/2"
            />
        </div>
    );
};

export default CustomCursor;
