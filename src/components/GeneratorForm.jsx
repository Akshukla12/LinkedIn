import React from 'react';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';

const BLUE = '#0A66C2';

const GeneratorForm = ({
  label = 'Describe your background', placeholder = 'Write a brief description...',
  value = '', onChange, onSubmit,
  isLoading = false, maxLength = 500, buttonLabel = 'Generate', error = null, hint = null,
  extraFields = null, buttonIcon = <Sparkles className="w-4 h-4" />,
}) => {
  const charCount   = value.length;
  const isNearLimit = charCount >= maxLength * 0.85;
  const isOverLimit = charCount > maxLength;
  const isEmpty     = charCount === 0;

  const canSubmit = !isEmpty && !isLoading && !isOverLimit;

  const handleSubmit = (e) => { e.preventDefault(); if (canSubmit && onSubmit) onSubmit(); };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="AI generator form">
      {extraFields && <div className="mb-4 space-y-3">{extraFields}</div>}

      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-2">
          <label htmlFor="generator-input" className="text-sm font-semibold" style={{ color:'#050B16' }}>
            {label}<span className="ml-1" style={{ color:BLUE }}>*</span>
          </label>
          {hint && <span className="text-xs" style={{ color:'#9CA3AF' }}>{hint}</span>}
        </div>

        <textarea
          id="generator-input"
          aria-label={label} aria-required="true"
          aria-invalid={!!error || isOverLimit}
          className="input-base"
          style={{ minHeight:'140px', maxHeight:'280px' }}
          placeholder={placeholder} value={value}
          onChange={onChange} disabled={isLoading} maxLength={maxLength+50}
        />

        <div className="flex items-center justify-between mt-1.5">
          <div aria-live="polite">
            {error && (
              <span id="gen-error" className="flex items-center gap-1.5 text-xs text-red-500" role="alert">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />{error}
              </span>
            )}
          </div>
          <span className={`text-xs font-mono ml-auto ${isOverLimit ? 'text-red-500' : isNearLimit ? 'text-blue-600' : 'text-slate-400'}`}>
            {charCount}/{maxLength}
          </span>
        </div>
      </div>

      <button
        type="submit" id="generator-submit-btn"
        disabled={!canSubmit} aria-disabled={!canSubmit}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
        style={
          isEmpty || isOverLimit
            ? { background:'#F1F5F9', color:'#9CA3AF', cursor:'not-allowed' }
            : isLoading
            ? { background:BLUE, color:'#FFFFFF', opacity:0.8, cursor:'wait' }
            : { background:BLUE, color:'#FFFFFF', cursor:'pointer' }
        }
        onMouseEnter={e => { if (canSubmit) { e.currentTarget.style.background='#0D73D4'; e.currentTarget.style.boxShadow='0 8px 24px rgba(10,102,194,0.28)'; } }}
        onMouseLeave={e => { if (canSubmit) { e.currentTarget.style.background=BLUE; e.currentTarget.style.boxShadow='none'; } }}
      >
        {isLoading
          ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Generating...</span></>
          : <>{buttonIcon}<span>{buttonLabel}</span></>
        }
      </button>
    </form>
  );
};

export default GeneratorForm;
