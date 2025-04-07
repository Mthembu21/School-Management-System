import React, { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  setColors: (colors: { primaryColor: string; secondaryColor: string; accentColor: string }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colors, setColors] = useState({
    primaryColor: '#1d4ed8',
    secondaryColor: '#1e40af',
    accentColor: '#3b82f6',
  });

  const updateColors = (newColors: { primaryColor: string; secondaryColor: string; accentColor: string }) => {
    const { primaryColor, secondaryColor, accentColor } = newColors;
    // Simple validation for color format (hex)
    const isValidColor = (color: string) => /^#([0-9A-F]{3}){1,2}$/i.test(color);
    
    if (isValidColor(primaryColor) && isValidColor(secondaryColor) && isValidColor(accentColor)) {
      setColors(newColors);
    } else {
      console.error('Invalid color format. Please use hex format.');
    }
  };

  return (
    <ThemeContext.Provider value={{ ...colors, setColors: updateColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
