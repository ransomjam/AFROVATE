import React, { useEffect, useRef } from 'react';
import { animateStaggerReveal } from '../../utils/animations';

interface SectionHeadingProps {
  eyebrow: string;
  headline: React.ReactNode;
  description?: string;
  theme?: 'dark' | 'light';
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  headline,
  description,
  theme = 'light',
  align = 'left',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const targets = containerRef.current.querySelectorAll('.reveal-heading-item');
    const anim = animateStaggerReveal(targets, containerRef.current, {
      y: 36,
      stagger: 0.12,
      duration: 0.9,
    });
    return () => {
      anim?.kill();
    };
  }, []);

  const isDark = theme === 'dark';
  const eyebrowColor = isDark ? 'text-[#F8F5EF]/90' : 'text-[#8F1028]';
  const headlineColor = isDark ? 'text-[#FFFFFF]' : 'text-[#21191D]';
  const descColor = isDark ? 'text-[#F8F5EF]/80' : 'text-[#21191D]/80';

  return (
    <div
      ref={containerRef}
      className={`${align === 'center' ? 'text-center mx-auto max-w-3xl' : ''} ${className}`}
    >
      {/* Eyebrow + Warm Gold horizontal rule */}
      <div
        className={`reveal-heading-item inline-flex items-center gap-4 mb-4 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span
          className={`text-xs md:text-[13px] font-extrabold uppercase tracking-[0.24em] ${eyebrowColor}`}
        >
          {eyebrow}
        </span>
        <span
          className="w-12 md:w-16 h-[2.5px] bg-[#F2B824] inline-block rounded-full"
          aria-hidden="true"
        />
      </div>

      {/* Main Expressive Display Headline */}
      <h2
        className={`reveal-heading-item font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.08] tracking-tight ${headlineColor}`}
      >
        {headline}
      </h2>

      {/* Optional Supporting Copy */}
      {description && (
        <p
          className={`reveal-heading-item mt-5 text-base md:text-lg leading-relaxed font-normal max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${descColor}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
