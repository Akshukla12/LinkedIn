import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User, FileText, Award, ArrowRight, Sparkles, TrendingUp, Users, Zap, Briefcase } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useStaggerFade } from "../hooks/useScrollAnimations";
import {
  MagneticButton,
  TiltCard,
  FloatingIcon,
  AnimatedBadge,
  PulseDot
} from "../components/MicroInteractionComponents";
import FloatingShapes3D from "../components/FloatingShapes3D";
import CustomCursor from "../components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: User,
    title: "About Me Generator",
    description: "Create compelling professional summaries that showcase your expertise and personality.",
    path: "/about",
    color: "from-blue-600 via-blue-500 to-cyan-500",
    badge: "Popular"
  },
  {
    icon: FileText,
    title: "Headline Generator",
    description: "Craft attention-grabbing headlines that make you stand out to recruiters.",
    path: "/headline",
    color: "from-purple-600 via-violet-500 to-pink-500",
    badge: "New"
  },
  {
    icon: Award,
    title: "Skills Generator",
    description: "Identify and list the most relevant skills for your industry and role.",
    path: "/skills",
    color: "from-emerald-600 via-green-500 to-teal-500",
    badge: "Featured"
  },
  {
    icon: Briefcase,
    title: "Job Keyword Matcher",
    description: "Optimize your profile by analyzing it against any job description for keyword alignment.",
    path: "/job-match",
    color: "from-orange-600 via-orange-500 to-rose-500",
    badge: "Pro"
  }
];

const stats = [
  { icon: Users, value: "50K+", label: "Profiles Created" },
  { icon: TrendingUp, value: "98%", label: "Success Rate" },
  { icon: Zap, value: "24/7", label: "Available" },
];

