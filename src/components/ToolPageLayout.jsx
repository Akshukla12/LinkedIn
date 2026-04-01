import React from 'react';
import { motion } from 'framer-motion';

const BLUE = '#0A66C2';
const NAVY = '#050B16';

const ToolPageLayout = ({ icon: Icon, title, subtitle, leftPanel, rightPanel, singleColumn = false }) => {
  return (
    <div className="min-h-[calc(100dvh-4rem)] relative">
      <div className="amber-accent-bar" />
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] opacity-25"
        style={{ background:'radial-gradient(ellipse at center, rgba(10,102,194,0.12) 0%, transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, ease:[0.16,1,0.3,1] }} className="mb-10">
          <div className="flex items-center gap-3.5 mb-3">
            {Icon && (
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background:'#EFF6FF', border:'1px solid #BFDBFE' }}>
                <Icon className="w-5 h-5" style={{ color:BLUE }} />
              </div>
            )}
            <h1 className="font-sans font-bold text-2xl sm:text-3xl" style={{ color:NAVY, letterSpacing:'-0.025em' }}>
              {title}
            </h1>
          </div>
          {subtitle && <p className="text-[0.9375rem] leading-relaxed max-w-xl" style={{ color:'#6B7280' }}>{subtitle}</p>}
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Content */}
        {singleColumn ? (
          <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.1 }}>
            {leftPanel}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            <motion.div initial={{ opacity:0, x:-14 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.4, delay:0.1, ease:[0.16,1,0.3,1] }}>
              <div className="card-white p-6">{leftPanel}</div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:14 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.4, delay:0.18, ease:[0.16,1,0.3,1] }}>
              <div className="card-white p-6" style={{ minHeight:'300px' }}>{rightPanel}</div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolPageLayout;
