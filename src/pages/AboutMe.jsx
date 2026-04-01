import React, { useState } from 'react';
import { User, Sparkles, Lightbulb } from 'lucide-react';
import ToolPageLayout from '../components/ToolPageLayout';
import OutputCard from '../components/OutputCard';
import { callGemini } from '../utils/geminiAI';

const PROMPT_TEMPLATE = ({ role, years, skills, achievement, goal }) => `
You are an expert LinkedIn profile writer.

Generate a compelling LinkedIn "About Me" section for this professional:
- Current Role: ${role}
- Years of Experience: ${years}
- Top Skills: ${skills}
- Key Achievement: ${achievement}
- Career Goal: ${goal}

Guidelines:
- Write in first person, professional but human tone
- 3–4 paragraphs, total around 1,500–2,000 characters (under LinkedIn's 2,600 limit)
- Open with a strong hook (not "I am a...")
- Highlight the achievement naturally
- End with a clear call-to-action or next step
- Use active language, avoid buzzwords like "passionate", "guru", "ninja"
- Do NOT add any labels, headers, or explanations — output the profile text ONLY
`.trim();

const GOALS = [
  { value: 'new-role',     label: 'Land a new role'              },
  { value: 'promotion',   label: 'Get promoted'                  },
  { value: 'networking',  label: 'Expand my network'             },
  { value: 'freelance',   label: 'Attract freelance clients'     },
  { value: 'thought-lead',label: 'Establish thought leadership'  },
];

/* Shared input style — light theme */
const INPUT = {
  width: '100%', padding: '0.6875rem 0.875rem',
  background: '#FFFFFF', color: '#050B16',
  border: '1.5px solid #E2E8F0', borderRadius: '0.625rem',
  fontFamily: '"DM Sans", sans-serif', fontSize: '0.9375rem',
  outline: 'none', transition: 'border-color 200ms ease, box-shadow 200ms ease',
};
const onFocus = (e) => { e.target.style.borderColor = '#0A66C2'; e.target.style.boxShadow = '0 0 0 3px rgba(10,102,194,0.1)'; };
const onBlur  = (e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; };

function AboutMe() {
  const [fields, setFields] = useState({ role:'', years:'', skills:'', achievement:'', goal:'new-role' });
  const [result,    setResult]    = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error,     setError]     = useState(null);

  const allFilled = fields.role.trim() && fields.skills.trim();

  const handleGenerate = async () => {
    if (!allFilled) return;
    setIsLoading(true); setError(null); setResult(null);
    try {
      const { response } = await callGemini(PROMPT_TEMPLATE(fields));
      setResult(response.trim());
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally { setIsLoading(false); }
  };

  const charCount = result ? result.length : 0;

  return (
    <ToolPageLayout
      icon={User}
      title="About Me Generator"
      subtitle="Build a compelling LinkedIn summary that showcases your expertise, achievements, and personality."
      leftPanel={
        <div className="space-y-4">
          {/* Tip */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl text-sm" style={{ background:'#EFF6FF', border:'1px solid #BFDBFE' }}>
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color:'#0A66C2' }} />
            <p className="leading-relaxed" style={{ color:'#374151' }}>
              <strong className="font-semibold" style={{ color:'#050B16' }}>Tip:</strong>{' '}
              The more specific your achievement and skills, the more compelling your About section will be.
            </p>
          </div>

          {/* Role */}
          <div>
            <label htmlFor="am-role" className="block text-sm font-semibold mb-1.5" style={{ color:'#050B16' }}>
              Current Role / Title <span style={{ color:'#0A66C2' }}>*</span>
            </label>
            <input id="am-role" type="text" required style={INPUT}
              placeholder="e.g. Senior Product Designer at Figma"
              value={fields.role}
              onChange={e => setFields(f => ({ ...f, role: e.target.value }))}
              onFocus={onFocus} onBlur={onBlur} />
          </div>

          {/* Years + Goal */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="am-years" className="block text-sm font-semibold mb-1.5" style={{ color:'#050B16' }}>
                Years of Experience
              </label>
              <input id="am-years" type="text" style={INPUT}
                placeholder="e.g. 7" value={fields.years}
                onChange={e => setFields(f => ({ ...f, years: e.target.value }))}
                onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div>
              <label htmlFor="am-goal" className="block text-sm font-semibold mb-1.5" style={{ color:'#050B16' }}>
                Career Goal
              </label>
              <select id="am-goal" style={{ ...INPUT, cursor:'pointer' }}
                value={fields.goal}
                onChange={e => setFields(f => ({ ...f, goal: e.target.value }))}
                onFocus={onFocus} onBlur={onBlur}>
                {GOALS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
              </select>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label htmlFor="am-skills" className="block text-sm font-semibold mb-1.5" style={{ color:'#050B16' }}>
              Top 3–5 Skills <span style={{ color:'#0A66C2' }}>*</span>
            </label>
            <input id="am-skills" type="text" required style={INPUT}
              placeholder="e.g. UX Research, Figma, Design Systems, Prototyping"
              value={fields.skills}
              onChange={e => setFields(f => ({ ...f, skills: e.target.value }))}
              onFocus={onFocus} onBlur={onBlur} />
          </div>

          {/* Achievement */}
          <div>
            <label htmlFor="am-achievement" className="block text-sm font-semibold mb-1.5" style={{ color:'#050B16' }}>
              Key Achievement <span className="font-normal text-xs" style={{ color:'#9CA3AF' }}>(optional)</span>
            </label>
            <textarea id="am-achievement" style={{ ...INPUT, minHeight:'90px', resize:'vertical' }}
              placeholder="e.g. Led redesign of checkout flow that increased conversion by 34%"
              value={fields.achievement}
              onChange={e => setFields(f => ({ ...f, achievement: e.target.value }))}
              onFocus={onFocus} onBlur={onBlur} />
          </div>

          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

          {/* Submit */}
          <button id="about-generate-btn" onClick={handleGenerate} disabled={!allFilled || isLoading}
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
              ? <><span className="spinner" style={{ borderTopColor:'#FFFFFF', borderColor:'rgba(255,255,255,0.3)' }} /><span>Generating...</span></>
              : <><Sparkles className="w-4 h-4" /><span>Generate About Me</span></>
            }
          </button>
        </div>
      }
      rightPanel={
        <div>
          <OutputCard
            result={result} isLoading={isLoading}
            onRegenerate={result ? handleGenerate : null}
            label="Your LinkedIn About Me"
            emptyMessage="Fill in your details on the left and click Generate — your personalized About Me section will appear here."
          />
          {result && (
            <div className="mt-3 flex items-center justify-end gap-2 text-xs">
              <span className="font-mono" style={{ color: charCount > 2600 ? '#EF4444' : '#9CA3AF' }}>
                {charCount} / 2600 characters
              </span>
              {charCount > 2600 && <span className="text-red-500 font-medium">⚠ Exceeds LinkedIn limit</span>}
            </div>
          )}
        </div>
      }
    />
  );
}

export default AboutMe;
