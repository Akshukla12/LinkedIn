import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  User, FileText, Award, Briefcase,
  ArrowRight, Sparkles, Zap, TrendingUp,
  CheckCircle2, ChevronRight
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

/* ── Color constants ── */
const BLUE  = '#0A66C2';
const BLUE_HOVER = '#0D73D4';
const NAVY  = '#050B16';

/* ── DATA ── */
const tools = [
  { id:'about',     icon:User,     title:'About Me Generator',   desc:'Craft a compelling professional summary that showcases your expertise and draws recruiters in.',                              path:'/about',     badge:'Most Popular', large:true,  dark:false },
  { id:'headline',  icon:FileText, title:'Headline Generator',    desc:'Create punchy, keyword-rich headlines that stand out in search results.',                                                    path:'/headline',  badge:'New',          large:false, dark:true  },
  { id:'skills',    icon:Award,    title:'Skills Generator',      desc:'Identify the most relevant skills for your role and industry in seconds.',                                                   path:'/skills',    badge:'Featured',     large:false, dark:true  },
  { id:'job-match', icon:Briefcase,title:'Job Keyword Matcher',   desc:'Align your profile with any job description to maximize recruiter visibility and ATS scores.',                               path:'/job-match', badge:'Pro',           large:true,  dark:false },
];

const stats = [
  { value:'10K+',  label:'Profiles Optimized', icon:TrendingUp  },
  { value:'98%',   label:'Success Rate',        icon:CheckCircle2},
  { value:'< 30s', label:'Generation Time',     icon:Zap         },
];

const steps = [
  { n:'01', title:'Describe Yourself', desc:'Tell us your role, key skills, and what makes you unique in a few sentences.'                              },
  { n:'02', title:'AI Generates',      desc:'Gemini AI creates tailored, professional content optimised for LinkedIn recruiters.'                        },
  { n:'03', title:'Copy & Publish',    desc:'Review, refine, and paste directly into your LinkedIn profile — done in under 60 seconds.'                 },
];

/* ── Bento Card ── */
const BentoCard = ({ tool, index }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  const Icon   = tool.icon;

  /* Alternating: large cards = LinkedIn blue, small cards = navy */
  const bg       = tool.dark ? NAVY  : BLUE;
  const hoverShadow = tool.dark
    ? '0 12px 40px rgba(5,11,22,0.35)'
    : '0 12px 40px rgba(10,102,194,0.35)';
  const baseShadow  = tool.dark
    ? '0 4px 20px rgba(5,11,22,0.2)'
    : '0 4px 20px rgba(10,102,194,0.22)';

  return (
    <motion.div ref={ref} initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.5, delay:index*0.08, ease:[0.16,1,0.3,1] }}>
      <Link
        to={tool.path}
        id={`tool-card-${tool.id}`}
        aria-label={`Open ${tool.title}`}
        className="group flex flex-col h-full rounded-2xl p-6 relative overflow-hidden transition-all duration-300 cursor-pointer"
        style={{ background:bg, minHeight:tool.large ? '210px' : '180px', boxShadow:baseShadow }}
        onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=hoverShadow; }}
        onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)';    e.currentTarget.style.boxShadow=baseShadow;  }}
      >
        {/* Badge */}
        {tool.badge && (
          <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background:'rgba(255,255,255,0.14)', color:'rgba(255,255,255,0.75)' }}>
            {tool.badge}
          </span>
        )}

        {/* Icon */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background:'rgba(255,255,255,0.14)' }}>
          <Icon className="w-5 h-5" style={{ color:'#FFFFFF' }} />
        </div>

        <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color:'rgba(255,255,255,0.5)', letterSpacing:'0.1em' }}>
          AI Tool
        </p>
        <h2 className="font-sans font-bold text-[1.125rem] mb-2" style={{ color:'#FFFFFF', letterSpacing:'-0.02em', lineHeight:'1.2' }}>
          {tool.title}
        </h2>
        <p className="text-sm leading-relaxed flex-1" style={{ color:'rgba(255,255,255,0.65)' }}>
          {tool.desc}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-1.5 mt-5 text-sm font-semibold" style={{ color:'rgba(255,255,255,0.9)' }}>
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
        </div>
      </Link>
    </motion.div>
  );
};

/* ── Stats Bar ── */
const StatsBar = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.5 }}
      className="card-white px-6 py-6 flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-0 my-12">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="flex items-center gap-2 mb-0.5">
                <Icon className="w-4 h-4" style={{ color:BLUE }} />
                <span className="stat-value">{s.value}</span>
              </div>
              <span className="text-xs font-medium" style={{ color:'#6B7280' }}>{s.label}</span>
            </div>
            {i < stats.length-1 && <div className="hidden sm:block w-px h-10" style={{ background:'#E2E8F0' }} />}
          </React.Fragment>
        );
      })}
    </motion.div>
  );
};

