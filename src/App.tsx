import { useState } from 'react';
import { AssistantUI } from './components/AssistantUI';
import { LoginOverlay } from './components/LoginOverlay';
import { useAuth } from './context/AuthContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AIChat } from './components/AIChat';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <AnimatedBackground />
      
      {!isAuthenticated && <LoginOverlay />}
      
      {isAuthenticated && (
        <>
          <AssistantUI currentStep={currentStep} onStepChange={setCurrentStep} />
          <AIChat />
        </>
      )}
    </>
  );
}

export default App;
