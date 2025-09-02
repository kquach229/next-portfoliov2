'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type ScrollSpyContextType = {
  activeSection: string;
};

const ScrollSpyContext = createContext<ScrollSpyContextType>({
  activeSection: '',
});

export const useScrollSpy = () => useContext(ScrollSpyContext);

export const ScrollSpyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      'section[id], div[id]' // watch elements with IDs
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 } // adjust sensitivity
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <ScrollSpyContext.Provider value={{ activeSection }}>
      {children}
    </ScrollSpyContext.Provider>
  );
};
