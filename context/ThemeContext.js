import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('@dark_mode');
      if (saved !== null) setDarkMode(saved === 'true');
    };
    loadTheme();
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    await AsyncStorage.setItem('@dark_mode', JSON.stringify(newMode));
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ ONE-LINE HOOK: useThemedStyles
export const useThemedStyles = (lightStyles, darkStyles) => {
  const { darkMode } = useContext(ThemeContext);
  return darkMode ? darkStyles : lightStyles;
};
