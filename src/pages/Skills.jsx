import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Download, RefreshCw, Award, Sparkles } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { copyToClipboard, downloadText } from "../utils/exportUtils";
import { simulateAIGeneration } from "../utils/aiSimulator";

function parseSkills(response) {
  if (!response) return [];
  let skills = [];
  if (response.includes(",")) {
    skills = response
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);
  } else {
    skills = response
      .split(/\n|[-•]/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }
  return [...new Set(skills)].slice(0, 20);
}

export default function Skills() {
  const { profile, updateGeneratedContent } = useProfile();
  const [input, setInput] = useState(profile.summary || "");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile.summary && !input) setInput(profile.summary);
  }, [profile.summary, input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse("");
    
    if (!input.trim()) {
      setError("Please provide details about your expertise.");
      return;
    }
    
    setLoading(true);
    
    try {
      const prompt = `Give me a comma-separated list of the top 20 professional skills for LinkedIn, based on: ${input}`;
      const data = await simulateAIGeneration(prompt);
      
      const skills = parseSkills(data.response);
      setResponse(data.response);
      updateGeneratedContent({ skills });
    } catch (err) {
      console.error(err);
      setError("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const skillsArr = response ? parseSkills(response) : [];
  const allText = skillsArr.join(", ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 sm:px-6"
    >
      <div className="bg-card rounded-2xl shadow-xl border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 lg:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Award className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">Skills Generator</h2>
              <p className="text-green-100 text-sm sm:text-base">Identify key skills for your LinkedIn profile</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-semibold text-muted-foreground mb-2">
                Describe your expertise or paste your resume summary <span className="text-red-500">*</span>
              </label>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                rows={4}
                required
                placeholder="Describe your professional experience, technical skills, and areas of expertise..."
                className="w-full px-4 py-3 sm:py-4 bg-transparent border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical transition-all duration-200 text-sm sm:text-base"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-sm sm:text-base"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Skills
                </>
              )}
            </button>
          </form>

          {/* Results */}
          {skillsArr.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 sm:mt-8 p-4 sm:p-6 lg:p-8 bg-muted/50 rounded-2xl border"
            >
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-600" />
                Top AI-Picked Skills
              </h3>
              
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                {skillsArr.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="px-3 sm:px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 rounded-full text-xs sm:text-sm font-medium border border-green-200 dark:border-green-800/60 hover:bg-green-200 dark:hover:bg-green-900 hover:scale-105 transition-all duration-200 cursor-pointer"
                    onClick={() => copyToClipboard(skill)}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => copyToClipboard(allText)}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 text-sm sm:text-base font-medium"
                >
                  <Copy className="w-4 h-4" />
                  Copy All
                </button>
                <button
                  onClick={() => downloadText(allText, `${profile.name || "skills"}.txt`)}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors duration-200 text-sm sm:text-base font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
