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
    const [isClicking, setIsClicking] = useState(false);

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
            setIsClicking(true);
            gsap.to([cursorDot, cursorRing], {
                scale: 0.8,
                duration: 0.2,
                ease: 'power2.out',
            });
        };

        // Mouse up handler
        const handleMouseUp = () => {
            setIsClicking(false);
            gsap.to([cursorDot, cursorRing], {
                scale: isHovering ? 1.5 : 1,
                duration: 0.3,
                ease: 'elastic.out(1, 0.5)',
            });
        };

        // Hover handlers for interactive elements
        const handleMouseEnter = () => {
            setIsHovering(true);
            gsap.to(cursorDot, {
                scale: 0.5,
                duration: 0.3,
                ease: 'power2.out',
            });
            gsap.to(cursorRing, {
                scale: 1.5,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            gsap.to([cursorDot, cursorRing], {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
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
    }, [isHovering]);

    return (
        <div className="custom-cursor-container pointer-events-none fixed inset-0 z-[9999] hidden md:block">
            {/* Cursor Dot */}
            <div
                ref={cursorDotRef}
                className="cursor-dot absolute top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                style={{
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
                }}
            />

            {/* Cursor Ring */}
            <div
                ref={cursorRingRef}
                className="cursor-ring absolute top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500/50"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                }}
            />

            {/* Click Ripple Effect */}
            {isClicking && (
                <div
                    className="absolute top-0 left-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-400/30 animate-ping"
                    style={{
                        left: cursorRingRef.current?.style.left,
                        top: cursorRingRef.current?.style.top,
                    }}
                />
            )}
        </div>
    );
};

export default CustomCursor;
