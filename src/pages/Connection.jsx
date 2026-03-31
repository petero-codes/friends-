import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContext';

const cards = [
  "Energy: unstoppable when you smile",
  "Loyalty: always got my back (even when you steal the blankets 😏)",
  "Vibes: dangerously cute",
  "Role: partner in all my mischief"
];

const revealTexts = [
  "You make even boring days feel magical ✨",
  "You get me… even when I’m being weird",
  "You stay… and that’s my favorite thing",
  "And yes… your forehead is still the cutest 😏💜"
];

export default function Connection() {
  const { setCurrentTrack } = useTheme();
  const [revealIndex, setRevealIndex] = useState(-1);
  const [isToggled, setIsToggled] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    setCurrentTrack('wewe-ni-wangu');
  }, [setCurrentTrack]);

  // Auto-scroll mechanism perfectly locked to text reveals
  useEffect(() => {
    if (scrollRef.current && revealIndex >= 0) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100); // slight delay allowing DOM to render new text before scrolling
    }
  }, [revealIndex]);

  const handleReveal = () => {
    setIsToggled(true);
    
    // Wait for the toggle animation to play before advancing textual state and resetting the switch
    setTimeout(() => {
      if (revealIndex < revealTexts.length - 1) {
        setRevealIndex(prev => prev + 1);
        setIsToggled(false); // Reset switch to allow next pull
      } else {
        navigate('/vibe');
      }
    }, 500);
  };

  return (
    <div className="chapter-container" style={{ padding: '20vh 5vw' }}>
      
      {/* Floating System Cards */}
      <div className="card-grid">
        {cards.map((txt, i) => (
          <motion.div 
            key={txt}
            className="system-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.4, duration: 1 }}
          >
            <span className="mono-text" style={{ fontSize: '0.9rem' }}>{txt}</span>
          </motion.div>
        ))}
      </div>

      {/* Reveal Sequence */}
      <div className="reveal-sequence" style={{ marginTop: '10vh', minHeight: '30vh' }}>
        <AnimatePresence>
          {revealTexts.map((text, i) => {
            if (i <= revealIndex) {
              return (
                <motion.p
                  key={text}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  style={{ 
                    fontSize: i === revealTexts.length - 1 ? '1.5rem' : '1.2rem',
                    marginBottom: '2vh',
                    color: i === revealTexts.length - 1 ? 'var(--accent)' : 'var(--text-main)' 
                  }}
                >
                  {text}
                </motion.p>
              );
            }
            return null;
          })}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2, duration: 1 }}
          style={{ marginTop: '5vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
        >
          <p className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            {revealIndex >= revealTexts.length - 1 ? 'INITIATE ADVANCE' : 'PULL TO REVEAL'}
          </p>
          <div className="reveal-switch interactive">
            <input 
              id="revealToggle" 
              type="checkbox" 
              checked={isToggled}
              onChange={handleReveal}
            />
            <label className="toggle" htmlFor="revealToggle">
              <i></i>
            </label>
          </div>
        </motion.div>
      </div>
      
      {/* Invisible anchor for precise auto-scrolling */}
      <div ref={scrollRef} style={{ height: '1px', width: '100%' }} />
    </div>
  );
}
