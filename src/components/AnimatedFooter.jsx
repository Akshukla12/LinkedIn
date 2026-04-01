import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const BLUE  = '#0A66C2';
const FOOTER_BG = '#0D2137';

const navLinks = [
  { name:'Headline',  path:'/headline'  },
  { name:'About Me',  path:'/about'     },
  { name:'Skills',    path:'/skills'    },
  { name:'Job Match', path:'/job-match' },
];

const AnimatedFooter = () => (
  <footer role="contentinfo" aria-label="Site footer" className="relative mt-auto" style={{ background:FOOTER_BG }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

        {/* Logo + nav */}
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
          <Link to="/" aria-label="LinkedIn Builder home" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105"
              style={{ background:BLUE }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color:'#FFFFFF' }} strokeWidth={2.5} />
            </div>
            <span className="font-sans font-bold text-sm" style={{ color:'#FFFFFF', letterSpacing:'-0.01em' }}>
              LinkedIn <span style={{ color:'#60A5FA' }}>Builder</span>
            </span>
          </Link>

          <div className="hidden sm:block w-px h-4" style={{ background:'#1E293B' }} aria-hidden="true" />

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1" role="list">
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-xs font-medium transition-colors duration-150" style={{ color:'#64748B' }}
                    onMouseEnter={e=>e.currentTarget.style.color='#FFFFFF'}
                    onMouseLeave={e=>e.currentTarget.style.color='#64748B'}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          <p className="text-[11px] text-center sm:text-right" style={{ color:'#334155' }}>
            © {new Date().getFullYear()} LinkedIn Builder · <span>Not affiliated with LinkedIn Corporation</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default AnimatedFooter;
