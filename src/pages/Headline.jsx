import React, { useState } from 'react';
import { FileText, Sparkles, Lightbulb } from 'lucide-react';
import ToolPageLayout from '../components/ToolPageLayout';
import GeneratorForm from '../components/GeneratorForm';
import OutputCard from '../components/OutputCard';
import { callGemini } from '../utils/geminiAI';

const PROMPT_TEMPLATE = (input) => `
You are a professional LinkedIn profile writer specializing in crafting compelling, keyword-rich headlines.

Based on this professional background: "${input}"

Generate exactly 3 distinct LinkedIn headline variations. Each should:
- Be under 220 characters (LinkedIn's limit)
- Include searchable keywords recruiters use
- Highlight a unique value proposition
- Avoid generic phrases like "Experienced professional" or "Passionate about"
- Feel confident, specific, and human

Format your response as ONLY the 3 headlines, separated by "|||" (triple pipe). No numbering, no explanations, no extra text.

Example format:
Headline one here||| Headline two here||| Headline three here
`.trim();

function Headline() {
  const [input,     setInput]     = useState('');
  const [results,   setResults]   = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error,     setError]     = useState(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const { response } = await callGemini(PROMPT_TEMPLATE(input.trim()));
      const variants = response.split('|||').map(s => s.trim()).filter(Boolean);
      setResults(variants.length > 0 ? variants : [response.trim()]);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => { if (input.trim()) handleGenerate(); };

  return (
    <ToolPageLayout
      icon={FileText}
      title="Headline Generator"
      subtitle="Create punchy, keyword-rich LinkedIn headlines that stand out to recruiters and search algorithms."
      leftPanel={
        <div>
          {/* Tip box — LinkedIn blue */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl mb-5 text-sm"
            style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#0A66C2' }} />
            <p className="leading-relaxed" style={{ color: '#374151' }}>
              <strong className="font-semibold" style={{ color: '#050B16' }}>Tip:</strong>{' '}
              Include your job title, industry, key skills, and what makes you valuable. The more specific, the better.
            </p>
          </div>

          <GeneratorForm
            label="Describe your professional focus or specialty"
            placeholder="e.g. Full Stack Developer with 5 years of React & Node.js experience, building SaaS products at startups. Passionate about clean architecture and developer experience."
            value={input}
            onChange={e => setInput(e.target.value)}
            onSubmit={handleGenerate}
            isLoading={isLoading}
            maxLength={300}
            buttonLabel="Generate Headlines"
            buttonIcon={<Sparkles className="w-4 h-4" />}
            error={error}
          />
        </div>
      }
      rightPanel={
        <OutputCard
          result={results}
          isLoading={isLoading}
          onRegenerate={results ? handleRegenerate : null}
          label="3 Headline Variations"
          emptyMessage="Enter your professional background on the left and click Generate — you'll get 3 tailored headline options to choose from."
          multiVariant={true}
        />
      }
    />
  );
}

export default Headline;
