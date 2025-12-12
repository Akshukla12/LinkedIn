import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, FileText, Award, ArrowRight, Sparkles, TrendingUp, Users, Zap, Briefcase } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import {
    useFadeInUp,
    useStaggerFade,
    useParallax,
    useScaleOnScroll
} from "../hooks/useScrollAnimations";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: User,
        title: "About Me Generator",
        description: "Create compelling professional summaries that showcase your expertise and personality.",
        path: "/about",
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: FileText,
        title: "Headline Generator",
        description: "Craft attention-grabbing headlines that make you stand out to recruiters.",
        path: "/headline",
        color: "from-purple-500 to-purple-600"
    },
    {
        icon: Award,
        title: "Skills Generator",
        description: "Identify and list the most relevant skills for your industry and role.",
        path: "/skills",
        color: "from-green-500 to-green-600"
    },
    {
        icon: Briefcase,
        title: "Job Keyword Matcher",
        description: "Optimize your profile by analyzing it against any job description for keyword alignment.",
        path: "/job-match",
        color: "from-orange-500 to-red-500"
    }
];

const stats = [
    { icon: Users, value: "50K+", label: "Profiles Created" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
    { icon: Zap, value: "24/7", label: "Available" },
];

function Home() {
    // Initialize smooth scrolling
    useSmoothScroll();

    // Refs for scroll animations
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const statsRef = useRef(null);
    const ctaRef = useRef(null);
    const backgroundRef = useRef(null);

    // Apply animation hooks
    const heroTitleRef = useFadeInUp({ delay: 0.2, duration: 1 });
    const heroDescRef = useFadeInUp({ delay: 0.4, duration: 1 });
    const featuresGridRef = useStaggerFade({ stagger: 0.15, duration: 0.8, y: 60 });
    const statsContainerRef = useFadeInUp({ delay: 0.2, duration: 1 });
    const ctaBoxRef = useScaleOnScroll({ from: 0.9, to: 1, duration: 1 });

    // Parallax background effect
    const parallaxBgRef = useParallax({ speed: 0.3 });

    // Hero section animations
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        // Sparkle icon rotation and scale
        const sparkle = hero.querySelector('.sparkle-icon');
        if (sparkle) {
            gsap.to(sparkle, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: 'none',
            });

            gsap.to(sparkle, {
                scale: 1.2,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });
        }

        // Title word reveal animation
        const title = hero.querySelector('.hero-title');
        if (title) {
            const words = title.textContent.split(' ');
            title.innerHTML = words
                .map((word) => `<span class="inline-block opacity-0">${word}</span>`)
                .join(' ');

            gsap.to(title.children, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.3,
            });
        }

        // Subtle background pulse
        gsap.to(backgroundRef.current, {
            scale: 1.05,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });
    }, []);

    // Feature cards hover animations
    useEffect(() => {
        const cards = document.querySelectorAll('.feature-card');

        cards.forEach((card) => {
            const icon = card.querySelector('.feature-icon');
            const arrow = card.querySelector('.feature-arrow');

            card.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.15,
                    rotation: 5,
                    duration: 0.4,
                    ease: 'back.out(1.7)',
                });

                gsap.to(arrow, {
                    x: 8,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                });

                gsap.to(arrow, {
                    x: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
        });

        return () => {
            cards.forEach((card) => {
                card.removeEventListener('mouseenter', () => { });
                card.removeEventListener('mouseleave', () => { });
            });
        };
    }, []);

    // Stats counter animation
    useEffect(() => {
        const statsSection = statsRef.current;
        if (!statsSection) return;

        ScrollTrigger.create({
            trigger: statsSection,
            start: 'top 70%',
            onEnter: () => {
                // Animate stat icons
                gsap.from('.stat-icon', {
                    scale: 0,
                    rotation: -180,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                });

                // Animate stat values with counter effect
                const statValues = document.querySelectorAll('.stat-value');
                statValues.forEach((stat) => {
                    const text = stat.textContent;
                    const hasPlus = text.includes('+');
                    const hasPercent = text.includes('%');
                    const number = parseInt(text.replace(/[^0-9]/g, ''));

                    if (!isNaN(number)) {
                        gsap.from(stat, {
                            textContent: 0,
                            duration: 2,
                            ease: 'power1.out',
                            snap: { textContent: 1 },
                            onUpdate: function () {
                                const current = Math.ceil(this.targets()[0].textContent);
                                stat.textContent = current + (hasPlus ? 'K+' : hasPercent ? '%' : '');
                            }
                        });
                    }
                });
            },
            once: true,
        });
    }, []);

    // Section transition effects
    useEffect(() => {
        const sections = [heroRef.current, featuresRef.current, statsRef.current, ctaRef.current];

        sections.forEach((section, index) => {
            if (!section) return;

            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => {
                    gsap.to(section, {
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power2.out',
                    });
                },
                onLeave: () => {
                    gsap.to(section, {
                        opacity: 0.7,
                        duration: 0.6,
                        ease: 'power2.out',
                    });
                },
                onEnterBack: () => {
                    gsap.to(section, {
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power2.out',
                    });
                },
                onLeaveBack: () => {
                    gsap.to(section, {
                        opacity: 0.7,
                        duration: 0.6,
                        ease: 'power2.out',
                    });
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 overflow-hidden">
            {/* Animated background gradient */}
            <div
                ref={backgroundRef}
                className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 opacity-50"
            />

            {/* Parallax background shapes */}
            <div ref={parallaxBgRef} className="fixed inset-0 -z-5 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
            </div>

            {/* Hero Section */}
            <section ref={heroRef} className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <div className="relative inline-block mb-4 sm:mb-6">
                        <div className="sparkle-icon absolute -top-2 -right-2 sm:-top-4 sm:-right-4">
                            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                        </div>
                        <h2
                            ref={heroTitleRef}
                            className="hero-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-4 leading-tight"
                        >
                            Elevate Your LinkedIn Profile
                        </h2>
                    </div>
                    <p
                        ref={heroDescRef}
                        className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4"
                    >
                        Transform your professional presence with AI-powered content generation.
                        Create compelling profiles that attract opportunities and showcase your expertise.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section ref={featuresRef} className="py-12 sm:py-16 lg:py-20">
                <div ref={featuresGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={feature.path} className="feature-card group h-full">
                                <Link
                                    to={feature.path}
                                    className="block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-primary/30 transition-all duration-500 h-full hover:-translate-y-2"
                                >
                                    <div className={`feature-icon w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 sm:mb-6 mx-auto sm:mx-0 shadow-lg`}>
                                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-card-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors text-center sm:text-left">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed text-center sm:text-left">
                                        {feature.description}
                                    </p>
                                    <div className="flex items-center justify-center sm:justify-start text-primary font-semibold">
                                        <span className="text-sm sm:text-base">Get Started</span>
                                        <ArrowRight className="feature-arrow w-4 h-4 ml-2" />
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className="py-12 sm:py-16 lg:py-20">
                <div
                    ref={statsContainerRef}
                    className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-primary-foreground text-center shadow-2xl relative overflow-hidden"
                >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6">
                            Join Thousands of Professionals
                        </h3>
                        <p className="text-blue-200 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
                            Our AI-powered tools have helped professionals create standout LinkedIn profiles
                            that attract recruiters and unlock new opportunities.
                        </p>

                        <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={index} className="text-center">
                                        <div className="stat-icon w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 backdrop-blur-sm">
                                            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                        </div>
                                        <div className="stat-value text-xl sm:text-2xl lg:text-3xl font-bold mb-1">{stat.value}</div>
                                        <div className="text-xs sm:text-sm text-blue-200">{stat.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section ref={ctaRef} className="py-12 sm:py-16 lg:py-20 mb-8">
                <div className="text-center">
                    <div
                        ref={ctaBoxRef}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto"
                    >
                        <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-3 sm:mb-4">
                            Ready to Transform Your Profile?
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
                            Start with any of our AI-powered tools and create professional content in minutes.
                        </p>
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            <Sparkles className="w-5 h-5" />
                            <span className="text-sm sm:text-base">Start Building Now</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
