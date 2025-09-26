'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

export default function PeacefulParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      const colors = ['#4A90E2', '#7ED321', '#F5A623', '#9B59B6', '#E74C3C'];
      
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setParticles(newParticles);
    };

    createParticles();

    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          y: particle.y - particle.speed,
          x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.5,
          opacity: Math.sin(Date.now() * 0.002 + particle.id) * 0.3 + 0.4
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
      
      {/* Effet de gradient de fond */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-green-50/20 to-orange-50/30" />
      
      {/* Lignes de connexion paisibles */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        {particles.slice(0, 5).map((particle, index) => (
          <line
            key={`line-${index}`}
            x1={particle.x}
            y1={particle.y}
            x2={window.innerWidth / 2}
            y2={window.innerHeight / 2}
            stroke={particle.color}
            strokeWidth="0.5"
            opacity="0.1"
            className="animate-pulse"
          />
        ))}
      </svg>
    </div>
  );
}