/* ── How It Works ── */
const HowItWorks = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  return (
    <section ref={ref} aria-labelledby="how-it-works-heading" className="mb-20">
      <motion.div initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.4 }} className="text-center mb-10">
        <div className="kicker inline-flex mx-auto mb-4"><Zap className="w-3 h-3" /> How It Works</div>
        <h2 id="how-it-works-heading" className="font-sans font-bold text-2xl sm:text-3xl" style={{ color:NAVY, letterSpacing:'-0.025em' }}>
          Three steps to a standout profile
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
        <div aria-hidden="true" className="hidden sm:block absolute top-8 left-[16.667%] right-[16.667%] h-px" style={{ background:'linear-gradient(90deg, transparent, #E2E8F0 20%, #E2E8F0 80%, transparent)' }} />
        {steps.map((step, i) => (
          <motion.div key={i} initial={{ opacity:0, y:24 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.45, delay:i*0.1+0.1, ease:[0.16,1,0.3,1] }}
            className="card-white flex flex-col items-center text-center px-6 py-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 z-10 font-mono text-sm font-bold"
              style={{ background:'#EFF6FF', border:`2px solid #BFDBFE`, color:BLUE }}>
              {step.n}
            </div>
            <h3 className="font-sans font-bold text-base mb-2" style={{ color:NAVY, letterSpacing:'-0.01em' }}>{step.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color:'#6B7280' }}>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ── HOME PAGE ── */
function Home() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* ── HERO ── */}
      <section aria-labelledby="hero-heading" className="relative text-center pt-16 sm:pt-24 pb-10">
        <motion.h1 id="hero-heading" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.1, ease:[0.16,1,0.3,1] }}
          className="mx-auto max-w-4xl px-2 mb-6"
          style={{ fontSize:'clamp(2.125rem, 6vw, 4rem)', lineHeight:1.1, letterSpacing:'-0.03em' }}>
          <span className="block font-sans font-bold" style={{ color:NAVY }}>
            Grow your career with
          </span>
          <span className="block font-display italic"
            style={{ fontFamily:'"Instrument Serif", Georgia, serif', color:BLUE, fontWeight:400 }}>
            AI-Driven Profile Building.
          </span>
        </motion.h1>

        <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
          className="mx-auto max-w-xl mb-9 leading-relaxed" style={{ fontSize:'1.0625rem', color:'#6B7280' }}>
          Transform your professional presence with AI. Generate compelling summaries,
          headlines, and skills that attract recruiters and open doors.
        </motion.p>

        <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45, delay:0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Link to="/about" id="hero-primary-cta" className="btn-primary text-base px-7 py-3.5 rounded-xl">
            <Sparkles className="w-4 h-4" /> Start Building Free <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#how-it-works" id="hero-secondary-cta" className="btn-outline text-[0.9375rem] px-5 py-3.5 rounded-xl">
            See how it works <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>

      </section>

      {/* ── STATS ── */}
      <StatsBar />

      {/* ── BENTO GRID ── */}
      <section aria-labelledby="tools-heading" className="mb-20">
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.4 }}
          className="flex items-baseline justify-between mb-6">
          <h2 id="tools-heading" className="font-sans font-bold text-xl" style={{ color:NAVY, letterSpacing:'-0.02em' }}>Pick your tool</h2>
          <span className="text-xs font-medium" style={{ color:'#9CA3AF' }}>4 AI-powered generators</span>
        </motion.div>

        <div className="grid gap-3" style={{ gridTemplateColumns:'repeat(3, 1fr)', gridTemplateAreas:`"about about headline" "skills job-match job-match"` }}>
          {tools.map((tool, i) => (
            <div key={tool.id} style={{ gridArea:tool.id }}>
              <BentoCard tool={tool} index={i} />
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 1023px) {
            [style*="grid-template-areas"] { grid-template-columns:1fr !important; grid-template-areas:none !important; }
            [style*="grid-area"] { grid-area:auto !important; }
          }
        `}</style>
      </section>

      {/* ── HOW IT WORKS ── */}
      <div id="how-it-works"><HowItWorks /></div>

      {/* ── NAVY CTA BANNER ── */}
      <motion.section initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.5 }}
        aria-label="Call to action" className="navy-section px-8 py-14 text-center mb-16">
        <div className="kicker inline-flex mx-auto mb-5"
          style={{ background:'rgba(255,255,255,0.15)', borderColor:'rgba(255,255,255,0.3)', color:'#FFFFFF' }}>
          <Sparkles className="w-3 h-3" /> Ready to stand out?
        </div>
        <h2 className="font-sans font-bold text-3xl sm:text-4xl mb-3" style={{ color:'#FFFFFF', letterSpacing:'-0.025em', lineHeight:1.1 }}>
          Your best profile{' '}
          <span className="font-display italic" style={{ fontFamily:'"Instrument Serif", Georgia, serif', color:'rgba(255,255,255,0.85)', fontWeight:400 }}>
            starts here.
          </span>
        </h2>
        <p className="mb-8 max-w-md mx-auto leading-relaxed" style={{ color:'#94A3B8', fontSize:'0.9375rem' }}>
          Join thousands of professionals who've already upgraded their LinkedIn presence with AI.
        </p>
        <Link to="/about" id="cta-banner-btn" className="btn-primary inline-flex text-base px-8 py-3.5 rounded-xl">
          <Zap className="w-4 h-4" /> Build My Profile Now
        </Link>
      </motion.section>
    </div>
  );
}

export default Home;