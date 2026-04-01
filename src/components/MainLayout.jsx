import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import AnimatedFooter from './AnimatedFooter';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-dvh" style={{ background: '#F8FAFC' }}>
      {/* Background blob glows — CatalyzeAI style */}
      <div className="page-bg-glow" aria-hidden="true">
        <div className="blob-1" />
        <div className="blob-2" />
        <div className="blob-3" />
      </div>

      <Navbar />

      <main className="flex-1 relative" id="main-content">
        <Outlet />
      </main>

      <AnimatedFooter />
    </div>
  );
};

export default MainLayout;
