# 🎬 Quick Start Guide - Advanced Scroll Animations

## ✅ Installation Complete!

All dependencies have been installed:
- ✅ GSAP (GreenSock Animation Platform)
- ✅ ScrollTrigger Plugin
- ✅ Lenis (Smooth Scroll)
- ✅ Spline React (3D backgrounds - optional)

## 🚀 Getting Started

### 1. Start the Development Server

The server is already running! If not, run:

\`\`\`bash
npm run dev
\`\`\`

### 2. View the Animation Showcase

Navigate to: **http://localhost:5173/animations**

This page demonstrates ALL the animations:
- ✨ Smooth scroll with inertia
- 🎯 Fade-in animations
- 🌊 Parallax effects
- 📊 Animated comparison table
- ↔️ Horizontal scroll section
- 🎨 Animated footer
- And much more!

## 📂 What's Been Created

### Hooks (Reusable Animation Logic)

1. **\`src/hooks/useSmoothScroll.js\`**
   - Initializes Lenis smooth scrolling
   - Syncs with GSAP ScrollTrigger
   - Use in any page component

2. **\`src/hooks/useScrollAnimations.js\`**
   - \`useFadeInUp\` - Fade and slide up animation
   - \`useParallax\` - Parallax scroll effect
   - \`useScaleOnScroll\` - Scale elements on scroll
   - \`useHorizontalScroll\` - Horizontal scroll on vertical scroll
   - \`useStaggerFade\` - Stagger animation for lists
   - \`useReveal\` - Clip-path reveal effect

### Components

1. **\`src/components/HorizontalScrollSection.jsx\`**
   - Horizontal scrolling cards
   - Triggered by vertical scroll
   - Image scale on hover
   - Progress indicator

2. **\`src/components/AnimatedComparisonTable.jsx\`**
   - Sequential row animations
   - Cell stagger effects
   - Highlighted row with glow
   - Icon animations

3. **\`src/components/AnimatedFooter.jsx\`**
   - Scroll-triggered fade-in
   - Social icon animations
   - Newsletter form
   - Scroll-to-top button

### Pages

1. **\`src/pages/AnimationShowcase.jsx\`**
   - Complete demo of all animations
   - Hero section with floating orbs
   - Features grid
   - All components integrated

2. **\`src/pages/HomeAnimated.jsx\`**
   - Enhanced version of Home page
   - All scroll animations applied
   - Ready to use as replacement

### Utilities

1. **\`src/utils/animationUtils.js\`**
   - Accessibility helpers
   - Reduced motion detection
   - Animation config helpers

## 🎯 How to Apply to Your Pages

### Option 1: Use the Enhanced Home Page

Replace your current Home page with the animated version:

\`\`\`jsx
// In App.jsx
import HomeAnimated from "./pages/HomeAnimated";

// Replace
<Route path="/" element={<Home />} />
// With
<Route path="/" element={<HomeAnimated />} />
\`\`\`

### Option 2: Add Animations to Existing Pages

1. **Add smooth scroll to any page:**

\`\`\`jsx
import { useSmoothScroll } from '../hooks/useSmoothScroll';

function MyPage() {
  useSmoothScroll(); // Add this line
  
  return (
    // Your existing content
  );
}
\`\`\`

2. **Add fade-in animation to sections:**

\`\`\`jsx
import { useFadeInUp } from '../hooks/useScrollAnimations';

function MyPage() {
  const sectionRef = useFadeInUp({ duration: 1, delay: 0.2 });
  
  return (
    <section ref={sectionRef}>
      {/* This section will fade in from bottom */}
    </section>
  );
}
\`\`\`

3. **Add stagger animation to cards:**

\`\`\`jsx
import { useStaggerFade } from '../hooks/useScrollAnimations';

function MyPage() {
  const cardsRef = useStaggerFade({ stagger: 0.15 });
  
  return (
    <div ref={cardsRef}>
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
      {/* Each card will appear with a stagger delay */}
    </div>
  );
}
\`\`\`

## 🎨 Customization Examples

### Change Smooth Scroll Speed

Edit \`src/hooks/useSmoothScroll.js\`:

\`\`\`jsx
const lenis = new Lenis({
  duration: 1.5,  // Change from 1.2 to 1.5 for slower scroll
  // ... other settings
});
\`\`\`

### Adjust Animation Timing

\`\`\`jsx
const ref = useFadeInUp({ 
  duration: 1.5,  // Slower animation
  delay: 0.5,     // Wait before starting
  y: 100          // Slide from further down
});
\`\`\`

### Add Parallax to Background

\`\`\`jsx
import { useParallax } from '../hooks/useScrollAnimations';

function MyPage() {
  const bgRef = useParallax({ speed: 0.5 });
  
  return (
    <div ref={bgRef} className="background-element">
      {/* This will move slower than scroll */}
    </div>
  );
}
\`\`\`

## 🎭 Pre-built Sections You Can Use

### 1. Horizontal Scroll Section

\`\`\`jsx
import HorizontalScrollSection from '../components/HorizontalScrollSection';

const items = [
  {
    title: 'Feature 1',
    description: 'Description here',
    image: 'https://...',
    badge: 'New'
  },
  // Add more items
];

<HorizontalScrollSection
  title="Explore Features"
  subtitle="Scroll to discover more"
  items={items}
/>
\`\`\`

### 2. Animated Table

\`\`\`jsx
import AnimatedComparisonTable from '../components/AnimatedComparisonTable';

const data = {
  headers: ['Feature', 'Basic', 'Pro'],
  rows: [
    {
      cells: [
        { value: 'AI Generation', type: 'text' },
        { value: true, type: 'boolean' },
        { value: true, type: 'boolean' },
      ],
    },
  ],
};

<AnimatedComparisonTable
  title="Compare Plans"
  data={data}
/>
\`\`\`

### 3. Animated Footer

\`\`\`jsx
import AnimatedFooter from '../components/AnimatedFooter';

// At the bottom of your page
<AnimatedFooter />
\`\`\`

## 🐛 Troubleshooting

### Animations not working?

1. **Check if GSAP is registered:**
   \`\`\`jsx
   import { gsap } from 'gsap';
   import { ScrollTrigger } from 'gsap/ScrollTrigger';
   
   gsap.registerPlugin(ScrollTrigger);
   \`\`\`

2. **Enable debug markers:**
   \`\`\`jsx
   const ref = useFadeInUp({ markers: true });
   \`\`\`

3. **Check console for errors**

### Smooth scroll not smooth?

- Lenis is disabled on touch devices by default (for performance)
- Check if \`useSmoothScroll()\` is called in your component

### Performance issues?

- Reduce number of animated elements
- Increase stagger delays
- Use \`scrub\` for scroll-linked animations
- Disable smooth scroll on mobile

## 📱 Mobile Considerations

The animations are responsive, but you may want to:

1. **Disable horizontal scroll on mobile:**
   \`\`\`jsx
   const isMobile = window.innerWidth < 768;
   
   {!isMobile && (
     <HorizontalScrollSection items={items} />
   )}
   \`\`\`

2. **Reduce animation distances on mobile:**
   \`\`\`jsx
   const isMobile = window.innerWidth < 768;
   const ref = useFadeInUp({ 
     y: isMobile ? 30 : 60 
   });
   \`\`\`

## 🎓 Next Steps

1. ✅ View the demo at **/animations**
2. ✅ Read the full documentation in **ANIMATIONS_README.md**
3. ✅ Apply animations to your existing pages
4. ✅ Customize timing and easing to match your brand
5. ✅ Test on different devices and browsers

## 🎨 Color Theme

The animations work with your existing Tailwind theme:
- White/dark gray base colors
- Primary color accents
- Smooth gradients
- Glassmorphism effects

All animations respect your color scheme automatically!

## 📚 Resources

- Full Documentation: \`ANIMATIONS_README.md\`
- GSAP Docs: https://greensock.com/docs/
- ScrollTrigger: https://greensock.com/scrolltrigger/
- Lenis: https://github.com/studio-freight/lenis

---

**🎉 You're all set! Navigate to /animations to see everything in action!**
