# Advanced Scroll Animations - Documentation

## 🎨 Overview

This project features advanced scroll-triggered animations inspired by **Zentry.com**, built with:
- **GSAP** (GreenSock Animation Platform)
- **ScrollTrigger** for scroll-based animations
- **Lenis** for buttery-smooth inertia scrolling
- **React** + **Tailwind CSS**

## 🚀 Features

### 1. **Smooth Scroll with Inertia**
- Implemented using Lenis for natural, physics-based scrolling
- Synced with GSAP ScrollTrigger for perfect timing
- Customizable easing and duration

### 2. **Scroll-Triggered Animations**
- **Fade In/Up**: Elements fade and slide into view
- **Parallax**: Different scroll speeds create depth
- **Scale**: Elements scale on scroll
- **Stagger**: Sequential animations for lists/grids
- **Reveal**: Clip-path reveal effects
- **Horizontal Scroll**: Scroll horizontally on vertical scroll

### 3. **Component-Specific Animations**

#### Hero Section
- Title word-by-word reveal
- Sparkle icon rotation and scale
- Subtle background pulse
- Parallax background shapes

#### Feature Cards
- Stagger fade-in animation
- Icon scale and rotation on hover
- Arrow slide animation
- Card lift on hover

#### Comparison Table
- Sequential row animations
- Cell stagger effects
- Highlighted row with pulsing glow
- Icon animations on hover
- Badge elastic entrance

#### Horizontal Scroll Section (MetaSpaces)
- Vertical scroll triggers horizontal movement
- Card fade-in with parallax
- Image scale (1.05) on hover
- Overlay text emphasis
- Progress indicator

#### Footer
- Fade-in on scroll
- Social icons scale/rotate (360°) on hover
- Newsletter input/button slide-in
- Floating heart animation
- Scroll-to-top button

## 📁 Project Structure

```
src/
├── hooks/
│   ├── useSmoothScroll.js          # Lenis smooth scroll setup
│   └── useScrollAnimations.js      # Reusable animation hooks
├── components/
│   ├── AnimatedFooter.jsx          # Footer with animations
│   ├── HorizontalScrollSection.jsx # Horizontal scroll component
│   └── AnimatedComparisonTable.jsx # Animated table component
└── pages/
    ├── HomeAnimated.jsx            # Enhanced home page
    └── AnimationShowcase.jsx       # Full demo page
```

## 🎯 Usage

### 1. Basic Setup

First, initialize smooth scrolling in your main component:

