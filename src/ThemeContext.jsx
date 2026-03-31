import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('soft'); // 'soft' or 'bold'
  const [hasStarted, setHasStarted] = useState(false);
  
  // Track can be null, 'wewe-ni-wangu', 'juice-wrld', 'favour'
  const [currentTrack, setCurrentTrack] = useState(null); 
  const [isMuted, setIsMuted] = useState(false);

  return (
    <ThemeContext.Provider value={{ 
      mode, setMode, 
      hasStarted, setHasStarted, 
      currentTrack, setCurrentTrack,
      isMuted, setIsMuted
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
