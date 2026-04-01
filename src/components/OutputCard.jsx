import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RefreshCw, ChevronRight } from 'lucide-react';

const BLUE = '#0A66C2';

const OutputCard = ({ result=null, isLoading=false, onRegenerate=null, label='Generated Result', emptyMessage='Your AI-generated content will appear here.', multiVariant=false }) => {
  const [copied, setCopied]   = useState(null);
  const [hovered, setHovered] = useState(null);

  const handleCopy = async (text, key) => {
    try { await navigator.clipboard.writeText(text); setCopied(key); setTimeout(()=>setCopied(null),2000); } catch(_){}
  };

  if (isLoading) {
    return (
      <div aria-busy="true" aria-label="Generating" className="space-y-3">
        <div className="skeleton h-4 w-32 rounded" />
        <div className="skeleton h-28 rounded-xl" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
      </div>
    );
  }

  if (!result || (Array.isArray(result) && result.length===0)) {
    return (
      <div className="flex flex-col items-center justify-center py-14 px-6 text-center rounded-xl border border-dashed" style={{ borderColor:'#E2E8F0' }}>
        <div className="w-11 h-11 rounded-full flex items-center justify-center mb-3" style={{ background:'#EFF6FF' }}>
          <ChevronRight className="w-5 h-5" style={{ color:'#BFDBFE' }} />
        </div>
        <p className="text-sm leading-relaxed max-w-xs" style={{ color:'#9CA3AF' }}>{emptyMessage}</p>
      </div>
    );
  }

  const variants = Array.isArray(result) ? result : [result];

  if (multiVariant && variants.length > 1) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold" style={{ color:'#050B16' }}>{label}</h3>
          {onRegenerate && (
            <button onClick={onRegenerate} id="output-regenerate-btn" className="flex items-center gap-1.5 text-xs transition-colors" style={{ color:'#9CA3AF' }}
              onMouseEnter={e=>e.currentTarget.style.color=BLUE}
              onMouseLeave={e=>e.currentTarget.style.color='#9CA3AF'}>
              <RefreshCw className="w-3.5 h-3.5" />Regenerate
            </button>
          )}
        </div>

        {variants.map((text, i) => (
          <motion.div key={i} id={`output-variant-${i}`} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08, duration:0.28 }}
            onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}
            className="relative output-card group">
            <span className="text-[10px] font-bold uppercase tracking-widest mb-2 block" style={{ color:BLUE, letterSpacing:'0.1em' }}>
              Option {i+1}
            </span>
            <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color:'#374151' }}>{text}</p>
            <button onClick={()=>handleCopy(text,i)} aria-label={copied===i?'Copied!':`Copy option ${i+1}`} id={`copy-variant-${i}`}
              className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                copied===i ? 'text-green-600 bg-green-50 border-green-200' : 'text-gray-400 hover:text-gray-700 bg-white border-slate-200 opacity-0 group-hover:opacity-100'
              }`}>
              {copied===i ? <><Check className="w-3 h-3" />Copied</> : <><Copy className="w-3 h-3" />Copy</>}
            </button>
          </motion.div>
        ))}

        <button onClick={()=>handleCopy(variants.join('\n\n---\n\n'),'all')} id="copy-all-btn"
          className="w-full flex items-center justify-center gap-2 py-2 text-xs rounded-lg mt-1 transition-colors border border-dashed"
          style={{ borderColor:'#E2E8F0', color:copied==='all'?'#16A34A':'#9CA3AF' }}>
          {copied==='all' ? <><Check className="w-3.5 h-3.5" />All Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy All</>}
        </button>
      </div>
    );
  }

  const text = variants[0];
  return (
    <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.28 }} className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold" style={{ color:'#050B16' }}>{label}</h3>
        <div className="flex items-center gap-2">
          {onRegenerate && (
            <button onClick={onRegenerate} id="output-regenerate-btn" className="flex items-center gap-1.5 text-xs transition-colors" style={{ color:'#9CA3AF' }}
              onMouseEnter={e=>e.currentTarget.style.color=BLUE} onMouseLeave={e=>e.currentTarget.style.color='#9CA3AF'}>
              <RefreshCw className="w-3.5 h-3.5" />Regenerate
            </button>
          )}
          <button onClick={()=>handleCopy(text,0)} id="output-copy-btn"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              copied===0 ? 'bg-green-50 text-green-600 border-green-200' : 'border-slate-200 text-slate-500 hover:text-slate-700 bg-white'
            }`}>
            {copied===0 ? <><Check className="w-3.5 h-3.5" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
          </button>
        </div>
      </div>
      <div className="output-card">
        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color:'#374151' }}>{text}</p>
      </div>
    </motion.div>
  );
};

export default OutputCard;
