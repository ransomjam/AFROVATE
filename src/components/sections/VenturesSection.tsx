import React, { useEffect, useRef, useState } from 'react';
import { VENTURES_CONTENT, VentureItem } from '../../data/siteContent';
import { gsap, prefersReducedMotion } from '../../utils/animations';
import { MagneticButton } from '../ui/MagneticButton';

interface VenturesSectionProps {
  selectedVentureId?: string;
  onSelectVenture?: (id: string) => void;
  onOpenInquiry?: (topic?: string) => void;
}

// 4 repetitions = 16 items for perfectly smooth 0% -> -50% continuous infinite loop across all screens
const CONTINUOUS_VENTURES = [
  ...VENTURES_CONTENT.ventures,
  ...VENTURES_CONTENT.ventures,
  ...VENTURES_CONTENT.ventures,
  ...VENTURES_CONTENT.ventures,
];

export const VenturesSection: React.FC<VenturesSectionProps> = ({
  selectedVentureId,
  onSelectVenture,
  onOpenInquiry,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] = useState<string>(
    selectedVentureId || 'camtinel'
  );

  useEffect(() => {
    if (selectedVentureId) {
      setActiveId(selectedVentureId);
    }
  }, [selectedVentureId]);

  const activeVenture: VentureItem =
    VENTURES_CONTENT.ventures.find((v) => v.id === activeId) ||
    VENTURES_CONTENT.ventures[0];

  const handleSelect = (id: string) => {
    setActiveId(id);
    if (onSelectVenture) onSelectVenture(id);

    if (!prefersReducedMotion() && spotlightRef.current) {
      gsap.fromTo(
        spotlightRef.current,
        { opacity: 0.45, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
    }
  };

  // Entrance animations for section header
  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const headerItems = headerRef.current?.querySelectorAll('.venture-head-reveal');
      if (headerItems) {
        gsap.fromTo(
          headerItems,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderVentureBadge = (id: string) => {
    switch (id) {
      case 'afrodocs':
        return (
          <span className="w-8 h-8 rounded-lg bg-[#8F1028] text-[#FFFFFF] font-display font-extrabold text-base inline-flex items-center justify-center shadow-md shrink-0">
            A
          </span>
        );
      case 'camtinel':
        return (
          <span className="w-8 h-8 rounded-lg bg-[#8F1028] text-[#FFFFFF] inline-flex items-center justify-center shadow-md shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3L4 7V12C4 16.97 7.41 21.62 12 23C16.59 21.62 20 16.97 20 12V7L12 3Z"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="#F2B824"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        );
      case 'camiv':
        return (
          <span className="w-8 h-8 rounded-lg bg-[#590A1C] border border-[#F2B824]/40 text-[#F2B824] inline-flex items-center justify-center shadow-md shrink-0">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4L2 9L12 14L22 9L12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M6 11.5V16.5C6 18 8.69 19.5 12 19.5C15.31 19.5 18 18 18 16.5V11.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        );
      case 'ubatechcamp':
      default:
        return (
          <span className="w-8 h-8 rounded-lg bg-[#F2B824] text-[#21191D] font-mono font-extrabold text-xs inline-flex items-center justify-center shadow-md shrink-0">
            {'</>'}
          </span>
        );
    }
  };

  return (
    <section
      id="ventures"
      ref={sectionRef}
      className="relative w-full bg-[#21191D] text-[#FFFFFF] py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      {/* Atmospheric Background with Golden Hour Skyline & Sweeping Gold/Crimson Ribbons */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(125deg, #21191D 0%, #590A1C 45%, #8F1028 82%, #21191D 100%)',
          }}
        />
        {/* Golden Hour Downtown Skyline Silhouette on Lower Right */}
        <div className="absolute right-0 bottom-0 w-full lg:w-[68%] h-[48%] opacity-45 mix-blend-luminosity">
          <img
            src="/images/downtown-skyline.webp"
            alt="City skyline at golden hour"
            loading="lazy"
            className="w-full h-full object-cover object-bottom photo-warm-grade"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(33,25,29,0.96) 0%, rgba(89,10,28,0.84) 45%, rgba(33,25,29,0.5) 100%)',
          }}
        />

        {/* Sweeping Warm Gold & Deep Crimson Ribbon Wave */}
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ventureGoldWave" x1="0%" y1="100%" x2="100%" y2="30%">
              <stop offset="0%" stopColor="#8F1028" />
              <stop offset="35%" stopColor="#F2B824" />
              <stop offset="85%" stopColor="#F2B824" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8F1028" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M-60 880 C 260 690, 740 760, 1480 540 L 1480 910 L -60 910 Z"
            fill="url(#ventureGoldWave)"
            opacity="0.72"
          />
          <path
            d="M-40 900 C 310 755, 810 815, 1480 620 L 1480 915 L -40 915 Z"
            fill="#21191D"
            opacity="0.82"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full">
        {/* Section Header with Eyebrow and Title */}
        <div
          ref={headerRef}
          className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 mb-10"
        >
          <div className="venture-head-reveal inline-flex items-center gap-4 mb-4">
            <span className="text-xs md:text-[13px] font-extrabold uppercase tracking-[0.26em] text-[#F8F5EF]">
              {VENTURES_CONTENT.eyebrow}
            </span>
            <span className="w-16 h-[2.5px] bg-[#F2B824] rounded-full" />
          </div>

          <h2 className="venture-head-reveal font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.04] tracking-tight">
            <span className="italic text-[#FFFFFF]">Products built for </span>
            <span className="text-[#F2B824]">authentic community needs.</span>
          </h2>

          <p className="venture-head-reveal mt-4 text-base sm:text-lg text-[#F8F5EF]/85 max-w-2xl leading-relaxed">
            {VENTURES_CONTENT.supportingText}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CONTINUOUS NON-STOP HORIZONTAL REVEALING CONVEYOR */}
        {/* ========================================================================= */}
        <div className="relative w-full overflow-hidden py-4 select-none group/track">
          {/* Soft Edge Fade Vignettes (Cinematic shadows on left & right boundaries) */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 lg:w-44 z-30"
            style={{
              background:
                'linear-gradient(90deg, #21191D 0%, rgba(33,25,29,0.85) 45%, transparent 100%)',
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 lg:w-44 z-30"
            style={{
              background:
                'linear-gradient(270deg, #21191D 0%, rgba(33,25,29,0.85) 45%, transparent 100%)',
            }}
          />

          {/* Seamless 0% -> -50% Hardware-Accelerated Continuous Scrolling Ribbon */}
          <div
            className="flex items-stretch gap-6 lg:gap-8 will-change-transform group-hover/track:[animation-play-state:paused]"
            style={{
              animation: 'continuousHorizontalScroll 34s linear infinite',
              width: 'max-content',
            }}
          >
            {CONTINUOUS_VENTURES.map((venture, idx) => {
              const isSelected = venture.id === activeId;

              // Color schemes matching reference image
              const bottomFooterBg =
                venture.surfaceTheme === 'light' || venture.surfaceTheme === 'ivory'
                  ? 'bg-[#F8F5EF] text-[#21191D]'
                  : venture.surfaceTheme === 'crimson'
                  ? 'bg-gradient-to-b from-[#590A1C] to-[#21191D] text-[#FFFFFF]'
                  : 'bg-[#21191D] text-[#FFFFFF]';

              const subTextColor =
                venture.surfaceTheme === 'light' || venture.surfaceTheme === 'ivory'
                  ? 'text-[#21191D]/75'
                  : 'text-[#F8F5EF]/80';

              return (
                <div
                  key={`${venture.id}-${idx}`}
                  onClick={() => handleSelect(venture.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleSelect(venture.id)}
                  aria-label={`Select ${venture.name} — ${venture.tagline}`}
                  className={`group/card relative w-[290px] sm:w-[330px] lg:w-[365px] h-[480px] sm:h-[520px] lg:h-[560px] shrink-0 rounded-[28px] lg:-skew-x-[11deg] -skew-x-[7deg] overflow-hidden cursor-pointer transition-all duration-500 flex flex-col justify-between ${
                    isSelected
                      ? 'border-2 border-[#F2B824] shadow-[0_0_35px_rgba(242,184,36,0.38),0_25px_65px_rgba(0,0,0,0.85)] -translate-y-2.5 z-20'
                      : 'border border-[#FFFFFF]/20 hover:border-[#F2B824]/60 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:-translate-y-1.5 z-10 opacity-95 hover:opacity-100'
                  }`}
                >
                  {/* Top Device Photography Area (Authentic Screenshot) */}
                  <div className="relative h-[66%] sm:h-[68%] w-full overflow-hidden bg-[#21191D]">
                    <img
                      src={venture.cropImage}
                      alt={`${venture.name} — ${venture.tagline}`}
                      loading="lazy"
                      className={`w-full h-full object-cover object-top lg:skew-x-[11deg] skew-x-[7deg] transition-transform duration-700 ${
                        isSelected
                          ? 'scale-[1.28]'
                          : 'scale-[1.22] group-hover/card:scale-[1.28]'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#21191D]/75 via-transparent to-transparent pointer-events-none" />

                    {/* Number Badge (01, 02, 03, 04) */}
                    <div className="absolute top-3.5 left-4 lg:skew-x-[11deg] skew-x-[7deg] flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-[0.18em] shadow-md ${
                          isSelected || venture.id === 'camtinel'
                            ? 'bg-[#F2B824] text-[#21191D]'
                            : 'bg-[#21191D]/85 backdrop-blur-md text-[#F8F5EF] border border-[#F8F5EF]/20'
                        }`}
                      >
                        {venture.index}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Product Identity Plinth (Matches Ref Screenshot) */}
                  <div
                    className={`relative p-5 sm:p-6 lg:h-[34%] flex flex-col justify-between border-t-2 ${
                      isSelected || venture.id === 'camtinel'
                        ? 'border-[#F2B824]'
                        : 'border-[#8F1028]/50'
                    } ${bottomFooterBg}`}
                  >
                    <div className="lg:skew-x-[11deg] skew-x-[7deg]">
                      <div className="flex items-center gap-2.5">
                        {renderVentureBadge(venture.id)}
                        <h3 className="font-display italic font-extrabold text-2xl xl:text-[26px] tracking-tight">
                          {venture.name}
                        </h3>
                      </div>

                      <p
                        className={`mt-2 text-xs sm:text-[13px] font-medium leading-snug line-clamp-2 ${subTextColor}`}
                      >
                        {venture.tagline}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <a
                          href={venture.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] transition-colors cursor-pointer ${
                            venture.surfaceTheme === 'light' ||
                            venture.surfaceTheme === 'ivory'
                              ? 'text-[#8F1028] hover:text-[#590A1C]'
                              : 'text-[#F2B824] hover:text-[#FFFFFF]'
                          }`}
                        >
                          <span>EXPLORE</span>
                          <span>→</span>
                        </a>

                        {isSelected && (
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F2B824]">
                            ACTIVE SPOTLIGHT
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACTIVE VENTURE SPOTLIGHT DETAIL PANEL (SYNCS INSTANTLY WITH ANY CARD CLICK) */}
        {/* ========================================================================= */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 mt-10">
          <div
            ref={spotlightRef}
            className="rounded-[30px] bg-[#21191D]/90 backdrop-blur-xl border border-[#F2B824]/40 p-6 sm:p-8 lg:p-10 shadow-[0_25px_65px_rgba(0,0,0,0.65)]"
          >
            {/* Top Bar: Venture Index Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#F8F5EF]/12">
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-xs font-bold text-[#F8F5EF]/60 uppercase tracking-widest mr-2">
                  Select Venture:
                </span>
                {VENTURES_CONTENT.ventures.map((v) => {
                  const isSelected = v.id === activeVenture.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleSelect(v.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-[#8F1028] text-[#FFFFFF] border border-[#F2B824] shadow-md'
                          : 'bg-[#590A1C]/35 text-[#F8F5EF]/70 hover:text-[#FFFFFF] hover:bg-[#590A1C]/60'
                      }`}
                    >
                      {v.index}. {v.name}
                    </button>
                  );
                })}
              </div>

              <div className="text-xs text-[#F2B824] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2B824]" />
                <span>{activeVenture.deviceType}</span>
              </div>
            </div>

            {/* Spotlight Grid: Product Narrative & Capabilities */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-3">
                  {renderVentureBadge(activeVenture.id)}
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#F2B824] block">
                      {activeVenture.category}
                    </span>
                    <h3 className="font-display italic font-extrabold text-3xl sm:text-4xl text-[#FFFFFF] tracking-tight">
                      {activeVenture.name}
                    </h3>
                  </div>
                </div>

                <p className="mt-2 text-base font-bold text-[#F2B824]">
                  {activeVenture.tagline}
                </p>

                <p className="mt-4 text-sm sm:text-base text-[#F8F5EF]/85 leading-relaxed">
                  {activeVenture.description}
                </p>
              </div>

              <div className="lg:col-span-5 bg-[#590A1C]/25 rounded-2xl p-6 border border-[#F8F5EF]/10">
                <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F8F5EF]/70 mb-3">
                  Core Highlights & Capabilities
                </h4>
                <ul className="space-y-2.5">
                  {activeVenture.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F8F5EF]/90"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F2B824] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-[#F8F5EF]/12 flex flex-col sm:flex-row gap-3">
                  <MagneticButton
                    variant="gold"
                    size="md"
                    href={activeVenture.websiteUrl}
                    external={true}
                    className="w-full justify-center"
                  >
                    {activeVenture.websiteLabel}
                  </MagneticButton>

                  {onOpenInquiry && (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenInquiry(`Partnership inquiry for ${activeVenture.name}`)
                      }
                      className="px-4 py-2.5 rounded-full border border-[#F8F5EF]/30 text-xs font-bold text-[#F8F5EF] hover:bg-[#FFFFFF]/10 transition-colors cursor-pointer text-center"
                    >
                      Partner With Venture
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