function Home() {
  // Enable smooth scrolling
  useSmoothScroll();
  // useCustomCursor(); // Disabled for now - uncomment to enable custom cursor

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const backgroundRef = useRef(null);

  // Stagger animation for feature cards
  const featuresGridRef = useStaggerFade({ stagger: 0.15, duration: 0.8, y: 60 });

  // Advanced GSAP animations
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Sparkle icon enhanced animation
    const sparkle = hero.querySelector('.sparkle-icon');
    if (sparkle) {
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
      const text = title.textContent;
      const words = text.split(' ');
      title.innerHTML = words
        .map((word) => `<span class="inline-block" style="opacity: 0; transform: translateY(20px);">${word}</span>`)
        .join(' ');

      gsap.to(title.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3,
      });
    }

    // Subtitle fade in
    const subtitle = hero.querySelector('.hero-subtitle');
    if (subtitle) {
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.8,
          ease: 'power3.out',
        }
      );
    }

    // Background pulse animation
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        scale: 1.05,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  // Feature cards hover animations
  useEffect(() => {
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach((card) => {
      const icon = card.querySelector('.feature-icon');
      const arrow = card.querySelector('.feature-arrow');

      card.addEventListener('mouseenter', () => {
        if (icon) {
          gsap.to(icon, {
            scale: 1.15,
            rotation: 5,
            duration: 0.4,
            ease: 'back.out(1.7)',
          });
        }

        if (arrow) {
          gsap.to(arrow, {
            x: 8,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        }

        if (arrow) {
          gsap.to(arrow, {
            x: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });
    });

    return () => {
      cards.forEach((card) => {
        card.replaceWith(card.cloneNode(true));
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
        const statIcons = statsSection.querySelectorAll('.stat-icon');
        gsap.fromTo(statIcons,
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)',
          }
        );

        const statValues = statsSection.querySelectorAll('.stat-value');
        statValues.forEach((stat) => {
          const text = stat.getAttribute('data-value') || stat.textContent;
          const hasPlus = text.includes('+');
          const hasPercent = text.includes('%');
          const hasSlash = text.includes('/');

          if (hasSlash) {
            // For "24/7", just fade in without changing text
            gsap.to(stat, {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'back.out(1.7)',
            });
          } else {
            const number = parseInt(text.replace(/[^0-9]/g, ''));
            if (!isNaN(number)) {
              // Set initial text to 0 and animate to target
              stat.textContent = '0' + (hasPlus ? 'K+' : hasPercent ? '%' : '');
              gsap.to(stat, {
                textContent: number,
                opacity: 1,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: 1 },
                onUpdate: function () {
                  const current = Math.ceil(this.targets()[0].textContent);
                  stat.textContent = current + (hasPlus ? 'K+' : hasPercent ? '%' : '');
                }
              });
            }
          }
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === statsSection) {
          trigger.kill();
        }
      });
    };
  }, []);

  // CTA section animation
  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    gsap.fromTo(
      cta,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cta,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === cta) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* 3D Floating Shapes Background */}
      <FloatingShapes3D />

      {/* Animated background gradient */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-slate-900 dark:to-blue-950 opacity-60"
      />

      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 -z-9 overflow-hidden pointer-events-none">
        {/* Blue Orb - Top Left */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />

        {/* Purple Orb - Top Right */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

        {/* Teal Orb - Bottom Center */}
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-teal-400 to-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        {/* Indigo Orb - Middle Left */}
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-gradient-to-br from-indigo-400 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-3000" />

        {/* Rose Orb - Middle Right */}
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-gradient-to-br from-rose-400 to-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-5000" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 -z-8 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgb(99, 102, 241) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(99, 102, 241) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Radial Gradient Overlays for Depth */}
      <div className="fixed inset-0 -z-7 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-radial from-blue-100/30 via-transparent to-transparent dark:from-blue-900/20" />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-radial from-indigo-100/30 via-transparent to-transparent dark:from-indigo-900/20" />
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="text-center mb-8 sm:mb-12 lg:mb-16 pt-8"
      >
        <div className="relative inline-block mb-4 sm:mb-6">
          <FloatingIcon duration={3} y={15} rotation={10}>
            <div className="sparkle-icon">
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 drop-shadow-lg" />
            </div>
          </FloatingIcon>

          <h2 className="hero-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-4 leading-tight mt-4">
            Elevate Your LinkedIn Profile
          </h2>
        </div>

        <p className="hero-subtitle text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
          Transform your professional presence with AI-powered content generation.
          Create compelling profiles that attract opportunities and showcase your expertise.
        </p>

        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <PulseDot color="green" size="sm" />
          <span className="text-sm text-muted-foreground">AI-Powered & Ready</span>
        </div>
      </div>

      {/* Features Grid */}
      <div ref={featuresGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <TiltCard
              key={feature.path}
              maxTilt={8}
              className="feature-card group h-full relative overflow-hidden"
            >
              <Link
                to={feature.path}
                className="block h-full"
              >
                {/* Badge */}
                {feature.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <AnimatedBadge color={index === 0 ? 'blue' : index === 1 ? 'purple' : index === 2 ? 'green' : 'red'}>
                      {feature.badge}
                    </AnimatedBadge>
                  </div>
                )}

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
            </TiltCard>
          );
        })}
      </div>

      {/* Stats Section */}
      <div
        ref={statsRef}
        className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white text-center shadow-2xl relative overflow-hidden mb-8 sm:mb-12 lg:mb-16 border border-white/10"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
        </div>

        <div className="relative z-10">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6">
            Join Thousands of Professionals
          </h3>
          <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered tools have helped professionals create standout LinkedIn profiles
            that attract recruiters and unlock new opportunities.
          </p>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <FloatingIcon duration={2 + index * 0.5} y={8} delay={index * 0.2}>
                    <div className="stat-icon w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 backdrop-blur-sm opacity-0">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </FloatingIcon>
                  <div className="stat-value text-xl sm:text-2xl lg:text-3xl font-bold mb-1 opacity-0" data-value={stat.value}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div
        ref={ctaRef}
        className="text-center mb-8"
      >
        <TiltCard maxTilt={5} className="max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-3 sm:mb-4">
            Ready to Transform Your Profile?
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
            Start with any of our AI-powered tools and create professional content in minutes.
          </p>

          <Link to="/about">
            <MagneticButton strength={0.4}>
              <Sparkles className="w-5 h-5" />
              <span className="text-sm sm:text-base">Start Building Now</span>
            </MagneticButton>
          </Link>
        </TiltCard>
      </div>
    </div>
  );
}

export default Home;