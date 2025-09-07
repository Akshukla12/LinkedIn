import React, { createContext, useState, useContext } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    name: "",
    summary: "",
    jobTitle: "",
    company: "",
    industry: ""
  });

  const [generatedContent, setGeneratedContent] = useState({
    aboutMe: "",
    headlines: [],
    skills: []
  });

  const updateProfile = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updateGeneratedContent = (updates) => {
    setGeneratedContent(prev => ({ ...prev, ...updates }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, generatedContent, updateGeneratedContent }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
