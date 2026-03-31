import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContext';

export default function Final() {
  const { setCurrentTrack } = useTheme();
  const [step, setStep] = useState(0);

  useEffect(() => {
    setCurrentTrack('favour');
  }, [setCurrentTrack]);

  // Sequence
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 3000);
    const t2 = setTimeout(() => setStep(2), 6000);
    const t3 = setTimeout(() => setStep(3), 9000);
    const t4 = setTimeout(() => setStep(4), 13000);
    const t5 = setTimeout(() => setStep(5), 16000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, []);

  return (
    <div className="chapter-container" style={{ backgroundColor: step >= 4 ? '#020202' : 'transparent', transition: 'background-color 5s ease' }}>
      <AnimatePresence>
        {step >= 0 && step < 2 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 2 }}
            className="final-text-block"
          >
            <h2>You’re playing a risky game...</h2>
            {step >= 1 && (
              <motion.h2 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1.5 }}
                style={{ color: 'var(--accent)' }}
              >
                And I don’t lose 😏💜
              </motion.h2>
            )}
          </motion.div>
        )}

        {step >= 2 && step < 4 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 2 }}
            className="final-text-block"
          >
            <p>Go get some sleep...</p>
            {step >= 3 && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1.5 }}
                style={{ color: 'var(--text-muted)' }}
              >
                Even if I know I’ll be on your mind anyway.
              </motion.p>
            )}
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div 
            initial={{ opacity: 0, y: '30vh', scale: 0.8 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            transition={{ duration: 2.5, type: 'spring', bounce: 0.2 }}
            className="final-text-block end-state"
          >
            <h1 className="neon-gradient-text" style={{ fontSize: '3rem' }}>Goodnight, Aniie {'{ka forehead}'}</h1>
            <p className="mono-text" style={{ marginTop: '20px', color: 'var(--text-muted)' }}>31st March 💫</p>

            {step >= 5 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 2, delay: 0.5 }}
                className="glass-card"
                style={{ 
                  marginTop: '40px', 
                  padding: '25px 30px', 
                  maxWidth: '700px',
                  width: '90vw',
                  border: '1px solid rgba(139, 92, 246, 0.4)', /* Purplish neon border */
                  boxShadow: '0 0 25px rgba(139, 92, 246, 0.15), inset 0 0 15px rgba(59, 130, 246, 0.1)'
                }}
              >
                <p className="glowing-small-text">“Aniie {'{ka forehead}'}, you light up my world ✨💜”</p>
                <p className="glowing-small-text">“Every glance, every smile… makes my heart race 😏”</p>
                <p className="glowing-small-text">“You turn ordinary days into adventures I never want to end 💫”</p>
                <p className="glowing-small-text" style={{ marginTop: '15px' }}>“Goodnight, my love… my partner in mischief, my everything 💜”</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
