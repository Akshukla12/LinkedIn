import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection = ({ title, subtitle, items }) => {
    const containerRef = useRef(null);
    const scrollRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const scrollContent = scrollRef.current;
        const titleElement = titleRef.current;

        if (!container || !scrollContent) return;

        // Title animation
        if (titleElement) {
            gsap.fromTo(
                titleElement,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: titleElement,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }

        // Calculate scroll distance
        const scrollWidth = scrollContent.scrollWidth - container.offsetWidth;

        // Horizontal scroll animation
        const horizontalScroll = gsap.to(scrollContent, {
            x: -scrollWidth,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: () => `+=${scrollWidth + window.innerHeight}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });

        // Individual card animations
        const cards = scrollContent.querySelectorAll('.horizontal-card');
        cards.forEach((card, index) => {
            // Fade in with parallax
            gsap.fromTo(
                card,
                {
                    opacity: 0,
                    x: 100,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: horizontalScroll,
                        start: 'left right',
                        end: 'left center',
                        scrub: 1,
                    },
                }
            );

            // Image scale on hover
            const image = card.querySelector('.card-image');
            const overlay = card.querySelector('.card-overlay');

            if (image && overlay) {
                card.addEventListener('mouseenter', () => {
                    gsap.to(image, {
                        scale: 1.1,
                        duration: 0.6,
                        ease: 'power2.out',
                    });

                    gsap.to(overlay, {
                        opacity: 1,
                        duration: 0.4,
                        ease: 'power2.out',
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(image, {
                        scale: 1,
                        duration: 0.6,
                        ease: 'power2.out',
                    });

                    gsap.to(overlay, {
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power2.out',
                    });
                });
            }
        });

        // Progress indicator
        const progressBar = container.querySelector('.scroll-progress');
        if (progressBar) {
            gsap.to(progressBar, {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: () => `+=${scrollWidth + window.innerHeight}`,
                    scrub: 0.5,
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === container || trigger.vars.containerAnimation === horizontalScroll) {
                    trigger.kill();
                }
            });
        };
    }, [items]);

    return (
        <section ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Section Header */}
            <div ref={titleRef} className="absolute top-12 left-0 right-0 z-20 text-center px-4">
                <div className="flex items-center justify-center gap-2 mb-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                        {title}
                    </h2>
                </div>
                {subtitle && (
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-30">
                <div className="scroll-progress h-full bg-gradient-to-r from-primary to-purple-600 origin-left scale-x-0" />
            </div>

            {/* Horizontal Scroll Container */}
            <div className="absolute inset-0 flex items-center pt-32">
                <div ref={scrollRef} className="flex gap-6 px-12">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="horizontal-card flex-shrink-0 w-[400px] h-[500px] group cursor-pointer"
                        >
                            <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
                                {/* Image */}
                                <div className="relative h-3/5 overflow-hidden">
                                    <img
                                        src={item.image || `https://picsum.photos/400/300?random=${index}`}
                                        alt={item.title}
                                        className="card-image w-full h-full object-cover"
                                    />

                                    {/* Overlay */}
                                    <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 flex items-end p-6">
                                        <div className="text-white">
                                            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                            <p className="text-sm text-gray-200">{item.description}</p>
                                        </div>
                                    </div>

                                    {/* Badge */}
                                    {item.badge && (
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                                            {item.badge}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 h-2/5 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <button className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300">
                                        <span>Explore</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* End spacer */}
                    <div className="flex-shrink-0 w-12" />
                </div>
            </div>

            {/* Scroll Hint */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-20">
                <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
                <div className="flex gap-2 justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>

            {/* Decorative gradients */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        </section>
    );
};

export default HorizontalScrollSection;
