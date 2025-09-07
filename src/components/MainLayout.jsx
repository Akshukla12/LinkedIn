import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 transition-all duration-300 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pt-20">
            <header className="text-center mb-6 sm:mb-8 lg:mb-12">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 dark:to-blue-400 bg-clip-text text-transparent mb-2 sm:mb-4">
                  LinkedIn Profile Builder
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
                  Create compelling LinkedIn content with AI-powered tools
                </p>
              </motion.div>
            </header>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
