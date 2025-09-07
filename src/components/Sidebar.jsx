import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, FileText, Award, Home, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const menuItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "About Me Generator", icon: User },
  { path: "/headline", label: "Headline Generator", icon: FileText },
  { path: "/skills", label: "Skills Generator", icon: Award },
  { path: "/job-match", label: "Job Keyword Matcher", icon: Briefcase },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-3 bg-card rounded-xl shadow-lg border hover:shadow-xl transition-all duration-200"
        aria-label="Toggle menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={20} className="text-foreground" /> : <Menu size={20} className="text-foreground" />}
        </motion.div>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{
          x: isOpen ? 0 : "-100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          fixed top-0 left-0 h-full w-80 sm:w-72 bg-card border-r z-40
          shadow-2xl overflow-y-auto flex flex-col
        `}
      >
        <div className="p-4 sm:p-6 flex-grow">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 pt-16">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-blue-600 dark:to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-xl text-foreground">
                Profile <span className="text-primary">Builder</span>
              </h2>
              <p className="text-xs text-muted-foreground">AI-Powered LinkedIn Tools</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.div
                  key={item.path}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 sm:py-4 rounded-xl transition-all duration-200 text-sm sm:text-base
                      ${isActive 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }
                    `}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t flex justify-center">
          <ThemeToggle />
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;
