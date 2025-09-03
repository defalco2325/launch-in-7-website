import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState<"intro" | "launch" | "complete">("intro");
  
  useEffect(() => {
    console.log("Simple Splash Screen mounted");
    
    // Simple timing - show for 3 seconds then complete
    const timer = setTimeout(() => {
      console.log("Splash screen completing");
      onComplete();
    }, 3000);

    // Change stage after 1 second
    const stageTimer = setTimeout(() => {
      setStage("launch");
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(stageTimer);
    };
  }, [onComplete]);

  const logoStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #0EA5E9, #06B6D4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={logoStyle}>
          Launch in 7
        </div>
        <p style={{ marginTop: '1rem', color: '#666', fontSize: '1.2rem' }}>
          Launch Your Business in 7 Days
        </p>
        <div style={{ marginTop: '2rem', color: '#999' }}>
          Stage: {stage}
        </div>
        
        {/* Rocket animation */}
        <div 
          style={{ 
            marginTop: '2rem', 
            fontSize: '2rem',
            transform: stage === "launch" ? 'translateY(-50px)' : 'translateY(0)',
            transition: 'transform 0.5s ease-out'
          }}
        >
          🚀
        </div>
        
        <button 
          onClick={onComplete}
          style={{
            marginTop: '2rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#0EA5E9',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Skip Animation
        </button>
      </div>
    </div>
  );
}