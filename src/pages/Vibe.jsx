import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContext';

export default function Vibe() {
  const { setCurrentTrack, mode } = useTheme();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentTrack('juice-wrld');
  }, [setCurrentTrack]);

  // Text sequencer
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 3000);
    const t2 = setTimeout(() => setStep(2), 6500);
    const t3 = setTimeout(() => navigate('/final'), 12000); // 12s total duration
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate]);

  return (
    <>
      <div className="chapter-container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div 
          className="glass-card vibe-card"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <AnimatePresence>
            {step >= 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="vibe-text">
                If I ever go quiet...
              </motion.p>
            )}
            
            {step >= 1 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="vibe-text">
                It’s only because I’m thinking about you, Aniie {'{ka forehead}'} 💜
              </motion.p>
            )}

            {step >= 2 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="vibe-text accent">
                You’re never the problem… you’re the spark.
              </motion.p>
            )}
          </AnimatePresence>
          
          <motion.div 
            className="mode-text-box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
          >
            {mode === 'soft' ? (
              <span className="mono-text">" You matter more than you think, my love "</span>
            ) : (
              <span className="mono-text" style={{ color: '#ff6666' }}>" Don’t act like you don’t know what you do to me, forehead queen 😏💜 "</span>
            )}
          </motion.div>

        </motion.div>
      </div>
    </>
  );
}
