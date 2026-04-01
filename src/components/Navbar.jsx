import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LI_BLUE = '#0A66C2';
const LI_BLUE_TINT = 'rgba(10,102,194,0.08)';
const NAVY = '#050B16';

const navLinks = [
  { name: 'Headline',  path: '/headline'  },
  { name: 'About Me',  path: '/about'     },
  { name: 'Skills',    path: '/skills'    },
  { name: 'Job Match', path: '/job-match' },
];

const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-white ${scrolled ? 'scrolled' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link to="/" aria-label="LinkedIn Builder home" className="flex items-center gap-2.5 group shrink-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105"
                style={{ background: LI_BLUE }}
              >
                <Sparkles className="w-4 h-4" style={{ color: '#FFFFFF' }} strokeWidth={2.5} />
              </div>
              <span className="font-sans font-bold text-[15px]" style={{ color: NAVY, letterSpacing: '-0.01em' }}>
                LinkedIn
                <span className="ml-1" style={{ color: LI_BLUE }}>Builder</span>
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden md:flex items-center gap-1" role="menubar">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  role="menuitem"
                  aria-current={isActive(link.path) ? 'page' : undefined}
                  className="relative px-3.5 py-2 text-sm rounded-lg transition-all duration-150"
                  style={{
                    color:      isActive(link.path) ? LI_BLUE    : '#374151',
                    background: isActive(link.path) ? LI_BLUE_TINT : 'transparent',
                    fontWeight: isActive(link.path) ? 600 : 500,
                  }}
                  onMouseEnter={e => { if (!isActive(link.path)) e.currentTarget.style.color = NAVY; }}
                  onMouseLeave={e => { if (!isActive(link.path)) e.currentTarget.style.color = '#374151'; }}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-1 left-3.5 right-3.5 h-0.5 rounded-full"
                      style={{ background: LI_BLUE }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* ── Desktop Actions ── */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/about" id="navbar-cta" className="btn-primary text-sm">
                Start Free <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* ── Mobile Button ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
              style={{ color: '#374151' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen
                  ? <motion.div key="x"    initial={{ opacity:0, rotate:-90 }} animate={{ opacity:1, rotate:0 }} exit={{ opacity:0, rotate:90 }}  transition={{ duration:0.15 }}><X    className="w-5 h-5" /></motion.div>
                  : <motion.div key="menu" initial={{ opacity:0, rotate:90 }}  animate={{ opacity:1, rotate:0 }} exit={{ opacity:0, rotate:-90 }} transition={{ duration:0.15 }}><Menu className="w-5 h-5" /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity:0, height:0 }}
              animate={{ opacity:1, height:'auto' }}
              exit={{ opacity:0, height:0 }}
              transition={{ duration:0.22, ease:[0.16,1,0.3,1] }}
              className="md:hidden overflow-hidden"
              style={{ background:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)', borderTop:'1px solid #E2E8F0' }}
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div key={link.path} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.05, duration:0.18 }}>
                    <Link
                      to={link.path}
                      aria-current={isActive(link.path) ? 'page' : undefined}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium transition-colors border"
                      style={isActive(link.path)
                        ? { background:'#EFF6FF', color:LI_BLUE, borderColor:'#BFDBFE' }
                        : { color:'#374151', borderColor:'transparent' }
                      }
                    >
                      {link.name}
                      {isActive(link.path) && <div className="w-1.5 h-1.5 rounded-full" style={{ background:LI_BLUE }} />}
                    </Link>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:navLinks.length*0.05+0.05, duration:0.18 }} className="pt-3 mt-1 border-t border-slate-100">
                  <Link to="/about" className="btn-primary w-full justify-center">
                    <Sparkles className="w-4 h-4" /> Start Building Free
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="h-16" aria-hidden="true" />
    </>
  );
};

export default Navbar;
