import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        background: '#07090F',
    }}>
      {/* Subtle grid pattern overlay */}
      <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.3,
          zIndex: 1,
      }} />

      {/* Cyber Blue Orb */}
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 50, -50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(31, 154, 255, 0.15) 0%, rgba(31, 154, 255, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Neon Orange Orb */}
      <motion.div
        animate={{
          x: [0, -150, 100, 0],
          y: [0, -100, 50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(255, 90, 31, 0.12) 0%, rgba(255, 90, 31, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          transform: 'translate(50%, 50%)',
        }}
      />
    </div>
  );
}
