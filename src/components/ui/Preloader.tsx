import React, { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../../utils/animations';
import { AfrovateLogo } from './AfrovateLogo';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const goldBarRef = useRef<HTMLDivElement>(null);
  const crimsonBladeRef = useRef<HTMLDivElement>(null);
  const goldBladeRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setHidden(true);
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setHidden(true);
        },
      });

      // 1. Wordmark & gold progress line appear cleanly
      tl.fromTo(
        logoWrapRef.current,
        { opacity: 0, y: 18, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' }
      )
        .fromTo(
          goldBarRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.5, ease: 'expo.inOut' },
          '-=0.25'
        )
        // Trigger hero sequence slightly before curtain finishes lifting
        .call(
          () => {
            onComplete();
          },
          [],
          '+=0.05'
        )
        // 2. Short Crimson & Warm Gold diagonal visual reveal
        .to(logoWrapRef.current, {
          opacity: 0,
          y: -24,
          duration: 0.3,
          ease: 'power2.in',
        })
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.65,
            ease: 'expo.inOut',
          },
          '-=0.15'
        )
        .to(
          crimsonBladeRef.current,
          {
            yPercent: -100,
            duration: 0.72,
            ease: 'expo.inOut',
          },
          '-=0.58'
        )
        .to(
          goldBladeRef.current,
          {
            yPercent: -100,
            duration: 0.78,
            ease: 'expo.inOut',
          },
          '-=0.66'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Trailing Warm Gold Reveal Blade */}
      <div
        ref={goldBladeRef}
        className="absolute inset-0 bg-[#F2B824] origin-top"
      />
      {/* Middle Deep Crimson Reveal Blade */}
      <div
        ref={crimsonBladeRef}
        className="absolute inset-0 bg-[#8F1028] origin-top"
      />
      {/* Main Dark Burgundy Stage */}
      <div
        ref={containerRef}
        className="absolute inset-0 bg-[#21191D] flex flex-col items-center justify-center px-6"
      >
        {/* Subtle radial crimson glow */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, #590A1C 0%, #21191D 70%)',
          }}
        />
        <div ref={logoWrapRef} className="relative z-10 flex flex-col items-center">
          <AfrovateLogo variant="light" size="lg" />
          <div className="mt-6 w-48 h-[2px] bg-[#590A1C] overflow-hidden rounded-full">
            <div
              ref={goldBarRef}
              className="w-full h-full bg-gradient-to-r from-[#8F1028] via-[#F2B824] to-[#F2B824]"
            />
          </div>
          <span className="mt-3 text-[10px] uppercase tracking-[0.35em] text-[#F8F5EF]/60 font-semibold">
            Technology • Ventures • Growth
          </span>
        </div>
      </div>
    </div>
  );
};
