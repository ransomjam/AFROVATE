import React, { useEffect, useRef, useState } from 'react';
import { VENTURES_CONTENT, VentureItem } from '../../data/siteContent';
import { gsap, prefersReducedMotion } from '../../utils/animations';

interface VenturesSectionProps {
  selectedVentureId?: string;
  onSelectVenture?: (id: string) => void;
  onOpenInquiry?: (topic?: string) => void;
}

interface ProductCrashConfig {
  stageWidthClass: string;
  glanceScale: number;
  crashScale: number;
  durations: number[]; // Variable speeds between screens
}

const PRODUCT_CRASH_CONFIGS: Record<string, ProductCrashConfig> = {
  afrodocs: {
    // Wide horizontal stage for laptop document editor screens
    stageWidthClass: 'w-[90%] sm:w-[88%] max-w-[500px] lg:max-w-[530px]',
    glanceScale: 1.22,
    crashScale: 6.2,
    // Slower, majestic pace to study the document workspace; speed varies dynamically in between
    durations: [2.5, 1.8, 1.4, 2.2, 1.6, 2.0, 1.5],
  },
  camtinel: {
    stageWidthClass: 'w-[62%] sm:w-[58%] max-w-[280px]',
    glanceScale: 1.24,
    crashScale: 6.0,
    // Rapid, vigilant mobile security pace
    durations: [1.7, 1.2],
  },
  camiv: {
    stageWidthClass: 'w-[76%] sm:w-[72%] max-w-[400px]',
    glanceScale: 1.22,
    crashScale: 6.0,
    // Rhythmic, friendly EdTech pace
    durations: [2.2, 1.5, 1.9],
  },
  njangiva: {
    // Mobile financial screens in sharp portrait view
    stageWidthClass: 'w-[58%] sm:w-[54%] max-w-[260px]',
    glanceScale: 1.24,
    crashScale: 6.0,
    // Energetic, syncopated financial pace across all 6 screens
    durations: [1.8, 1.3, 2.0, 1.4, 1.7, 1.5],
  },
};

interface CameraCrashStageProps {
  venture: VentureItem;
  isHovered: boolean;
}

/**
 * Native GSAP Camera-Touch Crash Zoom Stage
 * Runs on a continuous GPU-accelerated GSAP timeline with zero glitch and zero pause:
 * Each screen glides forward in sharp focus, and then accelerates directly toward
 * the camera lens (scale 6.0x) until it touches the camera lens and plunges through,
 * with the incoming screen seamlessly taking over with varying speeds and distinct paces.
 */
