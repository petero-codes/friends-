import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import EntranceToggle from '../components/EntranceToggle';
import { useTheme } from '../ThemeContext';

export default function Entry() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { setHasStarted } = useTheme();

  // Sequence:
  // 0: "Accessing file..."
  // 1: "Decrypting..."
  // 2: "Target identified."
  // 3: "The one who’s always got my back."
  // 4: Button appears

  useEffect(() => {
    const timings = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3000),
      setTimeout(() => setStep(3), 5000),
      setTimeout(() => setStep(4), 7500),
    ];
    return () => timings.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    setHasStarted(true);
    setTimeout(() => {
      navigate('/identity');
    }, 600);
  };

  return (
    <div className="chapter-container">
      <div className="terminal-text-block">
        <AnimatePresence>
          {step >= 0 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mono-text">Accessing file...</motion.p>}
          {step >= 1 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mono-text" style={{ marginTop: '5px' }}>Decrypting...</motion.p>}
          {step >= 2 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mono-text" style={{ color: 'var(--accent)', marginTop: '5px' }}>{'>'} Target: Aniie {'{ka forehead}'} 💜</motion.p>}
        </AnimatePresence>
        
        <AnimatePresence>
          {step >= 3 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <h2 style={{ fontWeight: 300, fontSize: '1.4rem', marginTop: '30px' }}>
                The one who makes my heart skip.
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {step >= 4 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
            style={{ marginTop: '10vh' }}
          >
            <EntranceToggle onToggle={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
