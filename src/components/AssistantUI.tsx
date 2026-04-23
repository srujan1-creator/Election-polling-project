import { motion, AnimatePresence } from 'framer-motion';
import { ELECTION_STEPS } from '../data/electionData';
import { Bot, ChevronRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import './AssistantUI.css';

interface AssistantUIProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function AssistantUI({ currentStep, onStepChange }: AssistantUIProps) {
  const stepData = ELECTION_STEPS.find(s => s.id === currentStep);

  return (
    <div className="ui-overlay pointer-events-none">
      {/* Top Header */}
      <header className="header glass-panel">
        <h1>Election Process Education</h1>
        <p>Your interactive guide to democracy</p>
      </header>

      {/* Main Assistant Panel (Left) */}
      <AnimatePresence mode="wait">
        {stepData && (
          <motion.div
            key={stepData.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="assistant-panel glass-panel pointer-events-auto"
          >
            <div className="assistant-header">
              <div className="bot-icon">
                <Bot size={24} color="#FF5A1F" />
              </div>
              <h2>{stepData.title}</h2>
            </div>
            
            <p className="assistant-desc">{stepData.description}</p>
            
            <ul className="assistant-details">
              {stepData.details.map((detail, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                >
                  <CheckCircle2 size={16} className="text-secondary" />
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline Navigation (Bottom) */}
      <div className="timeline-nav glass-panel pointer-events-auto">
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
    </div>
  );
}