const CameraCrashStage: React.FC<CameraCrashStageProps> = ({
  venture,
  isHovered,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const config: ProductCrashConfig = PRODUCT_CRASH_CONFIGS[venture.id] || {
    stageWidthClass: 'w-[60%] sm:w-[54%] max-w-[280px]',
    glanceScale: 1.24,
    crashScale: 6.0,
    durations: [2.0, 1.6],
  };

  const total = venture.mockups.length;

  // Build the continuous, glitch-free, pause-free GSAP timeline
  useEffect(() => {
    if (prefersReducedMotion() || total <= 1 || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
      if (slides.length < 2) return;

      const N = slides.length;
      const durations = config.durations;

      // Initial positions:
      // Slide 0 in front (scale 1.0, opacity 1, zIndex 30)
      // Slide 1 ready underneath (scale 0.90, opacity 1, zIndex 20)
      // All other slides cued behind (scale 0.85, opacity 0, zIndex 1)
      slides.forEach((slide, i) => {
        if (i === 0) {
          gsap.set(slide, {
            scale: 1.0,
            y: 0,
            opacity: 1,
            zIndex: 30,
            transformOrigin: 'bottom center',
          });
        } else if (i === 1) {
          gsap.set(slide, {
            scale: 0.90,
            y: 12,
            opacity: 1,
            zIndex: 20,
            transformOrigin: 'bottom center',
          });
        } else {
          gsap.set(slide, {
            scale: 0.85,
            y: 20,
            opacity: 0,
            zIndex: 1,
            transformOrigin: 'bottom center',
          });
        }
      });

      const tl = gsap.timeline({ repeat: -1 });

      for (let i = 0; i < N; i++) {
        const cur = slides[i];
        const nxt = slides[(i + 1) % N];
        const afterNxt = slides[(i + 2) % N];
        const dur = durations[i % durations.length];

        // 1. Glance duration: user inspects and reads the interface
        const glanceDur = dur * 0.72;
        // 2. Crash duration: high-velocity dive into the camera lens
        const crashDur = dur * 0.28;

        // Step A: Glance forward in high focus
        tl.to(cur, {
          scale: config.glanceScale,
          y: -12,
          duration: glanceDur,
          ease: 'power1.out',
        });

        // Step B: Crash Zoom — rushes directly into camera lens till it touches the camera!
        tl.to(
          cur,
          {
            scale: config.crashScale,
            y: -40,
            opacity: 0,
            duration: crashDur,
            ease: 'expo.in',
          },
          `> -${crashDur * 0.08}`
        );

        // Step C: Concurrently, next slide rises seamlessly into the front position (ZERO PAUSE!)
        tl.to(
          nxt,
          {
            scale: 1.0,
            y: 0,
            opacity: 1,
            zIndex: 30,
            duration: crashDur,
            ease: 'power2.out',
          },
          `<`
        );

        // Step D: Cue up the slide after next beneath
        if (N > 2) {
          tl.set(
            afterNxt,
            {
              scale: 0.90,
              y: 12,
              opacity: 1,
              zIndex: 20,
            },
            `<`
          );
        } else {
          // Dual slide alternating reset
          tl.set(
            cur,
            {
              scale: 0.90,
              y: 12,
              opacity: 1,
              zIndex: 20,
            },
            `>`
          );
        }

        // Step E: Reset cur behind stage once flown past
        if (N > 2) {
          tl.set(
            cur,
            {
              scale: 0.85,
              y: 20,
              opacity: 0,
              zIndex: 1,
            },
            `>`
          );
        }
      }

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, [total, config]);

  // Pause on hover so the user can inspect any screen closely without jumping
  useEffect(() => {
    if (!timelineRef.current) return;
    if (isHovered) {
      timelineRef.current.pause();
    } else {
      timelineRef.current.play();
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[400px] lg:h-[430px] overflow-hidden rounded-t-[28px] sm:rounded-t-[34px] select-none flex items-end justify-center"
      style={{
        background: venture.gradientBackground,
        perspective: '1200px',
      }}
    >
      {/* ========================================================================= */}
      {/* 1. LIVING ANIMATED BACKGROUND IN MOTION */}
      {/* ========================================================================= */}

      {/* Moving Ambient Radial Light Beam */}
      <div
        className="absolute inset-0 pointer-events-none animate-ambient-drift opacity-60 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at 50% 25%, ${venture.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Living Concentric Radar Ripples */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute -bottom-28 w-[660px] h-[660px] rounded-full border border-white/[0.08] bg-white/[0.02] animate-concentric-4 pointer-events-none" />
        <div className="absolute -bottom-22 w-[520px] h-[520px] rounded-full border border-white/[0.12] bg-white/[0.04] animate-concentric-3 pointer-events-none" />
        <div className="absolute -bottom-16 w-[400px] h-[400px] rounded-full border border-white/[0.16] bg-white/[0.06] animate-concentric-2 pointer-events-none" />
        <div className="absolute -bottom-10 w-[280px] h-[280px] rounded-full border border-white/[0.22] bg-white/[0.08] animate-concentric-1 pointer-events-none" />
      </div>

      {/* Top Shimmer Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none z-30" />

      {/* ========================================================================= */}
      {/* 2. GLITCH-FREE, PAUSE-FREE CONTINUOUS CAMERA DIVE-THROUGH */}
      {/* ========================================================================= */}
      <div className="relative w-full h-full flex items-end justify-center px-4 pb-3 sm:pb-4 overflow-hidden">
        {venture.mockups.map((mockupUrl, idx) => (
          <div
            key={mockupUrl}
            ref={(el) => {
              slidesRef.current[idx] = el;
            }}
            className={`absolute bottom-0 h-[88%] sm:h-[90%] ${config.stageWidthClass} flex items-end justify-center pointer-events-auto`}
          >
            <img
              src={encodeURI(mockupUrl)}
              alt={`${venture.name} interface view ${idx + 1}`}
              loading="lazy"
              className="w-full h-auto max-h-full object-contain pointer-events-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface VentureCardProps {
  venture: VentureItem;
  index: number;
}

const VentureCard: React.FC<VentureCardProps> = ({ venture }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <article
      className="venture-card group relative bg-gradient-to-b from-[#280814]/95 via-[#1E0810]/95 to-[#15060C] rounded-[28px] sm:rounded-[34px] border border-[#590A1C]/75 hover:border-[#F2B824]/60 shadow-[0_20px_55px_rgba(0,0,0,0.65)] hover:shadow-[0_25px_65px_rgba(143,16,40,0.35)] overflow-hidden transition-all duration-500 flex flex-col justify-between hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Gold Shimmer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F2B824]/30 to-transparent pointer-events-none" />

      {/* 1. Large Top Visual Stage with Smooth Camera Crash Zoom */}
      <CameraCrashStage venture={venture} isHovered={isHovered} />

      {/* 2. Refined Bottom Content: Less Text, More Beauty */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
        <div>
          {/* Header Row: Product Name (Left) + Distinct Category (Right in clean unhighlighted white) + Index */}
          <div className="flex items-center justify-between gap-4 mb-2.5">
            <h3 className="font-display font-extrabold text-2xl sm:text-[30px] text-white tracking-tight group-hover:text-[#F2B824] transition-colors duration-300">
              {venture.name}
            </h3>

            {/* Category to the right: clean white, uppercase, unhighlighted */}
            <div className="flex items-center gap-2.5 text-right shrink-0">
              <span className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
                {venture.category}
              </span>
              <span className="text-white/30 font-mono text-xs">/</span>
              <span className="font-mono text-xs font-bold text-white/50 tracking-widest">
                {venture.index}
              </span>
            </div>
          </div>

          {/* Short, Punchy Description */}
          <p className="text-sm sm:text-[15px] text-[#F8F5EF]/75 leading-relaxed font-normal mb-5 line-clamp-2">
            {venture.description}
          </p>
        </div>

        {/* 3. Link Row & Screen Count */}
        <div className="pt-3.5 border-t border-[#590A1C]/50 flex items-center justify-between">
          <a
            href={venture.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Explore ${venture.name} website`}
            className="inline-flex items-center gap-2 font-bold text-sm sm:text-[15px] text-[#F2B824] hover:text-white transition-colors duration-300 group/link"
          >
            <span>Explore product</span>
            <span className="inline-block transform group-hover/link:translate-x-1.5 transition-transform duration-300">
              →
            </span>
          </a>

          <span className="text-xs text-[#F8F5EF]/40 font-mono tracking-wider">
            {venture.mockups.length} screens
          </span>
        </div>
      </div>
    </article>
  );
};

export const VenturesSection: React.FC<VenturesSectionProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Staggered card entrance reveal animation
  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header entrance animation
      const headItems = headerRef.current?.querySelectorAll('.ventures-reveal-item');
      if (headItems) {
        gsap.fromTo(
          headItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 4 Venture Cards staggered reveal
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.venture-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ventures"
      aria-label="Our Ventures"
      className="relative w-full bg-[#21191D] text-[#F8F5EF] py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-[#8F1028]/35"
    >
      {/* Background with Dark Burgundy Horizon & Animated Living Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #21191D 0%, #2A0813 45%, #350A18 75%, #21191D 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-25 animate-ambient-mesh"
          style={{
            background:
              'radial-gradient(circle at 75% 25%, rgba(143, 16, 40, 0.4) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header: Matching Afrovate Signature Section Heading */}
        <div ref={headerRef} className="max-w-3xl mb-12 lg:mb-16">
          <div className="ventures-reveal-item inline-flex items-center gap-2.5 mb-3.5">
            <span className="w-5 h-[2px] bg-[#F2B824] rounded-full" />
            <span className="text-xs md:text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#F2B824]">
              {VENTURES_CONTENT.eyebrow}
            </span>
          </div>

          <h2 className="ventures-reveal-item font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] leading-[1.08] tracking-tight text-white">
            <span>Proprietary Products </span>
            <span className="text-[#F2B824]">Built For Impact</span>
          </h2>

          <p className="ventures-reveal-item mt-4 text-sm sm:text-base text-[#F8F5EF]/80 leading-relaxed font-normal max-w-2xl">
            {VENTURES_CONTENT.supportingText}
          </p>
        </div>

        {/* 2-Column Desktop Grid for the 4 Products */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8 items-stretch"
        >
          {VENTURES_CONTENT.ventures.map((venture, index) => (
            <VentureCard
              key={venture.id}
              venture={venture}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
