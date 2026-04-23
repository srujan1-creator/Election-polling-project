import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Sparkles, Stars, Box, Html } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  currentStep: number;
}

function KeyboardBase() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const keysCount = 40;
  
  useFrame(() => {
    if (meshRef.current) {
      let i = 0;
      for (let z = 0; z < 5; z++) {
        for (let x = 0; x < 8; x++) {
          if (x >= 3 && x <= 4 && z >= 2 && z <= 3) continue; // Skip area for VOTE button

          dummy.position.set(
            (x - 3.5) * 0.9, 
            0, 
            (z - 2) * 0.9
          );
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i++, dummy.matrix);
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, keysCount]} castShadow receiveShadow position={[0, -0.4, 0]}>
      <boxGeometry args={[0.7, 0.2, 0.7]} />
      <meshStandardMaterial color="#111520" metalness={0.9} roughness={0.3} />
    </instancedMesh>
  );
}

export function Experience({ currentStep }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const voteButtonRef = useRef<THREE.Mesh>(null);
  
  // Animation for the overall group based on current step
  useFrame((state, delta) => {
    if (group.current) {
      // Soft ambient idle rotation
      group.current.rotation.y += delta * 0.03;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;

      // Adjust camera depending on currentStep
      const targetPos = new THREE.Vector3();
      const targetAim = new THREE.Vector3(0, 0, 0);

      switch (currentStep) {
        case 1: // Registration
          targetPos.set(-2, 1.5, 6);
          targetAim.set(-4, 0, 2);
          break;
        case 2: // Campaigns
          targetPos.set(4, 1.5, 5);
          targetAim.set(4, 0, 1);
          break;
        case 3: // Voting (Center on the button)
          targetPos.set(0, 3, 4);
          targetAim.set(0, 0, 0);
          break;
        case 4: // Results
          targetPos.set(0, 2.5, -4);
          targetAim.set(0, 0, -5);
          break;
        default:
          targetPos.set(0, 2, 8);
          targetAim.set(0, 0, 0);
      }

      state.camera.position.lerp(targetPos, 0.04);
      state.camera.lookAt(targetAim);
    }
    
    // Animate vote button glowing/pulsing when in step 3
    if (voteButtonRef.current) {
      if (currentStep === 3) {
        const material = voteButtonRef.current.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 2 + Math.sin(state.clock.elapsedTime * 4) * 1.5;
      } else {
        const material = voteButtonRef.current.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, 0.5, 0.05);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <pointLight position={[0, 1, 0]} intensity={1.5} color="#FF5A1F" distance={8} />
      
      {/* Background Starry Particles */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <group ref={group}>
        
        {/* Floating Sparks around centerpiece */}
        <Sparkles count={150} scale={6} size={3} speed={0.4} color="#FF5A1F" opacity={0.6} noise={0.2} />

        {/* Abstract "Registration" Card (Left/Front) */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} position={[-4, -0.5, 2]}>
           <mesh>
             <boxGeometry args={[1.5, 2, 0.1]} />
             <MeshTransmissionMaterial backside color="#1F9AFF" thickness={0.5} roughness={0.1} ior={1.5} />
             <HtmlCenter yOffset={0} zOffset={0.06} rot={0}>
                <div style={{ color: 'white', fontSize: '40px' }}>📝</div>
             </HtmlCenter>
           </mesh>
        </Float>

        {/* Abstract "Campaign" Card (Right/Front) */}
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6} position={[4, 0, 1]}>
           <mesh rotation={[0, -0.4, 0]}>
             <boxGeometry args={[2, 1.5, 0.1]} />
             <MeshTransmissionMaterial backside color="#FF5A1F" thickness={0.8} roughness={0.1} ior={1.3} />
             <HtmlCenter yOffset={0} zOffset={0.06} rot={0}>
                <div style={{ color: 'white', fontSize: '40px' }}>📢</div>
             </HtmlCenter>
           </mesh>
        </Float>

        {/* Centerpiece: The Voting Keyboard and VOTE Button */}
        <group position={[0, -0.5, 0]}>
          {/* Main Laptop Base Matrix */}
          <Box args={[8, 0.2, 5]} position={[0, -0.6, 0.5]} castShadow receiveShadow>
            <meshStandardMaterial color="#0A0D14" metalness={0.8} roughness={0.4} />
          </Box>

          <KeyboardBase />
          
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            {/* The Huge VOTE Button Mesh */}
            <mesh ref={voteButtonRef} position={[0, -0.1, 0.5]} castShadow>
              <boxGeometry args={[2.5, 0.4, 1.2]} />
              <meshStandardMaterial 
                color="#FF5A1F" 
                emissive="#FF5A1F" 
                emissiveIntensity={0.5} 
                roughness={0.1} 
                metalness={0.5} 
              />
              <HtmlCenter yOffset={0.21} zOffset={0} rot={-Math.PI / 2}>
                  <div style={{
                      color: 'white',
                      fontFamily: 'Outfit',
                      fontWeight: 800,
                      fontSize: '48px',
                      textShadow: '0px 0px 15px rgba(255, 90, 31, 1)',
                      userSelect: 'none',
                      pointerEvents: 'none'
                  }}>
                      VOTE
                  </div>
              </HtmlCenter>
            </mesh>
          </Float>
        </group>

        {/* Abstract "Results" Card (Back) */}
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8} position={[0, 1, -5]}>
           <mesh rotation={[0, 0, 0]}>
             <boxGeometry args={[2.5, 2, 0.1]} />
             <MeshTransmissionMaterial backside color="#FFD700" thickness={0.5} roughness={0.1} ior={1.5} />
             <HtmlCenter yOffset={0} zOffset={0.06} rot={0}>
                <div style={{ color: 'white', fontSize: '50px' }}>📊</div>
             </HtmlCenter>
           </mesh>
        </Float>

      </group>
    </>
  );
}

// Custom simple wrapper to put HTML perfectly on top/side of a 3D mesh
function HtmlCenter({ children, yOffset = 0, zOffset = 0, rot = 0 }: { children: React.ReactNode, yOffset?: number, zOffset?: number, rot?: number }) {
  return (
    <Html transform position={[0, yOffset, zOffset]} rotation={[rot, 0, 0]}>
      {children}
    </Html>
  );
}
