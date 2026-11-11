import React from 'react';

export interface Scale54LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Scale54Logo: React.FC<Scale54LogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
}) => {
  const isLight = variant === 'light';
  const textColor = isLight ? '#FFFFFF' : '#21191D';
  // Gold accent matches the uploaded brand mark (#F0B427 / #F2B824)
  const goldColor = '#F0B427';

  const sizeClasses = {
    sm: 'text-xl sm:text-2xl tracking-[-0.035em]',
    md: 'text-2xl sm:text-3xl md:text-[32px] tracking-[-0.04em]',
    lg: 'text-4xl sm:text-5xl md:text-[56px] tracking-[-0.045em]',
  }[size];

  return (
    <div
      className={`inline-flex items-center select-none font-display font-extrabold uppercase leading-none transition-colors duration-200 ${sizeClasses} ${className}`}
      role="img"
      aria-label="Scale54"
    >
      <span style={{ color: textColor }}>SCALE</span>
      <span style={{ color: goldColor }}>54</span>
    </div>
  );
};

// Aliases for backwards compatibility
export const AfrovateLogo = Scale54Logo;
export default Scale54Logo;
