import React, { useEffect, useRef } from 'react';
import { VENTURES_CONTENT, VentureItem } from '../../data/siteContent';
import { gsap, prefersReducedMotion } from '../../utils/animations';

interface VenturesSectionProps {
  selectedVentureId?: string;
  onSelectVenture?: (id: string) => void;
  onOpenInquiry?: (topic?: string) => void;
}

interface StageProps {
  venture: VentureItem;
}

/**
 * 3D Continuous Revolving Swap Stage (Njangiva & Camiv)
 * Modeled after the Alertz 3D mockup swap style with dramatic foreground zoom:
 * - Active center phone is prominently zoomed in (scale 1.28 -> 1.36)
 * - Flanked by left and right mockups angled inward in 3D space (scale 0.74, opacity 0.52)
 * - Distinct revolving directions:
 *   - Njangiva sweeps Right-to-Left (clockwise orbit, brisk ~2.8s pace)
 *   - Camiv sweeps Left-to-Right (counter-clockwise orbit, melodic ~4.0s pace)
 */
const SwapStage: React.FC<StageProps> = ({ venture }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  const isCamiv = venture.id === 'camiv';
  // Proportional widths for prominent 3D center + background wings
  const stageWidthClass = isCamiv
    ? 'w-[54%] sm:w-[48%] max-w-[250px]'
    : 'w-[48%] sm:w-[44%] max-w-[215px]';

  // Distinct paces: Njangiva is faster FinTech tempo (~2.8s); Camiv is relaxed EdTech tempo (~4.0s)
  const showcaseDur = isCamiv ? 2.6 : 1.7;
  const swapDur = isCamiv ? 1.4 : 1.1;

  const total = venture.mockups.length;

  useEffect(() => {
    if (prefersReducedMotion() || total <= 1 || !containerRef.current) return;

    const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length < 2) return;

    let isDisposed = false;
    let activeTl: gsap.core.Timeline | null = null;
    const N = slides.length;

    // Horizontal offset percentage for flanking mockups
    const xFlank = 52;
    const flankScale = 0.74;
    const centerStartScale = 1.28;
    const centerPeakScale = 1.36;

    // Clear any previous animations
    slides.forEach((slide) => gsap.killTweensOf(slide));

    // Initial setup:
    // Slide 0: Center (front, prominent, strongly zoomed in)
    // Slide 1: Right (background flank)
    // Slide N-1 (or Slide 2 if N=3): Left (background flank)
    // All others: Offstage
    slides.forEach((slide, i) => {
      if (i === 0) {
        gsap.set(slide, {
          xPercent: 0,
          yPercent: -2,
          scale: centerStartScale,
          opacity: 1,
          zIndex: 30,
          rotateY: 0,
          rotateZ: 0,
          transformOrigin: '50% 65%',
        });
      } else if (i === 1) {
        gsap.set(slide, {
          xPercent: xFlank,
          yPercent: 6,
          scale: flankScale,
          opacity: 0.52,
          zIndex: 15,
          rotateY: -12,
          rotateZ: 4,
          transformOrigin: '50% 65%',
        });
      } else if (i === (N > 2 ? N - 1 : 1)) {
        gsap.set(slide, {
          xPercent: -xFlank,
          yPercent: 6,
          scale: flankScale,
          opacity: 0.52,
          zIndex: 15,
          rotateY: 12,
          rotateZ: -4,
          transformOrigin: '50% 65%',
        });
      } else {
        gsap.set(slide, {
          xPercent: 0,
          yPercent: 16,
          scale: 0.62,
          opacity: 0,
          zIndex: 1,
          rotateY: 0,
          rotateZ: 0,
          transformOrigin: '50% 65%',
        });
      }
    });

    let currentIdx = 0;

    const runSwapCycle = () => {
      if (isDisposed) return;

      const tl = gsap.timeline({
        onComplete: () => {
          if (isDisposed) return;
          currentIdx = (currentIdx + 1) % N;
          runSwapCycle();
        },
      });

      activeTl = tl;

      if (isCamiv && N === 3) {
        // Camiv: 3 mockups revolving Left-to-Right
        const curCenterIdx = currentIdx % 3;
        const curRightIdx = (currentIdx + 1) % 3;
        const curLeftIdx = (currentIdx + 2) % 3;

        const curCenter = slides[curCenterIdx];
        const curRight = slides[curRightIdx];
        const curLeft = slides[curLeftIdx];

        // 1. Center phone breathes forward into pronounced zoom
        tl.to(curCenter, {
          scale: centerPeakScale,
          yPercent: -4,
          duration: showcaseDur,
          ease: 'power1.out',
        });
        tl.to(
          [curLeft, curRight],
          {
            yPercent: 4,
            duration: showcaseDur,
            ease: 'power1.out',
          },
          '<'
        );

        // 2. Left sweeps into Center (scaling up dramatically from 0.74 to 1.28)
        tl.to(
          curLeft,
          {
            xPercent: 0,
            yPercent: -2,
            scale: centerStartScale,
            opacity: 1,
            zIndex: 30,
            rotateY: 0,
            rotateZ: 0,
            duration: swapDur,
            ease: 'power2.inOut',
          },
          '>'
        );

        // Center sweeps to Right (scaling down from 1.36 to 0.74)
        tl.to(
          curCenter,
          {
            xPercent: xFlank,
            yPercent: 6,
            scale: flankScale,
            opacity: 0.52,
            zIndex: 15,
            rotateY: -12,
            rotateZ: 4,
            duration: swapDur,
            ease: 'power2.inOut',
          },
          '<'
        );

        // Right sweeps behind to Left
        tl.to(
          curRight,
          {
            xPercent: -xFlank,
            yPercent: 6,
            scale: flankScale,
            opacity: 0.52,
            zIndex: 10,
            rotateY: 12,
            rotateZ: -4,
            duration: swapDur,
            ease: 'power2.inOut',
          },
          '<'
        );
      } else {
        // Njangiva (or general N >= 3): Revolving Right-to-Left
        const curCenterIdx = currentIdx % N;
        const curRightIdx = (currentIdx + 1) % N;
        const curLeftIdx = (currentIdx - 1 + N) % N;
        const nextIncomingIdx = (currentIdx + 2) % N;

        const curCenter = slides[curCenterIdx];
        const curRight = slides[curRightIdx];
        const curLeft = slides[curLeftIdx];
        const nextIncoming = slides[nextIncomingIdx];

        // 1. Center phone breathes forward into pronounced zoom
        tl.to(curCenter, {
          scale: centerPeakScale,
          yPercent: -4,
          duration: showcaseDur,
          ease: 'power1.out',
        });
        tl.to(
          [curLeft, curRight],
          {
            yPercent: 4,
            duration: showcaseDur,
            ease: 'power1.out',
          },
          '<'
        );

        // 2. Right sweeps into Center (scaling up from 0.74 to 1.28)
        tl.to(
          curRight,
          {
            xPercent: 0,
            yPercent: -2,
            scale: centerStartScale,
            opacity: 1,
            zIndex: 30,
            rotateY: 0,
            rotateZ: 0,
            duration: swapDur,
            ease: 'power2.inOut',
          },
          '>'
        );

        // Center sweeps to Left (scaling down from 1.36 to 0.74)
        tl.to(
          curCenter,
          {
            xPercent: -xFlank,
            yPercent: 6,
            scale: flankScale,
            opacity: 0.52,
            zIndex: 15,
            rotateY: 12,
            rotateZ: -4,
            duration: swapDur,
            ease: 'power2.inOut',
          },
          '<'
        );

        if (N > 3) {
          // CurLeft recedes into queue
          tl.to(
            curLeft,
            {
              xPercent: -xFlank * 1.35,
              yPercent: 16,
              scale: 0.62,
              opacity: 0,
              zIndex: 5,
              duration: swapDur * 0.75,
              ease: 'power2.in',
            },
            '<'
          );

          // Next incoming enters into Right position
          tl.fromTo(
            nextIncoming,
            {
              xPercent: xFlank * 1.35,
              yPercent: 16,
              scale: 0.62,
              opacity: 0,
              zIndex: 5,
              rotateY: -12,
              rotateZ: 4,
            },
            {
              xPercent: xFlank,
              yPercent: 6,
              scale: flankScale,
              opacity: 0.52,
              zIndex: 15,
              duration: swapDur,
              ease: 'power2.out',
            },
            '<'
          );
        }
      }
    };

    runSwapCycle();

    return () => {
      isDisposed = true;
      if (activeTl) activeTl.kill();
      slides.forEach((s) => gsap.killTweensOf(s));
    };
  }, [total, isCamiv, showcaseDur, swapDur]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[400px] lg:h-[430px] overflow-hidden rounded-t-[28px] sm:rounded-t-[34px] select-none flex items-end justify-center pointer-events-none"
      style={{
        background: venture.gradientBackground,
        perspective: '1200px',
      }}
    >
      {/* Living Ambient Drift Light Beam */}
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

      {/* 3D Mockup Container */}
      <div className="relative w-full h-full flex items-end justify-center px-4 pb-3 sm:pb-4 overflow-hidden pointer-events-none">
        {venture.mockups.map((mockupUrl, idx) => (
          <div
            key={mockupUrl}
            ref={(el) => {
              slidesRef.current[idx] = el;
            }}
            className={`absolute bottom-0 h-[86%] sm:h-[88%] ${stageWidthClass} flex items-end justify-center pointer-events-none`}
            style={{
              willChange: 'transform, opacity',
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src={encodeURI(mockupUrl)}
              alt={`${venture.name} interface view ${idx + 1}`}
              loading="eager"
              decoding="async"
              className="w-full h-auto max-h-full object-contain pointer-events-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Camera Unidirectional Sweep Inspection Stage (AfroDocs & Camtinel)
 * 1. Takes the device close to the camera (scale 1.95 - 2.15).
 * 2. Pauses briefly to establish focus on the screen.
 * 3. Unidirectional Sweep Exit:
 *    - Sweeps UP (or DOWN) across the viewer's gaze, showcasing the entire interface,
 *      and continues all the way through until it exits out of frame (no backtracking).
 * 4. Concurrently, the next screen seamlessly rises into the primary slot.
 * 5. Distinct paces: AfroDocs is measured (~3.7s); Camtinel is rapid (~2.5s).
 */
const CameraInspectStage: React.FC<StageProps> = ({ venture }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  const isAfrodocs = venture.id === 'afrodocs';
  const stageWidthClass = isAfrodocs
    ? 'w-[92%] sm:w-[88%] max-w-[520px]'
    : 'w-[62%] sm:w-[58%] max-w-[280px]';

  const inspectScale = isAfrodocs ? 1.95 : 2.15;
  const exitScale = inspectScale * 1.08;

  // Speeds per app: AfroDocs is deliberate & thorough; Camtinel is agile & alert
  const zoomDur = isAfrodocs ? 1.1 : 0.85;
  const holdDur = isAfrodocs ? 0.55 : 0.35;
  const sweepDur = isAfrodocs ? 2.0 : 1.3;

  const total = venture.mockups.length;

  useEffect(() => {
    if (prefersReducedMotion() || total <= 1 || !containerRef.current) return;

    const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length < 2) return;

    let isDisposed = false;
    let activeTl: gsap.core.Timeline | null = null;
    const N = slides.length;

    // Initial setup
    slides.forEach((slide) => gsap.killTweensOf(slide));
    slides.forEach((slide, i) => {
      if (i === 0) {
        gsap.set(slide, {
          scale: 1.0,
          y: 0,
          yPercent: 0,
          opacity: 1,
          zIndex: 30,
          transformOrigin: '50% 65%',
        });
      } else if (i === 1) {
        gsap.set(slide, {
          scale: 0.90,
          y: 12,
          yPercent: 0,
          opacity: 0.88,
          zIndex: 20,
          transformOrigin: '50% 65%',
        });
      } else if (i === 2 && N > 2) {
        gsap.set(slide, {
          scale: 0.82,
          y: 22,
          yPercent: 0,
          opacity: 0.45,
          zIndex: 10,
          transformOrigin: '50% 65%',
        });
      } else {
        gsap.set(slide, {
          scale: 0.76,
          y: 30,
          yPercent: 0,
          opacity: 0,
          zIndex: 1,
          transformOrigin: '50% 65%',
        });
      }
    });

    let currentIdx = 0;

    const playInspectCycle = () => {
      if (isDisposed) return;

      const cur = slides[currentIdx];
      const nxt = slides[(currentIdx + 1) % N];
      const afterNxt = N > 2 ? slides[(currentIdx + 2) % N] : null;

      // Unidirectional sweep exit:
      // Even screen sweeps UP till exit off top; Odd screen sweeps DOWN till exit off bottom
      const isSweepUp = currentIdx % 2 === 0;
      const exitYPercent = isSweepUp ? -145 : 145;

      gsap.set(cur, { zIndex: 30 });
      gsap.set(nxt, { zIndex: 20 });
      if (afterNxt) gsap.set(afterNxt, { zIndex: 10 });

      const tl = gsap.timeline({
        onComplete: () => {
          if (isDisposed) return;

          // Recycle current screen cleanly to back of queue
          if (N === 2) {
            gsap.set(cur, {
              scale: 0.90,
              y: 12,
              yPercent: 0,
              opacity: 0.88,
              zIndex: 20,
            });
          } else {
            gsap.set(cur, {
              scale: 0.76,
              y: 30,
              yPercent: 0,
              opacity: 0,
              zIndex: 1,
            });
          }

          currentIdx = (currentIdx + 1) % N;
          playInspectCycle();
        },
      });

      activeTl = tl;

      // 1. Zoom close to camera
      tl.to(cur, {
        scale: inspectScale,
        y: 0,
        yPercent: 0,
        duration: zoomDur,
        ease: 'power2.out',
      });

      // 2. Brief focus hold so user can inspect the magnified interface
      tl.to(cur, {
        y: isSweepUp ? 3 : -3,
        duration: holdDur,
        ease: 'none',
      });

      // 3. Unidirectional sweep: glide across camera lens and continue all the way till exit!
      tl.to(
        cur,
        {
          yPercent: exitYPercent,
          scale: exitScale,
          opacity: 0,
          duration: sweepDur,
          ease: 'power1.inOut',
        },
        '>'
      );

      // 4. Concurrently, next screen rises into primary position
      const nxtEntryDelay = sweepDur * 0.45;
      tl.to(
        nxt,
        {
          scale: 1.0,
          y: 0,
          yPercent: 0,
          opacity: 1,
          duration: sweepDur * 0.65,
          ease: 'power2.out',
        },
        `<+=${nxtEntryDelay}`
      );

      // 5. If N > 2, slide after next steps to ready position underneath
      if (afterNxt && N > 2) {
        tl.to(
          afterNxt,
          {
            scale: 0.90,
            y: 12,
            yPercent: 0,
            opacity: 0.88,
            duration: sweepDur * 0.65,
            ease: 'power2.out',
          },
          '<'
        );
      }
    };

    playInspectCycle();

    return () => {
      isDisposed = true;
      if (activeTl) activeTl.kill();
      slides.forEach((s) => gsap.killTweensOf(s));
    };
  }, [total, isAfrodocs, zoomDur, holdDur, sweepDur, inspectScale, exitScale]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[400px] lg:h-[430px] overflow-hidden rounded-t-[28px] sm:rounded-t-[34px] select-none flex items-end justify-center pointer-events-none"
      style={{
        background: venture.gradientBackground,
        perspective: '1200px',
      }}
    >
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

      {/* Camera Dive & Inspect Container */}
      <div className="relative w-full h-full flex items-end justify-center px-4 pb-3 sm:pb-4 overflow-hidden pointer-events-none">
        {venture.mockups.map((mockupUrl, idx) => (
          <div
            key={mockupUrl}
            ref={(el) => {
              slidesRef.current[idx] = el;
            }}
            className={`absolute bottom-0 h-[88%] sm:h-[90%] ${stageWidthClass} flex items-end justify-center pointer-events-none`}
            style={{ willChange: 'transform, opacity' }}
          >
            <img
              src={encodeURI(mockupUrl)}
              alt={`${venture.name} interface view ${idx + 1}`}
              loading="eager"
              decoding="async"
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
  return (
    <article
      className="venture-card group relative bg-gradient-to-b from-[#280814]/95 via-[#1E0810]/95 to-[#15060C] rounded-[28px] sm:rounded-[34px] border border-[#590A1C]/75 hover:border-[#F2B824]/60 shadow-[0_20px_55px_rgba(0,0,0,0.65)] hover:shadow-[0_25px_65px_rgba(143,16,40,0.35)] overflow-hidden transition-all duration-500 flex flex-col justify-between hover:-translate-y-2"
    >
      {/* Top Gold Shimmer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F2B824]/30 to-transparent pointer-events-none" />

      {/* 1. Large Top Visual Stage: 3D Revolving Swap Stage (Njangiva & Camiv) or Camera Inspect Stage (AfroDocs & Camtinel) */}
      {venture.id === 'njangiva' || venture.id === 'camiv' ? (
        <SwapStage venture={venture} />
      ) : (
        <CameraInspectStage venture={venture} />
      )}

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
