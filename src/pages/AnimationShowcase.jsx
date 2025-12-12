import React from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import HorizontalScrollSection from '../components/HorizontalScrollSection';
import AnimatedComparisonTable from '../components/AnimatedComparisonTable';
import AnimatedFooter from '../components/AnimatedFooter';
import { Sparkles, Zap, TrendingUp, Award, Users, Target } from 'lucide-react';

const AnimationShowcase = () => {
    // Initialize smooth scrolling
    useSmoothScroll();

    // Sample data for horizontal scroll section
    const metaSpacesData = [
        {
            title: 'Creative Studio',
            description: 'A vibrant space for designers and artists to collaborate and showcase their work.',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
            badge: 'Popular',
        },
        {
            title: 'Tech Hub',
            description: 'Connect with developers and tech enthusiasts in this innovative workspace.',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
            badge: 'New',
        },
        {
            title: 'Business Lounge',
            description: 'Professional networking space for entrepreneurs and business leaders.',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
        },
        {
            title: 'Learning Center',
            description: 'Educational resources and workshops for continuous professional development.',
            image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
            badge: 'Featured',
        },
        {
            title: 'Innovation Lab',
            description: 'Experimental space for cutting-edge projects and breakthrough ideas.',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
        },
    ];

    // Sample data for comparison table
    const comparisonData = {
        headers: ['Feature', 'Basic', 'Professional', 'Enterprise'],
        rows: [
            {
                cells: [
                    { value: 'AI Content Generation', type: 'text' },
                    { value: true, type: 'boolean' },
                    { value: true, type: 'boolean' },
                    { value: true, type: 'boolean' },
                ],
            },
            {
                cells: [
                    { value: 'Custom Templates', type: 'text' },
                    { value: false, type: 'boolean' },
                    { value: true, type: 'boolean' },
                    { value: true, type: 'boolean' },
                ],
                highlighted: true,
            },
            {
                cells: [
                    { value: 'Advanced Analytics', type: 'text' },
                    { value: false, type: 'boolean' },
                    { value: true, type: 'boolean' },
                    { value: true, type: 'boolean' },
                ],
            },
            {
                cells: [
                    { value: 'Priority Support', type: 'text' },
                    { value: false, type: 'boolean' },
                    { value: false, type: 'boolean' },
                    { value: true, type: 'boolean' },
                ],
            },
            {
                cells: [
                    { value: 'Team Collaboration', type: 'text' },
                    { value: false, type: 'boolean' },
                    { value: false, type: 'boolean' },
                    { value: true, type: 'boolean' },
                ],
            },
            {
                cells: [
                    { value: 'API Access', type: 'text' },
                    { value: false, type: 'boolean' },
                    { value: false, type: 'boolean' },
                    { value: true, type: 'boolean' },
                ],
            },
        ],
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />

                {/* Floating orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Sparkles className="w-12 h-12 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Advanced Scroll Animations
                        </h1>
                    </div>

                    <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                        Experience buttery-smooth scroll interactions powered by GSAP, ScrollTrigger, and Lenis
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            <span className="text-sm font-semibold">Smooth Scroll</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-semibold">Parallax Effects</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg">
                            <Award className="w-5 h-5 text-blue-500" />
                            <span className="text-sm font-semibold">Stagger Animations</span>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                        <div className="flex flex-col items-center gap-2 animate-bounce">
                            <span className="text-sm text-muted-foreground">Scroll to explore</span>
                            <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                            Premium Features
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to create a standout professional profile
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Users, title: 'AI-Powered', description: 'Advanced AI generates professional content tailored to your industry', color: 'from-blue-500 to-blue-600' },
                            { icon: Target, title: 'Keyword Optimization', description: 'Match your profile with job descriptions for better visibility', color: 'from-purple-500 to-purple-600' },
                            { icon: TrendingUp, title: 'Analytics', description: 'Track your profile performance and engagement metrics', color: 'from-green-500 to-green-600' },
                            { icon: Award, title: 'Templates', description: 'Choose from professionally designed templates', color: 'from-orange-500 to-red-500' },
                            { icon: Zap, title: 'Instant Results', description: 'Generate content in seconds, not hours', color: 'from-pink-500 to-rose-600' },
                            { icon: Sparkles, title: 'Premium Quality', description: 'Professional-grade content that stands out', color: 'from-indigo-500 to-purple-600' },
                        ].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Horizontal Scroll Section */}
            <HorizontalScrollSection
                title="Explore MetaSpaces"
                subtitle="Discover unique virtual spaces designed for collaboration and innovation"
                items={metaSpacesData}
            />

            {/* Comparison Table Section */}
            <AnimatedComparisonTable
                title="Choose Your Plan"
                subtitle="Select the perfect plan for your professional growth"
                data={comparisonData}
            />

            {/* Testimonials Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                            What Our Users Say
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Join thousands of satisfied professionals
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Sarah Johnson', role: 'Software Engineer', quote: 'This tool transformed my LinkedIn profile and helped me land my dream job!' },
                            { name: 'Michael Chen', role: 'Product Manager', quote: 'The AI-generated content is incredibly professional and saves me hours of work.' },
                            { name: 'Emily Rodriguez', role: 'Marketing Director', quote: 'Best investment for my career. My profile views increased by 300%!' },
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Sparkles key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                                <div>
                                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <AnimatedFooter />
        </div>
    );
};

export default AnimationShowcase;
