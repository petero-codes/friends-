import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Identity() {
  const [showYou, setShowYou] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show 'You' after 2.5 seconds
    const t1 = setTimeout(() => setShowYou(true), 2500);
    // Move to next panel after 6 seconds
    const t2 = setTimeout(() => navigate('/connection'), 6000);
    
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [navigate]);

  return (
    <div className="chapter-container">
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ fontWeight: 300, fontSize: '2rem', letterSpacing: '2px', color: 'var(--text-muted)' }}
      >
        Not just anyone...
      </motion.h1>

      <AnimatePresence>
        {showYou && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{ marginTop: '5vh' }}
          >
            <h1 style={{ fontWeight: 500, fontSize: '4rem', color: 'var(--accent)', textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
              ...You,{' '}
              <motion.span
                animate={{ scale: [1, 1.05, 1], textShadow: ["0 0 20px var(--accent)", "0 0 40px var(--accent)", "0 0 20px var(--accent)"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                style={{ display: 'inline-block' }}
              >
                Aniie.
              </motion.span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
