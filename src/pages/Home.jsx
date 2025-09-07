import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, FileText, Award, ArrowRight, Sparkles, TrendingUp, Users, Zap, Briefcase } from "lucide-react";

const features = [
  {
    icon: User,
    title: "About Me Generator",
    description: "Create compelling professional summaries that showcase your expertise and personality.",
    path: "/about",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: FileText,
    title: "Headline Generator",
    description: "Craft attention-grabbing headlines that make you stand out to recruiters.",
    path: "/headline",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Award,
    title: "Skills Generator",
    description: "Identify and list the most relevant skills for your industry and role.",
    path: "/skills",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Briefcase,
    title: "Job Keyword Matcher",
    description: "Optimize your profile by analyzing it against any job description for keyword alignment.",
    path: "/job-match",
    color: "from-orange-500 to-red-500"
  }
];

const stats = [
  { icon: Users, value: "50K+", label: "Profiles Created" },
  { icon: TrendingUp, value: "98%", label: "Success Rate" },
  { icon: Zap, value: "24/7", label: "Available" },
];

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12 lg:mb-16"
      >
        <div className="relative inline-block mb-4 sm:mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4"
          >
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-4 leading-tight">
            Elevate Your LinkedIn Profile
          </h2>
        </div>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
          Transform your professional presence with AI-powered content generation. 
          Create compelling profiles that attract opportunities and showcase your expertise.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group h-full"
            >
              <Link
                to={feature.path}
                className="block bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border hover:shadow-2xl hover:border-primary/30 transition-all duration-300 h-full"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-card-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors text-center sm:text-left">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed text-center sm:text-left">
                  {feature.description}
                </p>
                <div className="flex items-center justify-center sm:justify-start text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm sm:text-base">Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-primary-foreground text-center shadow-2xl"
      >
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6">
          Join Thousands of Professionals
        </h3>
        <p className="text-blue-200 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
          Our AI-powered tools have helped professionals create standout LinkedIn profiles 
          that attract recruiters and unlock new opportunities.
        </p>
        
        <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 backdrop-blur-sm">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-blue-200">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-8 sm:mt-12 lg:mt-16 mb-8"
      >
        <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-3 sm:mb-4">
            Ready to Transform Your Profile?
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
            Start with any of our AI-powered tools and create professional content in minutes.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm sm:text-base">Start Building Now</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;