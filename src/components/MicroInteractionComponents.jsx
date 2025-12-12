import React, { useRef } from 'react';
import {
    useMagneticEffect,
    useRippleEffect,
    useTiltEffect,
    useFloatingAnimation
} from '../hooks/useMicroInteractions';

/**
 * Magnetic Button Component
 * Button that follows cursor when nearby
 */
export const MagneticButton = ({
    children,
    className = '',
    onClick,
    strength = 0.3,
    ...props
}) => {
    const buttonRef = useRef(null);

    useMagneticEffect(buttonRef, strength);
    useRippleEffect(buttonRef);

    return (
        <button
            ref={buttonRef}
            className={`relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

/**
 * Tilt Card Component
 * Card with 3D tilt effect on hover
 */
export const TiltCard = ({
    children,
    className = '',
    maxTilt = 10,
    ...props
}) => {
    const cardRef = useRef(null);

    useTiltEffect(cardRef, maxTilt);

    return (
        <div
            ref={cardRef}
            className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

/**
 * Floating Icon Component
 * Icon with continuous floating animation
 */
export const FloatingIcon = ({
    children,
    className = '',
    duration = 3,
    y = 10,
    rotation = 5,
    delay = 0,
    ...props
}) => {
    const iconRef = useRef(null);

    useFloatingAnimation(iconRef, { duration, y, rotation, delay });

    return (
        <div
            ref={iconRef}
            className={`inline-block ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

/**
 * Animated Badge Component
 * Badge with scale and glow effect
 */
export const AnimatedBadge = ({
    children,
    className = '',
    color = 'blue',
    ...props
}) => {
    const badgeRef = useRef(null);

    useFloatingAnimation(badgeRef, { duration: 2, y: 3, rotation: 2 });

    const colorClasses = {
        blue: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white',
        purple: 'bg-gradient-to-r from-purple-600 to-pink-500 text-white',
        green: 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white',
        red: 'bg-gradient-to-r from-orange-600 to-rose-500 text-white',
        yellow: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
    };

    return (
        <span
            ref={badgeRef}
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${colorClasses[color]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

/**
 * Interactive Card Component
 * Combines tilt, magnetic, and ripple effects
 */
export const InteractiveCard = ({
    children,
    className = '',
    href,
    onClick,
    ...props
}) => {
    const cardRef = useRef(null);

    useTiltEffect(cardRef, 8);
    useMagneticEffect(cardRef, 0.2);
    useRippleEffect(cardRef);

    const Component = href ? 'a' : 'div';

    return (
        <Component
            ref={cardRef}
            href={href}
            onClick={onClick}
            className={`block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-primary/30 transition-all duration-500 cursor-pointer ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};

/**
 * Glowing Button Component
 * Button with animated glow effect
 */
export const GlowingButton = ({
    children,
    className = '',
    onClick,
    glowColor = 'blue',
    ...props
}) => {
    const buttonRef = useRef(null);

    useMagneticEffect(buttonRef, 0.4);
    useRippleEffect(buttonRef);

    const glowColors = {
        blue: 'shadow-blue-500/50 hover:shadow-blue-500/80',
        purple: 'shadow-purple-500/50 hover:shadow-purple-500/80',
        green: 'shadow-green-500/50 hover:shadow-green-500/80',
        red: 'shadow-red-500/50 hover:shadow-red-500/80',
    };

    return (
        <button
            ref={buttonRef}
            className={`relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg ${glowColors[glowColor]} hover:scale-105 transition-all duration-300 ${className}`}
            onClick={onClick}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
        </button>
    );
};

/**
 * Pulse Dot Component
 * Animated pulsing dot indicator
 */
export const PulseDot = ({
    className = '',
    color = 'blue',
    size = 'md',
    ...props
}) => {
    const dotRef = useRef(null);

    const sizeClasses = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4',
    };

    const colorClasses = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        red: 'bg-red-500',
        yellow: 'bg-yellow-500',
        purple: 'bg-purple-500',
    };

    return (
        <span className={`relative inline-flex ${className}`} {...props}>
            <span
                ref={dotRef}
                className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
            />
            <span className={`absolute inset-0 ${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-ping opacity-75`} />
        </span>
    );
};

/**
 * Shimmer Card Component
 * Card with shimmer effect on hover
 */
export const ShimmerCard = ({
    children,
    className = '',
    ...props
}) => {
    const cardRef = useRef(null);

    useTiltEffect(cardRef, 5);

    return (
        <div
            ref={cardRef}
            className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 ${className}`}
            {...props}
        >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
