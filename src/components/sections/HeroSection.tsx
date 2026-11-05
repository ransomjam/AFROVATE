import React, { useEffect, useRef } from 'react';
import { HERO_CONTENT } from '../../data/siteContent';
import { gsap, prefersReducedMotion } from '../../utils/animations';

interface HeroSectionProps {
  isReady: boolean;
  onNavigate: (href: string) => void;
  onOpenInquiry: (topic?: string) => void;
  onSelectVenture?: (ventureId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isReady,
  onNavigate,
  onOpenInquiry,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const headlineLine3Ref = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const buildingWrapRef = useRef<HTMLDivElement>(null);

  // Synchronized entrance sequence
  useEffect(() => {
    if (!isReady || !sectionRef.current) return;

    if (prefersReducedMotion()) {
      gsap.set(
        [
          bgRef.current,
          headlineLine1Ref.current,
          headlineLine2Ref.current,
          headlineLine3Ref.current,
          copyRef.current,
          ctaRef.current,
          buildingWrapRef.current,
        ],
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Step 1: Animate background layer into view
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
      )
        // Step 2: "Growing up" architectural tower animation
        .fromTo(
          buildingWrapRef.current,
          {
            yPercent: 35,
            scaleY: 0.78,
            opacity: 0,
            transformOrigin: 'bottom center',
          },
          {
            yPercent: 0,
            scaleY: 1,
            opacity: 1,
            duration: 1.8,
            ease: 'power3.out',
          },
          '-=0.9'
        )
        // Step 3: Reveal 3-line headline in sequence
        .fromTo(
          [
            headlineLine1Ref.current,
            headlineLine2Ref.current,
            headlineLine3Ref.current,
          ],
          { opacity: 0, yPercent: 90, rotateX: -12 },
          {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: 'expo.out',
          },
          '-=1.2'
        )
        // Step 4: Bring in supporting text & CTAs
        .fromTo(
          copyRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.55'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.5'
        );

      // Continuous towering & elevation parallax as user scrolls up or down
      gsap.to(buildingWrapRef.current, {
        yPercent: -14,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#21191D] text-[#FFFFFF] overflow-hidden pt-28 pb-16 lg:py-0 flex items-center"
    >
      {/* BACKGROUND LAYER: Illuminated Corporate Building on Right + Burgundy Atmospheric Gradient */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
      >
        {/* Deep Burgundy & Charcoal Atmospheric Base Canvas */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg, #21191D 0%, #300612 35%, #4a0718 68%, #21191D 100%)',
          }}
        />

        {/* Illuminated Glass Corporate Office Building (Right Side) — Growing Up Animation */}
        <div
          ref={buildingWrapRef}
          className="absolute top-0 right-0 bottom-0 w-full lg:w-[62%] overflow-hidden opacity-60 lg:opacity-85"
          style={{
            maskImage:
              'linear-gradient(90deg, transparent 0%, transparent 12%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,1) 70%)',
            WebkitMaskImage:
              'linear-gradient(90deg, transparent 0%, transparent 12%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,1) 70%)',
          }}
        >
          <img
            src="/images/hero-mobile-building.webp"
            alt="Afrovate architectural corporate building with glowing interior lights"
            className="w-full h-full object-cover object-right-top photo-warm-grade"
          />

          {/* Upward Growing Horizon Laser Scanner across the building */}
          <div className="absolute inset-x-0 h-24 bg-gradient-to-t from-transparent via-[#F2B824]/30 to-transparent pointer-events-none animate-building-scan" />
        </div>

        {/* Smooth Atmospheric Overlays (Blending left text zone into dark burgundy) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #21191D 0%, rgba(33, 25, 29, 0.96) 38%, rgba(68, 7, 20, 0.65) 60%, rgba(33, 25, 29, 0.25) 85%, rgba(33, 25, 29, 0.5) 100%)',
          }}
        />

        {/* Smooth Top & Bottom Vertical Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(33, 25, 29, 0.7) 0%, transparent 18%, transparent 78%, #21191D 100%)',
          }}
        />

        {/* Dynamic Golden Swooping Waves at Bottom (Matches Reference Mockup) */}
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            {/* Bottom Left Subtle Warm Gold Gradient */}
            <linearGradient id="heroBottomLeftGold" x1="0%" y1="100%" x2="60%" y2="50%">
              <stop offset="0%" stopColor="#F2B824" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#8F1028" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#21191D" stopOpacity="0" />
            </linearGradient>

            {/* Bottom Right Sweeping Gold Wave Gradient */}
            <linearGradient id="heroBottomRightGold" x1="10%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F2B824" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#F2B824" stopOpacity="1" />
              <stop offset="100%" stopColor="#E5A812" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Bottom Left Curve */}
          <path
            d="M -40 840 C 80 845, 180 870, 360 905 L -40 905 Z"
            fill="url(#heroBottomLeftGold)"
          />

          {/* Bottom Right Bold Golden Sweep */}
          <path
            d="M 940 905 C 1070 885, 1200 845, 1450 770 L 1450 905 Z"
            fill="url(#heroBottomRightGold)"
          />
        </svg>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 lg:min-h-[820px] flex items-center justify-between pt-4 lg:pt-12 pb-12">
        {/* LEFT COLUMN: 3-Line Headline, Supporting Copy, Dual Buttons */}
        <div className="w-full lg:w-[60%] xl:w-[56%] z-20 flex flex-col items-start justify-center py-8 lg:py-16">
          {/* Staggered 3-Line Display Headline (Exact copy & styling from mockup) */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[68px] xl:text-[76px] leading-[1.06] tracking-tight">
            <span className="block overflow-hidden pb-1">
              <span ref={headlineLine1Ref} className="block text-[#FFFFFF]">
                {HERO_CONTENT.headlineLine1}
              </span>
            </span>
            <span className="block overflow-hidden pb-1 mt-1">
              <span ref={headlineLine2Ref} className="block text-[#FFFFFF]">
                {HERO_CONTENT.headlineLine2}
              </span>
            </span>
            <span className="block overflow-hidden pb-1 mt-1">
              <span ref={headlineLine3Ref} className="block text-[#F2B824]">
                {HERO_CONTENT.headlineGold}
              </span>
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            ref={copyRef}
            className="mt-7 text-base sm:text-lg lg:text-[20px] text-[#F8F5EF]/85 leading-relaxed max-w-xl font-normal"
          >
            {HERO_CONTENT.supportingText}
          </p>

          {/* Dual Action Buttons (Gold Pill + Light Outline Pill) */}
          <div
            ref={ctaRef}
            className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full sm:w-auto"
          >
            {/* Primary Gold Pill: Explore Our Ventures */}
            <button
              onClick={() => onNavigate(HERO_CONTENT.primaryCta.href)}
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#F2B824] hover:bg-[#e2a819] text-[#14060c] font-display font-bold text-base transition-all duration-300 shadow-[0_4px_22px_rgba(242,184,36,0.35)] hover:shadow-[0_6px_28px_rgba(242,184,36,0.55)] hover:scale-[1.02] cursor-pointer"
            >
              <span>{HERO_CONTENT.primaryCta.label}</span>
              <span
                className="transform group-hover:translate-x-1 transition-transform duration-300 font-bold"
                aria-hidden="true"
              >
                →
              </span>
            </button>

            {/* Secondary Outline Pill: Work With Us */}
            <button
              onClick={() => onOpenInquiry('Hero CTA — Work With Us')}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent hover:bg-white/10 text-[#FFFFFF] border border-white/45 hover:border-white font-display font-medium text-base transition-all duration-300 cursor-pointer"
            >
              <span>{HERO_CONTENT.secondaryCta.label}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
