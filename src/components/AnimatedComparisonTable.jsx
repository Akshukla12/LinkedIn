import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, Star, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AnimatedComparisonTable = ({
    title = 'Feature Comparison',
    subtitle = 'Compare our plans and find the perfect fit for your needs',
    data = {
        headers: ['Feature', 'Basic', 'Pro', 'Enterprise'],
        rows: [
            {
                cells: [
                    { value: 'AI-Powered Generation', type: 'text' },
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
        ],
    }
}) => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const tableRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const table = tableRef.current;
        const titleElement = titleRef.current;

        if (!container || !table) return;

        // Title animation
        if (titleElement) {
            gsap.fromTo(
                titleElement.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: titleElement,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }

        // Table header animation
        const tableHeader = table.querySelector('thead');
        if (tableHeader) {
            gsap.fromTo(
                tableHeader.querySelectorAll('th'),
                { opacity: 0, y: -20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: tableHeader,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }

        // Table rows sequential animation
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            // Row fade and slide in
            gsap.fromTo(
                row,
                {
                    opacity: 0,
                    x: -50,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Cells stagger animation
            const cells = row.querySelectorAll('td');
            gsap.fromTo(
                cells,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    stagger: 0.05,
                    delay: index * 0.1 + 0.2,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Hover animation
            row.addEventListener('mouseenter', () => {
                gsap.to(row, {
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out',
                });

                // Animate icons on hover
                const icons = row.querySelectorAll('.icon-cell svg');
                gsap.to(icons, {
                    scale: 1.2,
                    rotation: 360,
                    duration: 0.5,
                    ease: 'back.out(1.7)',
                });
            });

            row.addEventListener('mouseleave', () => {
                gsap.to(row, {
                    backgroundColor: 'transparent',
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                });

                const icons = row.querySelectorAll('.icon-cell svg');
                gsap.to(icons, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
        });

        // Highlighted row special animation
        const highlightedRow = table.querySelector('.highlighted-row');
        if (highlightedRow) {
            // Pulsing glow effect
            gsap.to(highlightedRow, {
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            // Badge animation
            const badge = highlightedRow.querySelector('.badge');
            if (badge) {
                gsap.fromTo(
                    badge,
                    { scale: 0, rotation: -180 },
                    {
                        scale: 1,
                        rotation: 0,
                        duration: 0.8,
                        delay: 0.5,
                        ease: 'elastic.out(1, 0.5)',
                        scrollTrigger: {
                            trigger: highlightedRow,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === container || trigger.vars.trigger?.closest('.comparison-table')) {
                    trigger.kill();
                }
            });
        };
    }, [data]);

    const renderCell = (value, type = 'text') => {
        if (type === 'boolean') {
            return value ? (
                <Check className="w-5 h-5 text-green-500" />
            ) : (
                <X className="w-5 h-5 text-red-500" />
            );
        }
        return value;
    };

    return (
        <section ref={containerRef} className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div ref={titleRef} className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Zap className="w-6 h-6 text-primary" />
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                            {title}
                        </h2>
                    </div>
                    {subtitle && (
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Comparison Table */}
                <div className="overflow-x-auto rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
                    <table ref={tableRef} className="comparison-table w-full bg-white dark:bg-gray-800">
                        <thead className="bg-gradient-to-r from-primary to-blue-600 text-white">
                            <tr>
                                {data.headers.map((header, index) => (
                                    <th
                                        key={index}
                                        className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {data.rows.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={`transition-all duration-300 ${row.highlighted ? 'highlighted-row relative bg-blue-50/50 dark:bg-blue-900/20' : ''
                                        }`}
                                >
                                    {row.cells.map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className={`px-6 py-4 ${cellIndex === 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'
                                                } ${cell.type === 'boolean' ? 'icon-cell' : ''}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                {renderCell(cell.value, cell.type)}
                                                {row.highlighted && cellIndex === 0 && (
                                                    <span className="badge inline-flex items-center gap-1 px-2 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                                                        <Star className="w-3 h-3" fill="currentColor" />
                                                        Popular
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />
            </div>
        </section>
    );
};

export default AnimatedComparisonTable;
