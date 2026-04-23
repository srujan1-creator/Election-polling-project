import { motion, AnimatePresence } from 'framer-motion';
import { ELECTION_STEPS } from '../data/electionData';
import { Bot, ChevronRight, CheckCircle2, ChevronLeft, Landmark, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MockPoll } from './MockPoll';
import './AssistantUI.css';

interface AssistantUIProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function AssistantUI({ currentStep, onStepChange }: AssistantUIProps) {
  const stepData = ELECTION_STEPS.find(s => s.id === currentStep);
  const { logout } = useAuth();

  return (
    <div className="dashboard-container">
      
      {/* Top Navigation Bar */}
      <header className="dashboard-header glass-panel">
        <div className="logo-section">
            <Landmark size={28} color="#FF5A1F" />
            <div>
                <h1>Democracy Hub</h1>
                <p>Interactive Election Guide</p>
            </div>
        </div>

        {/* Timeline Nav Integrated in Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div className="timeline-nav">
                <button 
                className={`nav-btn ${currentStep === 1 ? 'disabled' : ''}`}
                onClick={() => onStepChange(Math.max(1, currentStep - 1))}
                >
                <ChevronLeft size={20} />
                </button>
                
                <div className="timeline-steps">
                {ELECTION_STEPS.map((step) => (
                    <div 
                    key={step.id} 
                    className={`timeline-step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                    onClick={() => onStepChange(step.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to step ${step.id}: ${step.title}`}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onStepChange(step.id);
                        }
                    }}
                    >
                    <div className="step-dot"></div>
                    <span className="step-label">{step.title}</span>
                    </div>
                ))}
                </div>

                <button 
                className={`nav-btn ${currentStep === ELECTION_STEPS.length ? 'disabled' : ''}`}
                onClick={() => onStepChange(Math.min(ELECTION_STEPS.length, currentStep + 1))}
                >
                <ChevronRight size={20} />
                </button>
            </div>
            
            {/* Integrated Logout Button */}
            <button 
                onClick={logout} 
                className="glass-panel"
                aria-label="Logout"
                style={{
                    padding: '0.6rem 1rem',
                    background: 'rgba(255, 90, 31, 0.1)',
                    border: '1px solid rgba(255, 90, 31, 0.3)',
                    color: '#FF5A1F',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 90, 31, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 90, 31, 0.1)'}
            >
                <LogOut size={16} />
                Logout
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="dashboard-content">
        <AnimatePresence mode="wait">
            {stepData && (
            <motion.div
                key={stepData.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="step-card glass-panel"
            >
                <div className="step-header">
                  <div className="step-icon">
                    <Bot size={32} color="#1F9AFF" />
                  </div>
                  <div className="step-titles">
                      <span className="step-badge">Step {stepData.id}</span>
                      <h2>{stepData.title}</h2>
                  </div>
                </div>
                
                <div className="step-body">
                    {stepData.id === 5 ? (
                        <MockPoll />
                    ) : (
                        <>
                            <p className="step-desc">{stepData.description}</p>
                            
                            <div className="step-details-container">
                                <h3>What to expect:</h3>
                                <ul className="step-details">
                                {stepData.details.map((detail, idx) => (
                                    <motion.li 
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="detail-item glass-panel"
                                    >
                                    <CheckCircle2 size={20} className="text-primary" />
                                    <span>{detail}</span>
                                    </motion.li>
                                ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
            )}
        </AnimatePresence>
      </main>

    </div>
  );
}