\`\`\`jsx
import { useSmoothScroll } from '../hooks/useSmoothScroll';

function MyPage() {
  useSmoothScroll(); // Initialize smooth scroll
  
  return (
    <div>
      {/* Your content */}
    </div>
  );
}
\`\`\`

### 2. Using Animation Hooks

#### Fade In Up Animation

\`\`\`jsx
import { useFadeInUp } from '../hooks/useScrollAnimations';

function MyComponent() {
  const titleRef = useFadeInUp({ 
    delay: 0.2, 
    duration: 1,
    y: 60 
  });

  return (
    <h1 ref={titleRef}>
      This will fade in from bottom
    </h1>
  );
}
\`\`\`

#### Stagger Animation for Lists

\`\`\`jsx
import { useStaggerFade } from '../hooks/useScrollAnimations';

function MyList() {
  const listRef = useStaggerFade({ 
    stagger: 0.15, 
    duration: 0.8 
  });

  return (
    <div ref={listRef}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>
  );
}
\`\`\`

#### Parallax Effect

\`\`\`jsx
import { useParallax } from '../hooks/useScrollAnimations';

function MyComponent() {
  const parallaxRef = useParallax({ speed: 0.3 });

  return (
    <div ref={parallaxRef}>
      This element will move slower than scroll
    </div>
  );
}
\`\`\`

#### Horizontal Scroll

\`\`\`jsx
import { useHorizontalScroll } from '../hooks/useScrollAnimations';

function MyComponent() {
  const { containerRef, scrollRef } = useHorizontalScroll({ 
    speed: 1,
    pin: true 
  });

  return (
    <div ref={containerRef}>
      <div ref={scrollRef} className="flex gap-6">
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
      </div>
    </div>
  );
}
\`\`\`

### 3. Using Pre-built Components

#### Horizontal Scroll Section

\`\`\`jsx
import HorizontalScrollSection from '../components/HorizontalScrollSection';

const items = [
  {
    title: 'Item 1',
    description: 'Description here',
    image: 'https://...',
    badge: 'New'
  },
  // ... more items
];

<HorizontalScrollSection
  title="Explore Spaces"
  subtitle="Discover amazing content"
  items={items}
/>
\`\`\`

#### Animated Comparison Table

\`\`\`jsx
import AnimatedComparisonTable from '../components/AnimatedComparisonTable';

const data = {
  headers: ['Feature', 'Basic', 'Pro'],
  rows: [
    {
      cells: [
        { value: 'Feature 1', type: 'text' },
        { value: true, type: 'boolean' },
        { value: true, type: 'boolean' },
      ],
      highlighted: true // Optional
    },
  ],
};

<AnimatedComparisonTable
  title="Compare Plans"
  subtitle="Find the right fit"
  data={data}
/>
\`\`\`

#### Animated Footer

\`\`\`jsx
import AnimatedFooter from '../components/AnimatedFooter';

<AnimatedFooter />
\`\`\`

## 🎨 Animation Options

### Common Options for All Hooks

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `duration` | number | 0.8 | Animation duration in seconds |
| `delay` | number | 0 | Delay before animation starts |
| `start` | string | 'top 85%' | ScrollTrigger start position |
| `markers` | boolean | false | Show ScrollTrigger markers (debug) |

### Specific Options

#### useFadeInUp
- `y`: Distance to move (default: 60)
- `stagger`: Delay between children (default: 0)
- `children`: Animate children instead of element

#### useParallax
- `speed`: Parallax speed multiplier (default: 0.5)
- `end`: ScrollTrigger end position

#### useScaleOnScroll
- `from`: Starting scale (default: 0.8)
- `to`: Ending scale (default: 1)

#### useHorizontalScroll
- `speed`: Scroll speed (default: 1)
- `pin`: Pin container during scroll (default: true)

## 🎭 Custom Animations with GSAP

You can create custom animations using GSAP directly:

\`\`\`jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function MyComponent() {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
          markers: false,
        },
      }
    );
  }, []);

  return <div ref={elementRef}>Custom animation</div>;
}
\`\`\`

## 🎯 Best Practices

1. **Performance**
   - Use `scrub` for smooth scroll-linked animations
   - Avoid animating too many elements simultaneously
   - Use `will-change` CSS property sparingly

2. **Accessibility**
   - Respect `prefers-reduced-motion` media query
   - Ensure content is accessible without animations
   - Don't rely solely on animations to convey information

3. **Timing**
   - Keep animations subtle and fast (0.3-1s)
   - Use appropriate easing functions
   - Stagger delays should be 0.1-0.2s

4. **Cleanup**
   - Always kill ScrollTriggers in useEffect cleanup
   - Remove event listeners properly

## 🐛 Debugging

Enable ScrollTrigger markers to visualize trigger points:

\`\`\`jsx
const ref = useFadeInUp({ markers: true });
\`\`\`

Or globally:

\`\`\`jsx
ScrollTrigger.defaults({ markers: true });
\`\`\`

## 📱 Responsive Considerations

- Disable smooth scroll on touch devices for better performance
- Adjust animation distances for mobile
- Consider disabling horizontal scroll on mobile
- Test on various screen sizes

## 🎨 Customization

### Modify Lenis Settings

Edit `src/hooks/useSmoothScroll.js`:

\`\`\`jsx
const lenis = new Lenis({
  duration: 1.5,        // Slower scroll
  easing: (t) => t,     // Linear easing
  smooth: true,
});
\`\`\`

### Adjust Default Animation Values

Edit individual hooks in `src/hooks/useScrollAnimations.js`

## 🚀 View the Demo

Navigate to `/animations` to see all animations in action!

\`\`\`
http://localhost:5173/animations
\`\`\`

## 📦 Dependencies

\`\`\`json
{
  "gsap": "^3.12.0",
  "@studio-freight/lenis": "^1.0.0",
  "react": "^18.2.0",
  "tailwindcss": "^3.4.1"
}
\`\`\`

## 🎓 Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Lenis GitHub](https://github.com/studio-freight/lenis)
- [Zentry.com](https://zentry.com) - Inspiration

---

**Made with ❤️ using GSAP, ScrollTrigger, and Lenis**
