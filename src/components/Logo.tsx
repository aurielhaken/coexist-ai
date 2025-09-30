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
        {/* Fond moderne avec coins arrondis */}
        <rect x="4" y="4" width="56" height="56" rx="16" fill="#3B82F6"/>
        
        {/* Icône de paix moderne */}
        <g transform="translate(32, 32)">
          {/* Cercle principal */}
          <circle cx="0" cy="0" r="16" fill="white"/>
          
          {/* Symbole de paix stylisé */}
          <g fill="#3B82F6">
            {/* Branches de paix */}
            <path d="M-12,-4 C-14,-2 -14,2 -12,4 C-10,6 -6,6 -4,4 C-2,2 2,2 4,4 C6,6 10,6 12,4 C14,2 14,-2 12,-4 C10,-6 6,-6 4,-4 C2,-2 -2,-2 -4,-4 C-6,-6 -10,-6 -12,-4 Z"/>
            
            {/* Point central */}
            <circle cx="0" cy="0" r="4" fill="#3B82F6"/>
          </g>
        </g>
        
        {/* Points d'accent */}
        <circle cx="16" cy="16" r="2" fill="white" opacity="0.7"/>
        <circle cx="48" cy="16" r="2" fill="white" opacity="0.7"/>
        <circle cx="16" cy="48" r="2" fill="white" opacity="0.7"/>
        <circle cx="48" cy="48" r="2" fill="white" opacity="0.7"/>
      </svg>
    </div>
  );
}

export function LogoFull({ className = '' }: { className?: string }) {
  return (
    <div className={`w-48 h-48 ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Gradient moderne */}
          <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#667eea', stopOpacity:1}} />
            <stop offset="50%" style={{stopColor:'#764ba2', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#f093fb', stopOpacity:1}} />
          </linearGradient>
          
          {/* Gradient pour l'humanité */}
          <radialGradient id="humanGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{stopColor:'#ff9a9e', stopOpacity:0.8}} />
            <stop offset="100%" style={{stopColor:'#fecfef', stopOpacity:0.6}} />
          </radialGradient>
          
          {/* Ombre moderne */}
          <filter id="modernShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(0,0,0,0.15)"/>
          </filter>
          
          {/* Effet de lueur */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Fond principal avec gradient moderne */}
        <circle cx="100" cy="100" r="90" fill="url(#modernGradient)" filter="url(#modernShadow)"/>
        
        {/* Anneau intérieur pour la profondeur */}
        <circle cx="100" cy="100" r="75" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.3"/>
        
        {/* Symboles religieux stylisés et unifiés */}
        
        {/* Croix moderne (en haut) */}
        <g transform="translate(100, 60)">
          <rect x="-2" y="-12" width="4" height="24" fill="#FFFFFF" rx="2" opacity="0.9"/>
          <rect x="-8" y="-2" width="16" height="4" fill="#FFFFFF" rx="2" opacity="0.9"/>
        </g>
        
        {/* Étoile de David moderne (en bas à gauche) */}
        <g transform="translate(60, 140)">
          <path d="M 0,-10 L -8.66,5 L 8.66,5 Z" fill="#FFFFFF" opacity="0.9"/>
          <path d="M 0,10 L -8.66,-5 L 8.66,-5 Z" fill="#FFFFFF" opacity="0.9"/>
        </g>
        
        {/* Croissant moderne (en bas à droite) */}
        <g transform="translate(140, 140)">
          <path d="M -6,0 A 6,6 0 1,1 6,0 A 4.5,4.5 0 1,0 -4.5,0 Z" fill="#FFFFFF" opacity="0.9"/>
        </g>
        
        {/* Cœur central symbolisant l'humanité */}
        <g transform="translate(100, 100)">
          <path d="M 0,-12 C -6,-16 -12,-10 -12,-4 C -12,2 -6,8 0,14 C 6,8 12,2 12,-4 C 12,-10 6,-16 0,-12 Z" 
                fill="url(#humanGradient)" filter="url(#glow)" opacity="0.95"/>
          
          {/* Main stylisée pour l'aide mutuelle */}
          <g transform="scale(0.8)">
            <path d="M -6,4 C -6,2 -4,0 -2,0 C 0,0 2,2 2,4 C 2,4 4,3 6,3 C 8,3 8,5 8,7 C 8,9 6,11 4,11 C 2,11 0,9 0,7 C -2,9 -4,11 -6,11 C -8,11 -8,9 -8,7 C -8,5 -8,4 -6,4 Z" 
                  fill="#FFFFFF" opacity="0.8"/>
          </g>
        </g>
        
        {/* Motifs géométriques modernes */}
        <g opacity="0.2">
          {/* Triangles d'harmonie */}
          <polygon points="100,20 105,35 95,35" fill="#FFFFFF"/>
          <polygon points="20,100 35,105 35,95" fill="#FFFFFF"/>
          <polygon points="100,180 95,165 105,165" fill="#FFFFFF"/>
          <polygon points="180,100 165,95 165,105" fill="#FFFFFF"/>
        </g>
        
        {/* Texte moderne */}
        <text x="100" y="190" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="300" fill="#FFFFFF" opacity="0.8" letterSpacing="2px">
          COEXIST
        </text>
      </svg>
    </div>
  );
}
