import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Layout from './components/Layout';
import Entry from './pages/Entry';
import Identity from './pages/Identity';
import Connection from './pages/Connection';
import Vibe from './pages/Vibe';
import Final from './pages/Final';
import { useState, useEffect } from 'react';

function GlobalCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Determine if hovering an interactive element for the neon pulse expansion
      const t = e.target;
      const isInteractive = 
        t.tagName === 'BUTTON' || 
        t.tagName === 'A' || 
        t.classList.contains('interactive') || 
        t.closest('.interactive') || 
        t.classList.contains('ui-text') ||
        t.classList.contains('toggle-label') ||
        t.closest('.toggle-cont');

      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div 
      className={`neon-cursor ${isHovering ? 'hovering' : ''}`}
      style={{ left: position.x, top: position.y }}
    />
  );
}

export default function App() {
  return (
    <>
      <GlobalCursor />
      <ThemeProvider>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Entry />} />
            <Route path="identity" element={<Identity />} />
            <Route path="connection" element={<Connection />} />
            <Route path="vibe" element={<Vibe />} />
            <Route path="final" element={<Final />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
    </>
  );
}
