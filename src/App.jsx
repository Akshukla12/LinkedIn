import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import Headline from "./pages/Headline";
import Skills from "./pages/Skills";
import JobMatch from "./pages/JobMatch";
import AnimationShowcase from "./pages/AnimationShowcase";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/headline" element={<Headline />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/job-match" element={<JobMatch />} />
          <Route path="/animations" element={<AnimationShowcase />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
