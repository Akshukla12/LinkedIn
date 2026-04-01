import React, { useState } from 'react';
import { Award, Sparkles, X, Lightbulb, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ToolPageLayout from '../components/ToolPageLayout';
import { callGemini } from '../utils/geminiAI';

const PROMPT_TEMPLATE = (role, industry) => `
You are a LinkedIn profile optimization expert.

For a ${role} in the ${industry} industry, generate a comprehensive list of relevant skills organized into 3 categories.

Return ONLY valid JSON in this exact format (no markdown, no extra text):
{
  "technical": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "soft": ["skill1", "skill2", "skill3", "skill4"],
  "industry": ["skill1", "skill2", "skill3", "skill4", "skill5"]
}

Rules:
- "technical" = hard/technical skills specific to the role (tools, languages, frameworks, methodologies)
- "soft" = interpersonal and professional competencies
- "industry" = domain knowledge and industry-specific expertise
- Each skill: 1–4 words, professional, LinkedIn-searchable
- No duplicates across categories
- Total: 13–18 skills
`.trim();

/* Shared light input style */
const INPUT = {
  width: '100%', padding: '0.6875rem 0.875rem',
  background: '#FFFFFF', color: '#050B16',
  border: '1.5px solid #E2E8F0', borderRadius: '0.625rem',
  fontFamily: '"DM Sans", sans-serif', fontSize: '0.9375rem',
  outline: 'none', transition: 'border-color 200ms ease, box-shadow 200ms ease',
};
const onFocus = (e) => { e.target.style.borderColor = '#0A66C2'; e.target.style.boxShadow = '0 0 0 3px rgba(10,102,194,0.1)'; };
const onBlur  = (e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; };

/* Category colors — works on white bg */
const CATS = [
  { key:'technical', label:'Technical',         bg:'#EFF6FF', border:'#BFDBFE', text:'#1D4ED8', selBg:'#0A66C2', selText:'#FFFFFF' },
  { key:'soft',      label:'Soft Skills',       bg:'#F5F3FF', border:'#DDD6FE', text:'#7C3AED', selBg:'#7C3AED', selText:'#FFFFFF' },
  { key:'industry',  label:'Industry-Specific', bg:'#ECFDF5', border:'#A7F3D0', text:'#059669', selBg:'#059669', selText:'#FFFFFF' },
];

function Skills() {
  const [role,      setRole]      = useState('');
  const [industry,  setIndustry]  = useState('');
  const [skills,    setSkills]    = useState(null);
  const [selected,  setSelected]  = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error,     setError]     = useState(null);
  const [copied,    setCopied]    = useState(false);

  const allFilled = role.trim() && industry.trim();

  const handleGenerate = async () => {
    if (!allFilled) return;
    setIsLoading(true); setError(null); setSkills(null); setSelected(new Set());
    try {
      const { response } = await callGemini(PROMPT_TEMPLATE(role.trim(), industry.trim()));
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Unexpected response format. Please try again.');
      const parsed = JSON.parse(jsonMatch[0]);
      if (!parsed.technical || !parsed.soft || !parsed.industry) throw new Error('Incomplete skills data. Please try again.');
      setSkills(parsed);
      setSelected(new Set([...parsed.technical, ...parsed.soft, ...parsed.industry]));
    } catch (err) {
      setError(err.message || 'Failed to generate skills. Please try again.');
    } finally { setIsLoading(false); }
  };

  const toggleSkill = (skill) => setSelected(prev => { const n = new Set(prev); n.has(skill) ? n.delete(skill) : n.add(skill); return n; });

  const handleCopy = async () => {
    if (!selected.size) return;
    await navigator.clipboard.writeText([...selected].join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <ToolPageLayout
      icon={Award}
      title="Skills Generator"
      subtitle="Discover the most relevant skills for your role and industry — then cherry-pick the ones that fit."
      leftPanel={
        <div className="space-y-4">
          {/* Tip */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl text-sm" style={{ background:'#EFF6FF', border:'1px solid #BFDBFE' }}>
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color:'#0A66C2' }} />
            <p className="leading-relaxed" style={{ color:'#374151' }}>
              <strong className="font-semibold" style={{ color:'#050B16' }}>Tip:</strong>{' '}
              Be specific with your role title — "Frontend Engineer" is much better than just "Developer".
            </p>
          </div>

          {/* Role */}
          <div>
            <label htmlFor="skill-role" className="block text-sm font-semibold mb-1.5" style={{ color:'#050B16' }}>
              Your Job Title / Role <span style={{ color:'#0A66C2' }}>*</span>
            </label>
            <input id="skill-role" type="text" required
              placeholder="e.g. Frontend Engineer, Data Analyst, Product Manager"
              style={INPUT} value={role}
              onChange={e => setRole(e.target.value)}
              onFocus={onFocus} onBlur={onBlur} />
          </div>

          {/* Industry */}
          <div>
            <label htmlFor="skill-industry" className="block text-sm font-semibold mb-1.5" style={{ color:'#050B16' }}>
              Industry / Sector <span style={{ color:'#0A66C2' }}>*</span>
            </label>
            <input id="skill-industry" type="text" required
              placeholder="e.g. FinTech, Healthcare, E-Commerce, SaaS"
              style={INPUT} value={industry}
              onChange={e => setIndustry(e.target.value)}
              onFocus={onFocus} onBlur={onBlur} />
          </div>

          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

          {/* Submit */}
          <button id="skills-generate-btn" onClick={handleGenerate} disabled={!allFilled || isLoading}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={allFilled && !isLoading
              ? { background:'#0A66C2', color:'#FFFFFF', cursor:'pointer' }
              : isLoading
              ? { background:'#0A66C2', color:'#FFFFFF', opacity:0.8, cursor:'wait' }
              : { background:'#F1F5F9', color:'#9CA3AF', cursor:'not-allowed' }
            }
            onMouseEnter={e => { if (allFilled && !isLoading) { e.currentTarget.style.background='#0D73D4'; e.currentTarget.style.boxShadow='0 8px 24px rgba(10,102,194,0.28)'; } }}
            onMouseLeave={e => { if (allFilled && !isLoading) { e.currentTarget.style.background='#0A66C2'; e.currentTarget.style.boxShadow='none'; } }}
          >
            {isLoading
              ? <><span className="spinner" style={{ borderTopColor:'#FFFFFF', borderColor:'rgba(255,255,255,0.3)' }} /><span>Generating Skills...</span></>
              : <><Sparkles className="w-4 h-4" /><span>Generate Skills</span></>
            }
          </button>
        </div>
      }
      rightPanel={
        <div>
          {/* Skeleton */}
          {isLoading && (
            <div className="space-y-4" aria-busy="true">
              {[1,2,3].map(i => (
                <div key={i}>
                  <div className="skeleton h-4 w-28 rounded mb-3" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length:5 }).map((_,j) => <div key={j} className="skeleton h-7 rounded-full" style={{ width:`${60+j*15}px` }} />)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!isLoading && !skills && (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-dashed" style={{ borderColor:'#E2E8F0' }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center mb-3" style={{ background:'#EFF6FF' }}>
                <Award className="w-5 h-5" style={{ color:'#BFDBFE' }} />
              </div>
              <p className="text-sm max-w-xs" style={{ color:'#9CA3AF' }}>
                Enter your role and industry, then click Generate — you'll get a curated skill set you can select and copy.
              </p>
            </div>
          )}

          {/* Skills output */}
          {!isLoading && skills && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.3 }} className="space-y-5">
              {CATS.map(({ key, label, bg, border, text, selBg, selText }) => (
                <div key={key}>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:text, letterSpacing:'0.1em' }}>
                    {label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                      {skills[key].map((skill, i) => {
                        const isSel = selected.has(skill);
                        return (
                          <motion.button
                            key={skill} id={`skill-tag-${skill.replace(/\s+/g,'-')}`}
                            initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
                            transition={{ delay:i*0.04, duration:0.2 }}
                            onClick={() => toggleSkill(skill)} aria-pressed={isSel}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
                            style={isSel
                              ? { background:selBg, color:selText, border:`1px solid ${selBg}` }
                              : { background:bg, color:text, border:`1px solid ${border}` }
                            }
                          >
                            {skill}
                            {isSel && <X className="w-3 h-3 opacity-60" />}
                          </motion.button>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              ))}

              {/* Copy bar */}
              <div className="sticky bottom-0 pt-4 mt-2" style={{ background:'linear-gradient(0deg, #FFFFFF 70%, transparent)' }}>
                <button id="copy-selected-skills-btn" onClick={handleCopy} disabled={!selected.size}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={selected.size > 0
                    ? copied
                      ? { background:'#ECFDF5', color:'#059669', border:'1px solid #A7F3D0', cursor:'pointer' }
                      : { background:'#0A66C2', color:'#FFFFFF', cursor:'pointer' }
                    : { background:'#F1F5F9', color:'#9CA3AF', cursor:'not-allowed', border:'1px solid #E2E8F0' }
                  }
                >
                  {copied
                    ? <><Check className="w-4 h-4" />Copied {selected.size} Skills!</>
                    : <><Copy className="w-4 h-4" />Copy Selected ({selected.size})</>
                  }
                </button>
              </div>
            </motion.div>
          )}
        </div>
      }
    />
  );
}

export default Skills;
