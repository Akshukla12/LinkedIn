import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Download, RefreshCw, FileText, Sparkles } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { copyToClipboard, downloadText } from "../utils/exportUtils";
import { simulateAIGeneration } from "../utils/aiSimulator";

function parseHeadlines(response) {
  if (!response) return [];
  return response
    .split(/\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => line.replace(/^([0-9]+[.)-]|[-••])\s*/, ""));
}

export default function Headline() {
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
      setError("Please enter your professional focus or summary.");
      return;
    }
    
    setLoading(true);
    
    try {
      const prompt = `Generate 6 modern LinkedIn headline suggestions (one per line, no numbering) based on: ${input}`;
      const data = await simulateAIGeneration(prompt);

      const headlines = parseHeadlines(data.response);
      setResponse(data.response);
      updateGeneratedContent({ headlines });
    } catch (err) {
      console.error(err);
      setError("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const headlineList = response ? parseHeadlines(response) : [];
  const allText = headlineList.join("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 sm:px-6"
    >
      <div className="bg-card rounded-2xl shadow-xl border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 sm:p-6 lg:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">Headline Generator</h2>
              <p className="text-purple-100 text-sm sm:text-base">Create attention-grabbing professional headlines</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-semibold text-muted-foreground mb-2">
                Describe your professional focus or specialty <span className="text-red-500">*</span>
              </label>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                rows={3}
                required
                maxLength={250}
                placeholder="E.g. Full Stack Developer | React & Node.js | AI & Cloud Enthusiast"
                className="w-full px-4 py-3 sm:py-4 bg-transparent border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical transition-all duration-200 text-sm sm:text-base"
              />
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                {input.length}/250 characters
              </div>
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
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Headlines
                </>
              )}
            </button>
          </form>

          {/* Results */}
          {headlineList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 sm:mt-8 p-4 sm:p-6 lg:p-8 bg-muted/50 rounded-2xl border"
            >
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI-Generated LinkedIn Headlines
              </h3>
              
              <div className="grid gap-3 sm:gap-4 mb-6 sm:mb-8">
                {headlineList.map((headline, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-3 sm:p-4 bg-background rounded-xl border hover:border-purple-300 dark:hover:border-purple-800 hover:shadow-md transition-all duration-200 cursor-pointer group"
                    onClick={() => copyToClipboard(headline)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex-1 text-muted-foreground group-hover:text-foreground transition-colors text-sm sm:text-base leading-relaxed">
                        {headline}
                      </span>
                      <Copy className="w-4 h-4 text-muted-foreground/70 group-hover:text-purple-600 transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => copyToClipboard(allText)}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200 text-sm sm:text-base font-medium"
                >
                  <Copy className="w-4 h-4" />
                  Copy All
                </button>
                <button
                  onClick={() => downloadText(allText, `${profile.name || "headlines"}.txt`)}
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
