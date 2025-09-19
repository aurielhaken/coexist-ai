interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#4F46E5', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#EC4899', stopOpacity:1}} />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle cx="32" cy="32" r="30" fill="url(#iconGradient)"/>
        
        {/* Simple dove in center */}
        <g transform="translate(32, 32)">
          {/* Dove body */}
          <ellipse cx="0" cy="2" rx="8" ry="5" fill="white" opacity="0.9"/>
          
          {/* Dove wing */}
          <path d="M -5 0 Q -12 -3 -10 -8 Q -6 -5 -5 0 Z" fill="white" opacity="0.8"/>
          
          {/* Dove head */}
          <circle cx="-5" cy="0" r="2.5" fill="white"/>
          
          {/* Olive branch */}
          <path d="M -8 0 Q -12 -2 -14 0" stroke="#10B981" strokeWidth="1" fill="none"/>
          <circle cx="-11" cy="-1" r="0.5" fill="#10B981"/>
        </g>
        
        {/* Small heart at bottom */}
        <path d="M 32 45 C 29 42, 25 42, 27 37 C 29 35, 32 37, 32 39 C 32 37, 35 35, 37 37 C 39 42, 35 42, 32 45 Z" 
              fill="#F87171" 
              opacity="0.8"/>
      </svg>
    </div>
  );
}

export function LogoFull({ className = '' }: { className?: string }) {
  return (
    <div className={`w-48 h-48 ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Gradient Definitions */}
        <defs>
          {/* Main gradient for the circles */}
          <linearGradient id="peaceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#4F46E5', stopOpacity:1}} />
            <stop offset="50%" style={{stopColor:'#7C3AED', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#EC4899', stopOpacity:1}} />
          </linearGradient>
          
          {/* Heart gradient */}
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#F87171', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#EF4444', stopOpacity:1}} />
          </linearGradient>
          
          {/* Dove gradient */}
          <linearGradient id="doveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#FFFFFF', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#F3F4F6', stopOpacity:1}} />
          </linearGradient>
          
          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle with subtle gradient */}
        <circle cx="100" cy="100" r="95" fill="url(#peaceGradient)" opacity="0.1"/>
        
        {/* Interconnected circles representing unity and coexistence */}
        <circle cx="80" cy="80" r="25" fill="url(#peaceGradient)" opacity="0.3" filter="url(#glow)"/>
        <circle cx="120" cy="80" r="25" fill="url(#peaceGradient)" opacity="0.4" filter="url(#glow)"/>
        <circle cx="100" cy="120" r="25" fill="url(#peaceGradient)" opacity="0.5" filter="url(#glow)"/>
        
        {/* Central dove symbol */}
        <g transform="translate(100, 100)">
          {/* Dove body */}
          <ellipse cx="0" cy="5" rx="12" ry="8" fill="url(#doveGradient)" filter="url(#glow)"/>
          
          {/* Dove wing */}
          <path d="M -8 0 Q -20 -5 -15 -15 Q -10 -8 -8 0 Z" fill="url(#doveGradient)" opacity="0.9"/>
          
          {/* Dove tail */}
          <path d="M 10 8 Q 18 12 15 18 Q 12 15 10 8 Z" fill="url(#doveGradient)" opacity="0.8"/>
          
          {/* Dove head */}
          <circle cx="-8" cy="0" r="4" fill="url(#doveGradient)"/>
          
          {/* Dove beak */}
          <path d="M -12 0 L -15 -1 L -12 1 Z" fill="#FCD34D"/>
          
          {/* Dove eye */}
          <circle cx="-9" cy="-1" r="1" fill="#374151"/>
          
          {/* Olive branch in beak */}
          <path d="M -15 -1 Q -20 -3 -22 -1 Q -20 1 -15 -1" stroke="#10B981" strokeWidth="1.5" fill="none"/>
          <circle cx="-18" cy="-2" r="1" fill="#10B981"/>
          <circle cx="-20" cy="0" r="0.8" fill="#10B981"/>
        </g>
        
        {/* Heart symbol at the center bottom */}
        <g transform="translate(100, 140)">
          <path d="M 0 5 C -5 0, -12 0, -8 -8 C -4 -12, 0 -8, 0 -4 C 0 -8, 4 -12, 8 -8 C 12 0, 5 0, 0 5 Z" 
                fill="url(#heartGradient)" 
                filter="url(#glow)"
                opacity="0.8"/>
        </g>
        
        {/* Connecting lines representing unity */}
        <line x1="80" y1="80" x2="120" y2="80" stroke="url(#peaceGradient)" strokeWidth="2" opacity="0.3"/>
        <line x1="80" y1="80" x2="100" y2="120" stroke="url(#peaceGradient)" strokeWidth="2" opacity="0.3"/>
        <line x1="120" y1="80" x2="100" y2="120" stroke="url(#peaceGradient)" strokeWidth="2" opacity="0.3"/>
        
        {/* Outer decorative elements */}
        <g opacity="0.6">
          {/* Peace symbols around the logo */}
          <circle cx="50" cy="50" r="3" fill="#10B981"/>
          <circle cx="150" cy="50" r="3" fill="#3B82F6"/>
          <circle cx="50" cy="150" r="3" fill="#EF4444"/>
          <circle cx="150" cy="150" r="3" fill="#F59E0B"/>
          
          {/* Small connecting arcs */}
          <path d="M 50 50 Q 100 30 150 50" stroke="url(#peaceGradient)" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M 50 150 Q 100 170 150 150" stroke="url(#peaceGradient)" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M 50 50 Q 30 100 50 150" stroke="url(#peaceGradient)" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M 150 50 Q 170 100 150 150" stroke="url(#peaceGradient)" strokeWidth="1" fill="none" opacity="0.4"/>
        </g>
      </svg>
    </div>
  );
}
