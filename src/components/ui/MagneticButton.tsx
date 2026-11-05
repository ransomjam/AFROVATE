import React, { useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'gold' | 'crimson' | 'outline-light' | 'outline-dark';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'gold',
  size = 'md',
  showArrow = true,
  external = false,
  className = '',
  ariaLabel,
}) => {
  const elRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion() || window.innerWidth < 1024 || !elRef.current) return;
    const rect = elRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(elRef.current, {
      x: x * 0.18,
      y: y * 0.18,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!elRef.current) return;
    gsap.to(elRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const variantClasses = {
    gold: 'bg-[#F2B824] text-[#21191D] hover:bg-[#FFFFFF] hover:text-[#21191D] shadow-[0_10px_30px_-8px_rgba(242,184,36,0.4)] border border-[#F2B824]',
    crimson:
      'bg-[#8F1028] text-[#FFFFFF] hover:bg-[#590A1C] border border-[#8F1028] hover:border-[#F2B824] shadow-[0_10px_30px_-8px_rgba(143,16,40,0.45)]',
    'outline-light':
      'bg-transparent text-[#FFFFFF] border border-[#F8F5EF]/35 hover:border-[#F2B824] hover:text-[#F2B824] hover:bg-[#590A1C]/40',
    'outline-dark':
      'bg-transparent text-[#21191D] border border-[#21191D]/25 hover:border-[#8F1028] hover:text-[#8F1028] hover:bg-[#8F1028]/5',
  }[variant];

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-xs md:text-sm',
    md: 'px-6 py-3.5 text-sm md:text-[15px]',
    lg: 'px-8 py-4 text-sm md:text-base',
  }[size];

  const baseClasses = `group relative inline-flex items-center justify-center gap-3 rounded-xl font-bold tracking-tight transition-colors duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B824] focus-visible:ring-offset-2 ${variantClasses} ${sizeClasses} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <span
          className="relative z-10 inline-flex items-center transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={elRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={elRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      className={baseClasses}
    >
      {content}
    </button>
  );
};
