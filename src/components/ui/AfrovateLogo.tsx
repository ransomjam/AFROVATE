import React from 'react';

interface AfrovateLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AfrovateLogo: React.FC<AfrovateLogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
}) => {
  const mainTextColor = variant === 'light' ? '#FFFFFF' : '#21191D';
  const subTextColor = variant === 'light' ? 'rgba(248, 245, 239, 0.85)' : '#590A1C';

  const dimensions = {
    sm: 'h-8',
    md: 'h-10 md:h-11',
    lg: 'h-14 md:h-16',
  }[size];

  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      aria-label="Afrovate Group"
    >
      <svg
        viewBox="0 0 265 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${dimensions} w-auto overflow-visible`}
      >
        <defs>
          <linearGradient id="afrovateSwooshGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#8F1028" />
            <stop offset="55%" stopColor="#8F1028" />
            <stop offset="100%" stopColor="#F2B824" />
          </linearGradient>
        </defs>

        {/* Stylized 'A' with Crimson left-stroke accent */}
        <path
          d="M19.5 8L4 42H12.2L15.2 34.5H27.8L30.8 42H39L23.5 8H19.5ZM17.8 27.8L21.5 18.2L25.2 27.8H17.8Z"
          fill={mainTextColor}
        />
        {/* Crimson slash overlay on leading edge of A */}
        <path d="M19.5 8L4 42H12.2L23.5 8H19.5Z" fill="#8F1028" />

        {/* FROVATE bold geometric typography */}
        <text
          x="42"
          y="41"
          fill={mainTextColor}
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="800"
          fontSize="37"
          letterSpacing="-0.02em"
        >
          FROVATE
        </text>

        {/* Signature Crimson & Warm Gold Horizon Swoosh under AFRO */}
        <path
          d="M3 52.5C28 43.2 74 42.5 118 50.5C82 47.2 36 48.2 3 52.5Z"
          fill="url(#afrovateSwooshGrad)"
        />
        <path
          d="M18 55.5C45 48.8 82 48.5 124 53.2C88 51.5 48 52.2 18 55.5Z"
          fill="#F2B824"
          opacity="0.9"
        />

        {/* GROUP sub-label under VATE */}
        <text
          x="133"
          y="58"
          fill={subTextColor}
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="600"
          fontSize="11.5"
          letterSpacing="0.42em"
        >
          GROUP
        </text>
      </svg>
    </div>
  );
};
