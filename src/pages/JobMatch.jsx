import React, { useState } from 'react';
import { Briefcase, Sparkles, CheckCircle2, XCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import ToolPageLayout from '../components/ToolPageLayout';
import { callGemini } from '../utils/geminiAI';

const PROMPT_TEMPLATE = (profile, jobDesc) => `
You are an expert ATS (Applicant Tracking System) analyst and LinkedIn optimization specialist.

Analyze this candidate's LinkedIn profile against the job description.

LINKEDIN PROFILE:
${profile}

JOB DESCRIPTION:
${jobDesc}

Provide a detailed match analysis. Return ONLY valid JSON (no markdown, no extra text):
{
  "score": 72,
  "summary": "2-3 sentence assessment of the match quality",
  "found_keywords": ["keyword1", "keyword2", "keyword3"],
  "missing_keywords": ["keyword1", "keyword2", "keyword3"],
  "suggestions": [
    "Specific actionable suggestion 1",
    "Specific actionable suggestion 2",
    "Specific actionable suggestion 3"
  ]
}

Rules:
- score: integer 0-100 representing keyword/skills alignment
- found_keywords: important keywords from job desc that appear in the profile (max 10)
- missing_keywords: important keywords from job desc that are absent from profile (max 10)
- suggestions: 3 specific, actionable improvements to increase the match score
`.trim();

/* Circular score ring — light-friendly */
const ScoreRing = ({ score }) => {
  const radius = 44;
  const circ   = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color  = score >= 75 ? '#059669' : score >= 50 ? '#D97706' : '#DC2626';
  const label  = score >= 75 ? 'Strong Match' : score >= 50 ? 'Moderate Match' : 'Needs Work';

  return (
    <div className="flex flex-col items-center">
      <svg width="108" height="108" viewBox="0 0 108 108" aria-label={`Match score: ${score}%`}>
        {/* Track */}
        <circle cx="54" cy="54" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="8" />
        {/* Progress */}
        <circle cx="54" cy="54" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          transform="rotate(-90 54 54)"
          style={{ transition:'stroke-dashoffset 1s ease, stroke 0.5s ease' }} />
        {/* Score text */}
        <text x="54" y="50" textAnchor="middle" dominantBaseline="middle"
          fill="#050B16" fontSize="22" fontWeight="700" fontFamily="DM Sans, sans-serif">{score}</text>
        <text x="54" y="68" textAnchor="middle"
          fill="#9CA3AF" fontSize="11" fontFamily="DM Sans, sans-serif">/ 100</text>
      </svg>
      <p className="text-sm font-semibold mt-1" style={{ color }}>{label}</p>
    </div>
  );
};

/* Light input style */
const TA = {
  width:'100%', padding:'0.75rem 1rem',
  background:'#FFFFFF', color:'#050B16',
  border:'1.5px solid #E2E8F0', borderRadius:'0.75rem',
  fontFamily:'"DM Sans", sans-serif', fontSize:'0.9375rem', lineHeight:'1.65',
  outline:'none', resize:'vertical', minHeight:'160px',
  transition:'border-color 200ms ease, box-shadow 200ms ease',
};
const onFocus = (e) => { e.target.style.borderColor='#0A66C2'; e.target.style.boxShadow='0 0 0 3px rgba(10,102,194,0.1)'; };
const onBlur  = (e) => { e.target.style.borderColor='#E2E8F0'; e.target.style.boxShadow='none'; };

function JobMatch() {
  const [profile,   setProfile]   = useState('');
  const [jobDesc,   setJobDesc]   = useState('');
  const [result,    setResult]    = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error,     setError]     = useState(null);

  const allFilled = profile.trim().length > 30 && jobDesc.trim().length > 30;

  const handleAnalyze = async () => {
    if (!allFilled) return;
    setIsLoading(true); setError(null); setResult(null);
    try {
      const { response } = await callGemini(PROMPT_TEMPLATE(profile.trim(), jobDesc.trim()));
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Unexpected response format. Please try again.');
      setResult(JSON.parse(jsonMatch[0]));
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally { setIsLoading(false); }
  };

  return (
    <ToolPageLayout
      icon={Briefcase}
      title="Job Keyword Matcher"
      subtitle="Paste your LinkedIn profile and a job description to get an ATS match score and actionable improvements."
      singleColumn
      leftPanel={
        <div>
          {/* Tip */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl mb-6 text-sm" style={{ background:'#EFF6FF', border:'1px solid #BFDBFE' }}>
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color:'#0A66C2' }} />
            <p className="leading-relaxed" style={{ color:'#374151' }}>
              <strong className="font-semibold" style={{ color:'#050B16' }}>Tip:</strong>{' '}
              Paste your full LinkedIn About section + headline. The more content you provide, the more accurate the analysis.
            </p>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div>
              <label htmlFor="jm-profile" className="block text-sm font-semibold mb-1.5" style={{ color:'#050B16' }}>
                Your LinkedIn Profile <span style={{ color:'#0A66C2' }}>*</span>
              </label>
              <textarea id="jm-profile" style={TA}
                placeholder="Paste your LinkedIn headline + About Me section + key skills here..."
                value={profile} onChange={e => setProfile(e.target.value)}
                onFocus={onFocus} onBlur={onBlur} />
              <span className="text-xs font-mono mt-1 block" style={{ color:'#9CA3AF' }}>{profile.length} chars</span>
            </div>
            <div>
              <label htmlFor="jm-job" className="block text-sm font-semibold mb-1.5" style={{ color:'#050B16' }}>
                Job Description <span style={{ color:'#0A66C2' }}>*</span>
              </label>
              <textarea id="jm-job" style={TA}
                placeholder="Paste the full job description including responsibilities, requirements and qualifications..."
                value={jobDesc} onChange={e => setJobDesc(e.target.value)}
                onFocus={onFocus} onBlur={onBlur} />
              <span className="text-xs font-mono mt-1 block" style={{ color:'#9CA3AF' }}>{jobDesc.length} chars</span>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm flex items-center gap-1.5 mb-4" role="alert">
              <AlertCircle className="w-4 h-4" />{error}
            </p>
          )}

          {/* Analyze button */}
          <button id="jobmatch-analyze-btn" onClick={handleAnalyze} disabled={!allFilled || isLoading}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
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
              ? <><span className="spinner" style={{ borderTopColor:'#FFFFFF', borderColor:'rgba(255,255,255,0.3)' }} /><span>Analyzing Match...</span></>
              : <><Sparkles className="w-4 h-4" /><span>Analyze Match</span></>
            }
          </button>

          {/* Skeleton */}
          {isLoading && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center py-8"><div className="skeleton w-28 h-28 rounded-full" /></div>
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="grid grid-cols-2 gap-4">
                <div className="skeleton h-32 rounded-xl" />
                <div className="skeleton h-32 rounded-xl" />
              </div>
              <div className="skeleton h-28 rounded-xl" />
            </div>
          )}

          {/* Results */}
          {!isLoading && result && (
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
              className="mt-8 space-y-5">

              {/* Score + summary */}
              <div className="card-white p-6 flex flex-col sm:flex-row items-center gap-6">
                <ScoreRing score={result.score ?? 0} />
                <div>
                  <h3 className="font-bold text-base mb-1.5" style={{ color:'#050B16', letterSpacing:'-0.01em' }}>Match Analysis</h3>
                  <p className="text-sm leading-relaxed" style={{ color:'#6B7280' }}>{result.summary}</p>
                </div>
              </div>

              {/* Keywords grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Found */}
                <div className="card-white p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4" style={{ color:'#059669' }} />
                    <h4 className="text-sm font-semibold" style={{ color:'#050B16' }}>Keywords Found</h4>
                    <span className="ml-auto text-xs" style={{ color:'#9CA3AF' }}>{result.found_keywords?.length ?? 0}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(result.found_keywords ?? []).map(kw => (
                      <span key={kw} className="px-2.5 py-1 text-xs rounded-full font-medium"
                        style={{ background:'#ECFDF5', color:'#059669', border:'1px solid #A7F3D0' }}>{kw}</span>
                    ))}
                  </div>
                </div>

                {/* Missing */}
                <div className="card-white p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="w-4 h-4" style={{ color:'#DC2626' }} />
                    <h4 className="text-sm font-semibold" style={{ color:'#050B16' }}>Keywords Missing</h4>
                    <span className="ml-auto text-xs" style={{ color:'#9CA3AF' }}>{result.missing_keywords?.length ?? 0}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(result.missing_keywords ?? []).map(kw => (
                      <span key={kw} className="px-2.5 py-1 text-xs rounded-full font-medium"
                        style={{ background:'#FEF2F2', color:'#DC2626', border:'1px solid #FECACA' }}>{kw}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="card-white p-5" style={{ borderLeft:'4px solid #0A66C2' }}>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color:'#050B16' }}>
                  <Sparkles className="w-4 h-4" style={{ color:'#0A66C2' }} />
                  Suggestions to Improve
                </h4>
                <ol className="space-y-2.5">
                  {(result.suggestions ?? []).map((s, i) => (
                    <motion.li key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.1, duration:0.25 }}
                      className="flex items-start gap-3 text-sm leading-relaxed" style={{ color:'#374151' }}>
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                        style={{ background:'#EFF6FF', color:'#0A66C2' }}>{i+1}</span>
                      {s}
                    </motion.li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </div>
      }
    />
  );
}

export default JobMatch;
