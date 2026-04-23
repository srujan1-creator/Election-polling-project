import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { AssistantUI } from './components/AssistantUI';

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
        <color attach="background" args={['#07090F']} />
        <Suspense fallback={null}>
          <Experience currentStep={currentStep} />
        </Suspense>
      </Canvas>
      <AssistantUI currentStep={currentStep} onStepChange={setCurrentStep} />
    </>
  );
}

export default App;
