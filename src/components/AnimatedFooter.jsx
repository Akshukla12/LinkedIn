import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Github,
    Linkedin,
    Mail,
    Send,
    Heart,
    ArrowUp
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AnimatedFooter = () => {
    const footerRef = useRef(null);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const socialLinks = [
        { icon: Github, href: 'https://github.com/Akshukla12', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
        { icon: Linkedin, href: 'https://linkedin.com/in/akash-shukla2311', label: 'LinkedIn', color: 'hover:text-blue-600' },
        { icon: Mail, href: 'mailto:akashshukla2311@gmail.com', label: 'Email', color: 'hover:text-red-500' },
    ];

    useEffect(() => {
        const footer = footerRef.current;
        if (!footer) return;

        // Footer fade-in animation
        gsap.fromTo(
            footer,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        // Newsletter section slide-in
        const newsletter = footer.querySelector('.newsletter-section');
        if (newsletter) {
            gsap.fromTo(
                newsletter.children,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: newsletter,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }

        // Social icons animation
        const socialIcons = footer.querySelectorAll('.social-icon');
        socialIcons.forEach((icon, index) => {
            // Initial animation
            gsap.fromTo(
                icon,
                { scale: 0, rotation: -180 },
                {
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: footer,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Hover animations
            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 360,
                    duration: 0.5,
                    ease: 'back.out(1.7)',
                });
            });

            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
        });

        // Floating animation for heart icon
        const heartIcon = footer.querySelector('.heart-icon');
        if (heartIcon) {
            gsap.to(heartIcon, {
                y: -5,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === footer) {
                    trigger.kill();
                }
            });
        };
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();

        const button = e.target.querySelector('button');
        const input = e.target.querySelector('input');

        // Animate button on submit
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                setIsSubmitted(true);

                // Success animation
                gsap.fromTo(
                    button,
                    { backgroundColor: '#10b981' },
                    {
                        backgroundColor: '#059669',
                        duration: 0.3,
                    }
                );

                // Reset after 3 seconds
                setTimeout(() => {
                    setIsSubmitted(false);
                    setEmail('');
                }, 3000);
            },
        });

        // Input shake animation if empty
        if (!email) {
            gsap.fromTo(
                input,
                { x: -10 },
                {
                    x: 10,
                    duration: 0.1,
                    repeat: 3,
                    yoyo: true,
                    ease: 'power1.inOut',
                }
            );
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            ref={footerRef}
            className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20 overflow-hidden"
        >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* Newsletter Section */}
                <div className="newsletter-section mb-12 text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                        Stay Updated
                    </h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                        Get the latest tips and insights delivered to your inbox
                    </p>

                    <form
                        onSubmit={handleNewsletterSubmit}
                        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubmitted}
                            className={`px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${isSubmitted
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-primary hover:bg-primary/90 hover:shadow-lg'
                                }`}
                        >
                            {isSubmitted ? (
                                <>
                                    <span>Subscribed!</span>
                                    <Heart className="w-4 h-4" />
                                </>
                            ) : (
                                <>
                                    <span>Subscribe</span>
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

                {/* Social Links */}
                <div className="flex justify-center gap-6 mb-12">
                    {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={index}
                                href={social.href}
                                aria-label={social.label}
                                className={`social-icon w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gray-300 ${social.color} transition-colors duration-300`}
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        );
                    })}
                </div>

                {/* Footer Bottom */}
                <div className="text-center text-gray-400 text-sm">
                    <p className="flex items-center justify-center gap-2 mb-4">
                        Made with <Heart className="heart-icon w-4 h-4 text-red-500" fill="currentColor" /> by Your Team
                    </p>
                    <p>&copy; {new Date().getFullYear()} LinkedIn Profile Builder. All rights reserved.</p>
                </div>

                {/* Scroll to Top Button */}
                <button
                    onClick={scrollToTop}
                    className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            </div>

            {/* Decorative gradient orbs */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />
        </footer>
    );
};

export default AnimatedFooter;
