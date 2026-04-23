import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, UserCircle2, BarChart3 } from 'lucide-react';
import confetti from 'canvas-confetti';

const CANDIDATES = [
  { id: 'A', name: 'Alex Rivera', party: 'Progressive Vision Party', color: '#1F9AFF', percentage: 52 },
  { id: 'B', name: 'Jordan Chen', party: 'United Future Coalition', color: '#FF5A1F', percentage: 48 },
];

export function MockPoll() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleVote = () => {
    if (!selected) return;
    setHasVoted(true);
    
    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#1F9AFF', '#FF5A1F', '#ffffff']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#1F9AFF', '#FF5A1F', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    };
    frame();
  };

  if (showResults) {
      return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mock-poll-results"
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                  <BarChart3 size={32} color="#1F9AFF" />
                  <h3 style={{ fontSize: '1.8rem', color: 'white', fontFamily: 'Outfit', margin: 0 }}>Live Projected Results</h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {CANDIDATES.map((candidate, idx) => (
                      <div key={candidate.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                              <span style={{ fontSize: '1.2rem', fontFamily: 'Inter', fontWeight: 600 }}>{candidate.name}</span>
                              <span style={{ fontSize: '1.2rem', fontFamily: 'Outfit', fontWeight: 800 }}>{candidate.percentage}%</span>
                          </div>
                          <div style={{ width: '100%', height: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${candidate.percentage}%` }}
                                transition={{ duration: 1.5, delay: 0.3 + (idx * 0.2), ease: 'easeOut' }}
                                style={{ height: '100%', background: candidate.color, borderRadius: '8px' }}
                              />
                          </div>
                      </div>
                  ))}
              </div>
          </motion.div>
      )
  }

  if (hasVoted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mock-poll-success"
        style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            padding: '3rem', textAlign: 'center', background: 'rgba(31, 154, 255, 0.05)', borderRadius: '16px', border: '1px solid rgba(31, 154, 255, 0.2)'
        }}
      >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
        >
            <CheckCircle2 size={80} color="#1F9AFF" style={{ marginBottom: '1.5rem' }} />
        </motion.div>
        <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white', fontFamily: 'Outfit' }}>Ballot Cast Successfully!</h3>
        <p style={{ color: '#A0A5B5', fontSize: '1.2rem', maxWidth: '400px', lineHeight: 1.6, marginBottom: '2rem' }}>
            Your vote has been securely recorded in the simulation. Thank you for participating in democracy!
        </p>

        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowResults(true)}
            style={{
                padding: '1rem 2rem',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}
        >
            <BarChart3 size={20} /> View Live Results
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="mock-poll-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.8rem', color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', fontFamily: 'Outfit' }}>
          Official Demo Ballot
      </h3>
      
      <div className="candidates-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {CANDIDATES.map((candidate) => {
            const isSelected = selected === candidate.id;
            return (
                <motion.div 
                    key={candidate.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(candidate.id)}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    aria-label={`Select candidate ${candidate.name}`}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelected(candidate.id);
                        }
                    }}
                    style={{
                        padding: '1.5rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(255, 90, 31, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        border: `2px solid ${isSelected ? '#FF5A1F' : 'rgba(255,255,255,0.1)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        transition: 'background 0.2s, border 0.2s'
                    }}
                >
                    <UserCircle2 size={40} color={isSelected ? '#FF5A1F' : '#A0A5B5'} />
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '0.4rem', fontFamily: 'Inter' }}>{candidate.name}</h4>
                        <span style={{ color: '#A0A5B5', fontSize: '1rem' }}>{candidate.party}</span>
                    </div>
                    
                    <div style={{
                        width: '28px', height: '28px', borderRadius: '50%', 
                        border: `2px solid ${isSelected ? '#FF5A1F' : '#A0A5B5'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {isSelected && <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#FF5A1F' }} />}
                    </div>
                </motion.div>
            )
        })}
      </div>

      <motion.button 
        whileHover={selected ? { scale: 1.02 } : {}}
        whileTap={selected ? { scale: 0.98 } : {}}
        onClick={handleVote}
        disabled={!selected}
        style={{
            marginTop: '1rem',
            padding: '1.5rem',
            borderRadius: '12px',
            background: selected ? '#FF5A1F' : 'rgba(255,255,255,0.05)',
            color: selected ? 'white' : '#A0A5B5',
            border: 'none',
            fontSize: '1.3rem',
            fontWeight: 800,
            cursor: selected ? 'pointer' : 'not-allowed',
            boxShadow: selected ? '0 0 30px rgba(255, 90, 31, 0.4)' : 'none',
            transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
            letterSpacing: '2px'
        }}
      >
          CAST BALLOT
      </motion.button>
    </div>
  );
}
