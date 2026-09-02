import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
}) => {
  const iconDimensions = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  }[size];

  const textSize = {
    sm: 'text-base',
    md: 'text-lg md:text-xl',
    lg: 'text-xl md:text-2xl',
  }[size];

  const subTextSize = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-[11px]',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* 3D Isometric House Model with Parallel Base Line */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconDimensions}`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-300 group-hover:scale-105"
          aria-label="열린공간 아이소메트릭 로고"
        >
          {/* Isometric House Left Solid Shadow Facet */}
          <path
            d="M24 6L8 15.24V32.76L24 23.52V6Z"
            className="fill-[#2B2D2F] dark:fill-[#D4C3B3] transition-colors duration-300"
          />
          {/* Isometric House Right Open Light Facet with wireframe stroke & interior depth */}
          <path
            d="M24 6L40 15.24V32.76L24 23.52"
            className="stroke-[#2B2D2F] dark:stroke-[#D4C3B3] transition-colors duration-300"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Interior open space diagonal perspective accent */}
          <path
            d="M24 23.52L32 18.9V27.6L24 32.22"
            className="stroke-[#D4C3B3] dark:stroke-[#8C7A6B] transition-colors duration-300"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Parallel Base Support Lines */}
          <line
            x1="6"
            y1="38"
            x2="42"
            y2="38"
            className="stroke-[#2B2D2F] dark:stroke-[#D4C3B3] transition-colors duration-300"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="42"
            x2="36"
            y2="42"
            className="stroke-[#D4C3B3] dark:stroke-[#8C7A6B] transition-colors duration-300"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={`font-sans font-bold tracking-tight text-[#2B2D2F] dark:text-[#EAEAEA] ${textSize} transition-colors duration-300`}>
            열린공간
          </span>
          <span className={`font-mono font-medium tracking-widest text-[#D4C3B3] dark:text-[#D4C3B3] uppercase ${subTextSize} mt-0.5`}>
            OPEN SPACE
          </span>
        </div>
      )}
    </div>
  );
};
