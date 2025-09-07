import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Download, RefreshCw, User, Sparkles } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { copyToClipboard, downloadText } from "../utils/exportUtils";
import { simulateAIGeneration } from "../utils/aiSimulator";

function formatAboutMeOutput(response) {
  if (!response) return [];
  return response
    .split(/\n|(?=^[\p{Emoji}•–—\-0-9])/gu)
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

export default function AboutMe() {
  const { profile, updateProfile, updateGeneratedContent } = useProfile();
  const [summary, setSummary] = useState(profile.summary || "");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateProfile({ summary });
  }, [summary, updateProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse("");
    
    if (!summary.trim()) {
      setError("Summary cannot be empty.");
      return;
    }
    
    setLoading(true);
    
    try {
      const prompt = `Write a modern, multi-point "About Me" or LinkedIn summary using emoji for each main point, based on: ${summary}`;
      const data = await simulateAIGeneration(prompt);
      
      setResponse(data.response);
      updateGeneratedContent({ aboutMe: data.response });
    } catch (err) {
      console.error(err);
      setError("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const lines = response ? formatAboutMeOutput(response) : [];
  const fullText = lines.join("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 sm:px-6"
    >
      <div className="bg-card rounded-2xl shadow-xl border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6 lg:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <User className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">About Me Generator</h2>
              <p className="text-blue-100 text-sm sm:text-base">Create a compelling professional summary</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-semibold text-muted-foreground mb-2">
                Profile Name (optional)
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={e => updateProfile({ name: e.target.value })}
                placeholder="Your name"
                className="w-full px-4 py-3 sm:py-4 bg-transparent border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold text-muted-foreground mb-2">
                Professional Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                value={summary}
                onChange={e => setSummary(e.target.value)}
                rows={4}
                required
                placeholder="Describe your professional background, key skills, and career highlights..."
                className="w-full px-4 py-3 sm:py-4 bg-transparent border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical transition-all duration-200 text-sm sm:text-base"
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
              disabled={loading || !summary.trim()}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-primary-foreground font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate About Me
                </>
              )}
            </button>
          </form>

          {/* Results */}
          {lines.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 sm:mt-8 p-4 sm:p-6 lg:p-8 bg-muted/50 rounded-2xl border"
            >
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Generated About Me Section
              </h3>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {lines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-3 sm:p-4 bg-background rounded-xl border hover:border-primary hover:shadow-md transition-all duration-200 text-sm sm:text-base"
                  >
                    {line}
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => copyToClipboard(fullText)}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors duration-200 text-sm sm:text-base font-medium"
                >
                  <Copy className="w-4 h-4" />
                  Copy All
                </button>
                <button
                  onClick={() => downloadText(fullText, `${profile.name || "aboutme"}.txt`)}
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
