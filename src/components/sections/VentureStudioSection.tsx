import React, { useEffect, useRef, useState } from 'react';
import { VENTURE_STUDIO_CONTENT } from '../../data/siteContent';
import { gsap, prefersReducedMotion } from '../../utils/animations';
import { MagneticButton } from '../ui/MagneticButton';

interface VentureStudioSectionProps {
  onOpenInquiry: (topic?: string) => void;
}

export const VentureStudioSection: React.FC<VentureStudioSectionProps> = ({
  onOpenInquiry,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lifecycleHeaderRef = useRef<HTMLDivElement>(null);
  const lifecycleCardsRef = useRef<HTMLDivElement>(null);

  // Active contribution card
  const [selectedCardId, setSelectedCardId] = useState<string>('capital');

  // Active lifecycle stage (defaults to stage 01 Idea Evaluation)
  const [activeLifecycleIndex, setActiveLifecycleIndex] = useState<number>(0);
  const [justHitIndex, setJustHitIndex] = useState<number | null>(0);

  // User interaction pause flag for ambient roadmap auto-progression
  const isInteractingWithRoadmap = useRef(false);

  // SYNCHRONIZED TRAVELING LIGHT HIT SYSTEM:
  // Mathematical lockstep with the 5.2s laser beam animation
  // As the light strikes node 01 -> 02 -> 03 -> 04 -> 05, each stage lights up in real-time!
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const CYCLE_MS = 5200;
    // Milliseconds along the sine-wave track where the light hits each node
    const STAGE_HITS = [350, 1450, 2550, 3600, 4500];
    const startTime = Date.now();

    const interval = setInterval(() => {
      if (isInteractingWithRoadmap.current) return;

      const elapsed = (Date.now() - startTime) % CYCLE_MS;

      // Determine which node the light is currently hitting/passing
      let currentStage = 0;
      for (let i = STAGE_HITS.length - 1; i >= 0; i--) {
        if (elapsed >= STAGE_HITS[i]) {
          currentStage = i;
          break;
        }
      }

      setActiveLifecycleIndex((prev) => {
        if (prev !== currentStage) {
          setJustHitIndex(currentStage);
          return currentStage;
        }
        return prev;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // GSAP SCROLL & MOTION TRIGGERS (Animates whether user scrolls UP or DOWN)
  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance (Re-triggers on scroll up or down)
      const headItems = headerRef.current?.querySelectorAll('.vs-reveal-item');
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

      // 2. 4 Contribution Cards entrance (Re-triggers on scroll up or down)
      const cards = cardsRef.current?.querySelectorAll('.vs-exact-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 38, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 82%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // Continuous parallax scrub in both directions (smooth physical elevation)
        gsap.to(cards, {
          yPercent: -8,
          stagger: 0.03,
          ease: 'none',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // 3. Lifecycle Roadmap Header entrance (Re-triggers on scroll up or down)
      const lifeHeadItems =
        lifecycleHeaderRef.current?.querySelectorAll('.vs-life-reveal');
      if (lifeHeadItems) {
        gsap.fromTo(
          lifeHeadItems,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: lifecycleHeaderRef.current,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 4. Lifecycle Stage Cards entrance (Re-triggers on scroll up or down)
      const lifeCards =
        lifecycleCardsRef.current?.querySelectorAll('.vs-roadmap-card');
      if (lifeCards) {
        gsap.fromTo(
          lifeCards,
          { opacity: 0, y: 32, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: lifecycleCardsRef.current,
              start: 'top 82%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // Continuous parallax scrub in both directions
        gsap.to(lifeCards, {
          yPercent: -6,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: lifecycleCardsRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (id: string, title: string) => {
    setSelectedCardId(id);
    onOpenInquiry(`Venture Studio / ${title}`);
  };

  const handleStageSelect = (idx: number) => {
    setActiveLifecycleIndex(idx);
    setJustHitIndex(idx);
    isInteractingWithRoadmap.current = true;
    // Resume synchronized cycle after 7s of inactivity
    setTimeout(() => {
      isInteractingWithRoadmap.current = false;
    }, 7000);
  };

  const renderStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'search-doc':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <circle cx="11" cy="14" r="3" />
            <path d="m13.5 16.5 2.5 2.5" />
          </svg>
        );
      case 'bar-chart':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 20V10" />
            <path d="M12 20V4" />
            <path d="M6 20v-6" />
          </svg>
        );
      case 'layers':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );
      case 'rocket':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        );
      case 'growth-star':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 19 6-6 4 4 8-8" />
            <polygon points="21 7 21 3 17 3" fill="currentColor" stroke="none" />
            <circle cx="19" cy="5" r="1.5" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="venture-studio"
      ref={sectionRef}
      className="relative w-full bg-[#21191D] text-[#FFFFFF] py-20 md:py-28 lg:py-32 overflow-hidden border-t border-[#8F1028]/35"
    >
      {/* Background with Dark Burgundy Horizon & Soft Lighting (Seamless with #21191D) */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #21191D 0%, #300c17 40%, #460c1c 72%, #21191D 100%)',
          }}
        />

        {/* Soft Warm Radial Illumination Behind Cards */}
        <div
          className="absolute inset-0 opacity-35"
          style={{
            background:
              'radial-gradient(circle at 60% 25%, rgba(143, 16, 40, 0.4) 0%, rgba(89, 10, 28, 0.15) 50%, transparent 75%)',
          }}
        />

        {/* Distant City Skyline Atmosphere with Soft Gradient Mask */}
        <div
          className="absolute inset-0 opacity-12 mix-blend-luminosity pointer-events-none"
          style={{
            maskImage:
              'linear-gradient(90deg, transparent 0%, transparent 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.9) 95%)',
            WebkitMaskImage:
              'linear-gradient(90deg, transparent 0%, transparent 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.9) 95%)',
          }}
        >
          <img
            src="/images/downtown-skyline.webp"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-right photo-warm-grade"
          />
        </div>

        {/* Vertical Top & Bottom Fading Gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, #21191D 0%, transparent 12%, transparent 88%, #21191D 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <div ref={headerRef} className="max-w-3xl mb-12 lg:mb-14">
          {/* Eyebrow: — OUR VENTURE STUDIO */}
          <div className="vs-reveal-item inline-flex items-center gap-2.5 mb-3.5">
            <span className="w-5 h-[2px] bg-[#F2B824] rounded-full" />
            <span className="text-xs md:text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#F2B824]">
              {VENTURE_STUDIO_CONTENT.eyebrow}
            </span>
          </div>

          {/* Headline: From bold ideas to lasting companies. */}
          <h2 className="vs-reveal-item font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] leading-[1.08] tracking-tight">
            <span className="text-[#FFFFFF]">
              {VENTURE_STUDIO_CONTENT.headlinePart1}
            </span>
            <span className="text-[#F2B824]">
              {VENTURE_STUDIO_CONTENT.headlinePart2}
            </span>
          </h2>

          {/* Supporting Copy */}
          <p className="vs-reveal-item mt-4 text-sm sm:text-base text-[#F8F5EF]/80 leading-relaxed font-normal max-w-2xl">
            {VENTURE_STUDIO_CONTENT.supportingCopy}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 4 CONTRIBUTION CARDS WITH HIGH-END MOTION DESIGN (PC & MOBILE) */}
        {/* Auto-Animations: Floating 3D Assets, Shimmer Sweep, Glowing Floor Pedestal */}
        {/* ========================================================================= */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 xl:gap-6"
        >
          {VENTURE_STUDIO_CONTENT.contributions.map((item, idx) => {
            const isSelected = selectedCardId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.id, item.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleCardClick(item.id, item.title)
                }
                className={`vs-exact-card group relative rounded-[26px] sm:rounded-[30px] p-5 sm:p-6 lg:p-4.5 xl:p-6 flex flex-row items-center justify-between transition-all duration-400 ease-out cursor-pointer overflow-hidden border ${
                  isSelected
                    ? 'border-[#F2B824] shadow-[0_0_35px_rgba(242,184,36,0.38),0_20px_50px_rgba(0,0,0,0.85)] -translate-y-1.5 scale-[1.01]'
                    : 'border-[#8F1028]/55 hover:border-[#F2B824]/70 shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:-translate-y-1 hover:scale-[1.01]'
                }`}
                style={{
                  background:
                    'linear-gradient(135deg, rgba(65, 8, 24, 0.72) 0%, rgba(35, 5, 14, 0.88) 55%, rgba(18, 3, 8, 0.96) 100%)',
                  boxShadow: isSelected
                    ? 'inset 0 1px 1px rgba(255, 120, 170, 0.55), 0 0 35px rgba(242,184,36,0.35), 0 18px 45px rgba(0,0,0,0.85)'
                    : 'inset 0 1px 1px rgba(255, 90, 150, 0.42), 0 12px 35px rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Ambient Specular Light Sweep Animation Across Card */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[26px] sm:rounded-[30px]">
                  <div
                    className="absolute -inset-y-6 -inset-x-16 w-[60%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 animate-card-shimmer"
                    style={{ animationDelay: `${idx * 1.5}s` }}
                  />
                </div>

                {/* Specular neon top highlight sheen */}
                <div
                  className="absolute top-0 inset-x-0 h-[1.5px] pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255, 120, 170, 0.8) 30%, rgba(255, 200, 220, 0.95) 65%, transparent 100%)',
                  }}
                />

                {/* Left Side: Number Badge, Title, Description */}
                <div className="flex-1 min-w-0 pr-3 sm:pr-4 z-10 flex flex-col items-start justify-center">
                  {/* Pill Badge */}
                  <div className="inline-flex items-center justify-center px-3 py-0.5 rounded-full bg-[#2d050f]/85 border border-[#8F1028]/70 text-[11px] sm:text-xs font-mono font-bold text-white mb-2 shadow-inner">
                    <span>{item.number}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-display font-bold text-xl sm:text-2xl lg:text-[21px] xl:text-2xl leading-tight tracking-tight transition-colors duration-300 ${
                      isSelected ? 'text-[#F2B824]' : 'text-[#FFFFFF]'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-[13px] lg:text-xs xl:text-[13px] text-[#F8F5EF]/80 leading-relaxed max-w-[270px]">
                    {item.description}
                  </p>
                </div>

                {/* Right Side: Animated Floating 3D Illustration + Glowing Floor Pedestal */}
                <div className="relative shrink-0 w-28 sm:w-36 lg:w-28 xl:w-36 h-28 sm:h-32 lg:h-28 xl:h-32 flex items-center justify-center z-10">
                  {/* Glowing golden oval pedestal with breathing pulse */}
                  <div
                    className="absolute bottom-1 sm:bottom-2 inset-x-1 h-5 rounded-full pointer-events-none animate-pedestal-pulse"
                    style={{
                      background:
                        'radial-gradient(ellipse at 50% 50%, rgba(242,184,36,0.72) 0%, rgba(242,184,36,0.2) 55%, transparent 80%)',
                      filter: 'blur(3.5px)',
                      animationDelay: `${idx * 0.75}s`,
                    }}
                  />

                  {/* 3D Asset with lifelike floating motion */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className={`max-h-full max-w-full object-contain select-none transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-[0_12px_22px_rgba(0,0,0,0.7)] relative z-10 ${
                      idx % 2 === 0 ? 'animate-float-slow' : 'animate-float-alt'
                    }`}
                    style={{ animationDelay: `${idx * 0.6}s` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* VENTURE STUDIO LIFECYCLE ROADMAP */}
        {/* Traveling Laser Light Shining & Striking Nodes 01 -> 02 -> 03 -> 04 -> 05 */}
        {/* ========================================================================= */}
        <div
          className="mt-20 lg:mt-28 pt-16 border-t border-[#8F1028]/35"
          onMouseEnter={() => {
            isInteractingWithRoadmap.current = true;
          }}
          onMouseLeave={() => {
            isInteractingWithRoadmap.current = false;
          }}
          onTouchStart={() => {
            isInteractingWithRoadmap.current = true;
          }}
        >
          {/* Lifecycle Header */}
          <div
            ref={lifecycleHeaderRef}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16"
          >
            <div>
              {/* Eyebrow: VENTURE STUDIO LIFECYCLE */}
              <div className="vs-life-reveal inline-flex items-center gap-2 mb-2.5">
                <span className="w-5 h-[2px] bg-[#F2B824] rounded-full" />
                <span className="text-xs font-mono font-extrabold uppercase tracking-[0.24em] text-[#F2B824]">
                  {VENTURE_STUDIO_CONTENT.lifecycleEyebrow}
                </span>
              </div>

              {/* Headline: How We Build Ventures Alongside Founders */}
              <h3 className="vs-life-reveal font-display font-extrabold text-2xl sm:text-4xl lg:text-[42px] leading-[1.12] tracking-tight text-[#FFFFFF]">
                <span>{VENTURE_STUDIO_CONTENT.lifecycleHeadlinePart1}</span>
                <span className="text-[#F2B824]">
                  {VENTURE_STUDIO_CONTENT.lifecycleHeadlinePart2}
                </span>
              </h3>
            </div>

            {/* Subtitle with vertical divider */}
            <div className="vs-life-reveal flex items-center gap-4 lg:max-w-md">
              <span className="hidden lg:block w-[2px] h-12 bg-[#F2B824]/40 shrink-0 rounded-full" />
              <p className="text-xs sm:text-sm text-[#F8F5EF]/75 leading-relaxed font-normal">
                {VENTURE_STUDIO_CONTENT.lifecycleSubtitle}
              </p>
            </div>
          </div>

          {/* ROADMAP CONTAINER */}
          <div ref={lifecycleCardsRef} className="relative">
            {/* =================================================================== */}
            {/* DESKTOP VIEW (>= 1024px): Horizontal Sine Wave Line & Light Hits */}
            {/* =================================================================== */}
            <div className="hidden lg:block">
              {/* Continuous Sine Wave Path with Traveling Light Laser Beam */}
              <div className="relative w-full h-[100px] mb-2 select-none">
                <svg
                  viewBox="0 0 1200 100"
                  fill="none"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Base gradient ribbon */}
                    <linearGradient
                      id="roadmapSineGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#F2B824" />
                      <stop offset="22%" stopColor="#FF2A6D" />
                      <stop offset="68%" stopColor="#FF1E5A" />
                      <stop offset="100%" stopColor="#F2B824" />
                    </linearGradient>

                    {/* High-intensity traveling comet beam gradient */}
                    <linearGradient
                      id="laserShineGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="30%" stopColor="#FF2A6D" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                      <stop offset="70%" stopColor="#F2B824" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#F2B824" stopOpacity="0" />
                    </linearGradient>

                    {/* Laser glow filter */}
                    <filter
                      id="sineGlow"
                      x="-10%"
                      y="-10%"
                      width="120%"
                      height="120%"
                    >
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite
                        in="SourceGraphic"
                        in2="blur"
                        operator="over"
                      />
                    </filter>

                    <filter
                      id="laserGlowHigh"
                      x="-25%"
                      y="-25%"
                      width="150%"
                      height="150%"
                    >
                      <feGaussianBlur stdDeviation="3.5" result="blur1" />
                      <feGaussianBlur stdDeviation="7" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Starting dot on far left */}
                  <circle cx="50" cy="74" r="5" fill="#FFFFFF" opacity="0.9" />

                  {/* Base Continuous Wavy Sine Ribbon Line */}
                  <path
                    d="M 50 74 C 75 72, 90 54, 120 44 C 170 28, 205 24, 240 25 C 290 26, 325 38, 360 48 C 410 65, 445 74, 500 75 C 555 76, 585 64, 620 48 C 670 28, 705 24, 750 25 C 800 26, 835 42, 870 54 C 910 66, 945 72, 985 66 C 1030 58, 1070 38, 1145 22"
                    stroke="url(#roadmapSineGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="url(#sineGlow)"
                  />

                  {/* BLAZING LASER LIGHT SHINING & TRAVELING CONTINUOUSLY THROUGH THE ROADMAP */}
                  <path
                    d="M 50 74 C 75 72, 90 54, 120 44 C 170 28, 205 24, 240 25 C 290 26, 325 38, 360 48 C 410 65, 445 74, 500 75 C 555 76, 585 64, 620 48 C 670 28, 705 24, 750 25 C 800 26, 835 42, 870 54 C 910 66, 945 72, 985 66 C 1030 58, 1070 38, 1145 22"
                    stroke="url(#laserShineGrad)"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    filter="url(#laserGlowHigh)"
                    className="animate-roadmap-beam pointer-events-none"
                  />

                  {/* Arrowhead at the end swooping up with glowing pulse */}
                  <polygon
                    points="1140 14, 1160 20, 1144 32, 1148 23"
                    fill="#F2B824"
                    className="animate-arrow-end origin-center"
                  />
                </svg>

                {/* 5 Positioned Number Nodes Along the Curve */}
                <div className="absolute inset-0 grid grid-cols-5 pointer-events-auto">
                  {VENTURE_STUDIO_CONTENT.lifecycleStages.map((stage, idx) => {
                    const isActive = activeLifecycleIndex === idx;
                    const isJustHit = justHitIndex === idx;

                    return (
                      <div
                        key={stage.step}
                        className="relative flex flex-col items-center justify-end h-full"
                      >
                        {/* Interactive Node Button with Shockwave Ripple on Hit */}
                        <button
                          onClick={() => handleStageSelect(idx)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-extrabold text-xs transition-all duration-300 cursor-pointer shadow-lg z-20 ${
                            isJustHit
                              ? 'bg-[#F2B824] text-[#1a050d] ring-4 ring-[#F2B824]/50 scale-115 animate-node-hit shadow-[0_0_24px_#F2B824]'
                              : isActive
                              ? 'bg-[#F2B824] text-[#1a050d] ring-4 ring-[#F2B824]/30 scale-110 shadow-[0_0_20px_#F2B824]'
                              : 'bg-[#2a0512] text-[#FFFFFF] border-2 border-[#F2B824]/60 hover:border-[#F2B824] hover:scale-105'
                          }`}
                        >
                          {stage.step}
                        </button>

                        {/* Vertical dashed line connecting node to the card below */}
                        <div
                          className={`w-[1.5px] h-6 border-l-2 border-dashed mt-1 pointer-events-none transition-all duration-300 ${
                            isActive
                              ? 'border-[#F2B824] opacity-100 shadow-[0_0_8px_#F2B824]'
                              : 'border-[#F2B824]/40 opacity-60'
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5 Stage Cards Grid */}
              <div className="grid grid-cols-5 gap-3.5 xl:gap-4.5">
                {VENTURE_STUDIO_CONTENT.lifecycleStages.map((stage, idx) => {
                  const isActive = activeLifecycleIndex === idx;

                  return (
                    <div
                      key={stage.step}
                      onClick={() => handleStageSelect(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && handleStageSelect(idx)
                      }
                      className={`vs-roadmap-card group relative rounded-[24px] p-5.5 flex flex-col justify-between transition-all duration-400 ease-out cursor-pointer min-h-[220px] overflow-hidden ${
                        isActive
                          ? 'bg-[#250814]/95 border-2 border-[#F2B824] shadow-[0_0_32px_rgba(242,184,36,0.38),0_18px_45px_rgba(0,0,0,0.85)] -translate-y-2'
                          : 'bg-[#1a050f]/85 border border-[#4a0d1d]/60 hover:border-[#8F1028] shadow-md hover:-translate-y-1'
                      }`}
                    >
                      {/* Active glowing backdrop sheen */}
                      <div
                        className={`absolute inset-0 pointer-events-none transition-opacity duration-400 ${
                          isActive
                            ? 'bg-gradient-to-b from-[#F2B824]/10 via-transparent to-[#8F1028]/18 opacity-100'
                            : 'opacity-0'
                        }`}
                      />

                      {/* Squircle Icon at Top-Left */}
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105 mb-4 shrink-0 ${
                          isActive
                            ? 'bg-[#590A1C] text-[#F2B824] border-[#F2B824]/60 shadow-[0_0_15px_rgba(242,184,36,0.35)]'
                            : 'bg-[#3f0817] text-[#F2B824] border-[#8F1028]/50'
                        }`}
                      >
                        {renderStageIcon(stage.icon)}
                      </div>

                      {/* Content: Title & Description */}
                      <div className="relative z-10">
                        <h4
                          className={`font-display font-bold text-lg xl:text-xl tracking-tight transition-colors duration-300 ${
                            isActive ? 'text-[#F2B824]' : 'text-[#FFFFFF]'
                          }`}
                        >
                          {stage.title}
                        </h4>

                        <p className="mt-2 text-xs xl:text-[13px] text-[#F8F5EF]/80 leading-relaxed font-normal">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =================================================================== */}
            {/* MOBILE VIEW (< 1024px): VERTICAL ROADMAP TRACK WITH TRAVELING LASER */}
            {/* =================================================================== */}
            <div className="lg:hidden relative pl-12 sm:pl-16 space-y-5">
              {/* Continuous Vertical Glowing Line with Traveling Laser Beam */}
              <div className="absolute left-[19px] sm:left-[23px] top-4 bottom-8 w-[2.5px] bg-[#590A1C]/60 overflow-hidden rounded-full shadow-[0_0_8px_rgba(255,42,109,0.4)]">
                {/* Laser Light Beam Falling Continuously Down Through Track */}
                <div className="w-full h-32 bg-gradient-to-b from-transparent via-[#F2B824] to-transparent animate-vertical-laser" />
              </div>

              {/* 5 Vertical Stage Cards with Connected Nodes */}
              {VENTURE_STUDIO_CONTENT.lifecycleStages.map((stage, idx) => {
                const isActive = activeLifecycleIndex === idx;
                const isJustHit = justHitIndex === idx;

                return (
                  <div
                    key={stage.step}
                    className="relative flex items-center group"
                  >
                    {/* Number Node on the Vertical Track */}
                    <button
                      onClick={() => handleStageSelect(idx)}
                      className={`absolute -left-12 sm:-left-16 w-10 sm:w-11 h-10 sm:h-11 rounded-full flex items-center justify-center font-mono font-extrabold text-xs transition-all duration-300 z-10 cursor-pointer ${
                        isJustHit
                          ? 'bg-[#F2B824] text-[#1a050d] ring-4 ring-[#F2B824]/50 scale-115 animate-node-hit shadow-[0_0_20px_#F2B824]'
                          : isActive
                          ? 'bg-[#F2B824] text-[#1a050d] ring-4 ring-[#F2B824]/30 scale-110 shadow-[0_0_18px_#F2B824]'
                          : 'bg-[#2a0512] text-[#FFFFFF] border-2 border-[#F2B824]/60'
                      }`}
                    >
                      {stage.step}
                    </button>

                    {/* Horizontal Dashed Connector */}
                    <div
                      className={`absolute -left-2 w-2 h-[2px] border-t-2 border-dashed pointer-events-none transition-colors duration-300 ${
                        isActive ? 'border-[#F2B824]' : 'border-[#F2B824]/50'
                      }`}
                    />

                    {/* Stage Card */}
                    <div
                      onClick={() => handleStageSelect(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && handleStageSelect(idx)
                      }
                      className={`w-full p-4.5 sm:p-5 rounded-[22px] transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#250814]/95 border-2 border-[#F2B824] shadow-[0_0_25px_rgba(242,184,36,0.32)] -translate-y-0.5'
                          : 'bg-[#18040d]/90 border border-[#7a1228]/45 hover:border-[#F2B824]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-[#F2B824] shrink-0 border transition-colors ${
                            isActive
                              ? 'bg-[#590A1C] border-[#F2B824]/50 shadow-[0_0_12px_rgba(242,184,36,0.25)]'
                              : 'bg-[#3f0817] border-[#8F1028]/50'
                          }`}
                        >
                          {renderStageIcon(stage.icon)}
                        </div>
                        <h4
                          className={`font-display font-bold text-base sm:text-lg ${
                            isActive ? 'text-[#F2B824]' : 'text-white'
                          }`}
                        >
                          {stage.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#F8F5EF]/80 leading-relaxed pl-12">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM SUBTLE STUDIO BANNER & APPLICATION TRIGGER */}
        {/* ========================================================================= */}
        <div className="mt-14 pt-8 border-t border-[#FFFFFF]/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-[#F8F5EF]/75 max-w-xl text-center md:text-left leading-relaxed">
            <span className="text-[#F2B824] font-bold">Venture Partnership: </span>
            {VENTURE_STUDIO_CONTENT.investmentNote}
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <MagneticButton
              variant="gold"
              size="md"
              onClick={() => onOpenInquiry('Venture Studio / Idea Submission')}
            >
              {VENTURE_STUDIO_CONTENT.ctaLabel}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
