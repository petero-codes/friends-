import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const JUICE_IMAGES = [
  '/juice-wrld-pictures-fvqna5tqwryivpqj.jpg',
  '/just-sharing-some-juice-wrld-photos-part-2-999-love-you-all-v0-v6ajs9eo753c1.jpg',
  '/whats-your-favorite-juice-wrld-pics-v0-49bh1ta15pre1.jpeg'
];

export default function Layout() {
  const { hasStarted, currentTrack, isMuted, mode, setMode, setIsMuted } = useTheme();
  const location = useLocation();
  const audioRef = useRef(null);
  const [bgIndex, setBgIndex] = useState(0);

  // Audio crossfader logic
  useEffect(() => {
    if (!audioRef.current || !hasStarted) return;
    
    // Determine the track source
    const fallbackTrack = '/wanjine.mp4';
    let src = fallbackTrack;
    if (currentTrack === 'wewe-ni-wangu') src = fallbackTrack; // Replace when file exists
    else if (currentTrack === 'juice-wrld') src = fallbackTrack;
    else if (currentTrack === 'favour') src = fallbackTrack;

    if (src) {
      const safeSrc = encodeURI(src);
      if (audioRef.current.src.endsWith(safeSrc) && !audioRef.current.paused) {
        // already playing this track
      } else {
        // basic crossfade or swap
        audioRef.current.src = safeSrc;
        audioRef.current.volume = 0;
        audioRef.current.play().then(() => {
          let v = 0;
          const fade = setInterval(() => {
            if (v < 0.2) {
              v += 0.02;
              audioRef.current.volume = v;
            } else {
              clearInterval(fade);
            }
          }, 100);
        }).catch(e => console.error("Audio block:", e));
      }
    }
  }, [currentTrack, hasStarted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Global Slideshow background timer
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex(prev => (prev >= 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(bgTimer);
  }, []);

  // Show UI Controls only after Entry page
  const showControls = location.pathname !== '/' && location.pathname !== '/identity';

  return (
    <>
      {/* Global Juice WRLD Slideshow */}
      <AnimatePresence>
        <motion.div
          key={`global-bg-${bgIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }} // Boosted opacity to be visible over the black/neon
          exit={{ opacity: 0 }}
          transition={{ duration: 3 }}
          className="global-atmospheric-bg"
          style={{ 
            backgroundImage: `url('${JUICE_IMAGES[bgIndex]}')`,
          }}
        />
      </AnimatePresence>

      {/* Futuristic Neon Glassmorphism Background Settings */}
      <div className={`neon-orb orb-1 ${hasStarted ? 'glow' : ''}`}></div>
      <div className={`neon-orb orb-2 ${hasStarted ? 'glow' : ''}`}></div>
      <div className={`neon-orb orb-3 ${hasStarted ? 'glow' : ''}`}></div>
      <div className="glass-overlay"></div>
      <div className="grain-overlay"></div>

      <video 
        ref={audioRef} 
        loop 
        className={hasStarted ? "mini-video-player visible" : "mini-video-player"}
        playsInline
        controls
      />
      
      {showControls && (
        <div className="system-ui-controls">
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="ui-text interactive" style={{ background: 'none', border: 'none' }} onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? '[ Audio: OFF ]' : '[ Audio: ON ]'}
            </button>
            <button className="ui-text interactive" style={{ background: 'none', border: 'none' }} onClick={() => window.location.href = '/'}>
              [ Restart ]
            </button>
          </div>
          
          <div className="mode-toggle">
            <span className={mode === 'soft' ? 'active ui-text' : 'ui-text'} onClick={() => setMode('soft')}>SOFT</span>
            <span style={{ margin: '0 8px', color: '#555' }}>/</span>
            <span className={mode === 'bold' ? 'active ui-text' : 'ui-text'} onClick={() => setMode('bold')}>BOLD</span>
          </div>
        </div>
      )}

      {/* Animate Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
           key={location.pathname}
           initial={{ opacity: 0, filter: 'blur(10px)' }}
           animate={{ opacity: 1, filter: 'blur(0px)' }}
           exit={{ opacity: 0, filter: 'blur(10px)' }}
           transition={{ duration: 1.2, ease: "easeInOut" }}
           className="page-wrapper"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
