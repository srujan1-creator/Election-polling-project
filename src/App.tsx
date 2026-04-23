import React, { useState, Suspense } from 'react';
import { useAuth } from './context/AuthContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AIChat } from './components/AIChat';

// Lazy load components for code-splitting efficiency
const AssistantUI = React.lazy(() => import('./components/AssistantUI').then(m => ({ default: m.AssistantUI })));
const LoginOverlay = React.lazy(() => import('./components/LoginOverlay').then(m => ({ default: m.LoginOverlay })));

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <AnimatedBackground />
      <Suspense fallback={<div style={{ color: '#fff', padding: '2rem', textAlign: 'center' }}>Loading UI...</div>}>
        {!isAuthenticated && <LoginOverlay />}
        
        {isAuthenticated && (
          <>
            <AssistantUI currentStep={currentStep} onStepChange={setCurrentStep} />
            <AIChat />
          </>
        )}
      </Suspense>
    </>
  );
}

export default App;
