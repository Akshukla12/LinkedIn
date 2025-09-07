import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, RefreshCw, Sparkles, CheckCircle, XCircle, Search } from "lucide-react";
import { useProfile } from "../context/ProfileContext";

const stopWords = new Set(['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now','job','description','responsibilities','requirements','experience','skills','qualifications','role','position','team','company','work','etc','eg','plus','-','&']);

function extractKeywords(text) {
  if (!text) return new Set();
  return new Set(
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
  );
}

export default function JobMatch() {
  const { generatedContent } = useProfile();
  const [profileText, setProfileText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const combinedText = [
      generatedContent.aboutMe,
      generatedContent.headlines.join(' '),
      generatedContent.skills.join(' ')
    ].join('\n\n');
    setProfileText(combinedText);
  }, [generatedContent]);

  const handleAnalyze = (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    setTimeout(() => {
      const profileKeywords = extractKeywords(profileText);
      const jobKeywords = extractKeywords(jobDescription);
      
      const matchingKeywords = [...profileKeywords].filter(k => jobKeywords.has(k));
      const missingKeywords = [...jobKeywords].filter(k => !profileKeywords.has(k));
      
      setResults({
        matchingKeywords,
        missingKeywords,
        matchCount: matchingKeywords.length,
        totalCount: jobKeywords.size
      });
      
      setLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-4 sm:px-6"
    >
      <div className="bg-card rounded-2xl shadow-xl border overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-6 lg:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Briefcase className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">Job Keyword Matcher</h2>
              <p className="text-red-100 text-sm sm:text-base">Optimize your profile for any job description</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleAnalyze} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm sm:text-base font-semibold text-muted-foreground mb-2">
                        Your Profile Content
                    </label>
                    <textarea
                        value={profileText}
                        onChange={e => setProfileText(e.target.value)}
                        rows={12}
                        placeholder="Your content is pre-filled from other generators. You can also paste your own profile text here."
                        className="w-full h-full px-4 py-3 sm:py-4 bg-transparent border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical transition-all duration-200 text-sm sm:text-base"
                    />
                </div>
                <div>
                    <label className="block text-sm sm:text-base font-semibold text-muted-foreground mb-2">
                        Paste Job Description Here <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={jobDescription}
                        onChange={e => setJobDescription(e.target.value)}
                        rows={12}
                        required
                        placeholder="Paste the full job description from LinkedIn or any other job board..."
                        className="w-full h-full px-4 py-3 sm:py-4 bg-transparent border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical transition-all duration-200 text-sm sm:text-base"
                    />
                </div>
            </div>

            <button
              type="submit"
              disabled={loading || !jobDescription.trim()}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Analyze Keywords
                </>
              )}
            </button>
          </form>

          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 sm:mt-8"
            >
              <div className="bg-muted/50 rounded-2xl border p-4 sm:p-6 lg:p-8">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  Keyword Analysis Results
                </h3>
                <div className="text-center bg-background border rounded-xl p-4 mb-6">
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">
                        {results.matchCount} / {results.totalCount}
                    </p>
                    <p className="text-sm text-muted-foreground">Keywords Matched</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Matching Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.matchingKeywords.length > 0 ? results.matchingKeywords.map(k => (
                        <span key={k} className="px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 rounded-full text-xs sm:text-sm font-medium border border-green-200 dark:border-green-800/60">
                          {k}
                        </span>
                      )) : <p className="text-sm text-muted-foreground italic">No matching keywords found.</p>}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Missing Keywords
                    </h4>
                     <div className="flex flex-wrap gap-2">
                      {results.missingKeywords.length > 0 ? results.missingKeywords.map(k => (
                        <span key={k} className="px-3 py-1.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 rounded-full text-xs sm:text-sm font-medium border border-yellow-200 dark:border-yellow-800/60">
                          {k}
                        </span>
                      )) : <p className="text-sm text-muted-foreground italic">Great job! No missing keywords.</p>}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
