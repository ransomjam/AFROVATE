import React, { useState } from 'react';

export interface HeroShowcaseVenture {
  id: string;
  name: string;
  image: string;
  type: 'laptop' | 'video' | 'classroom' | 'phone';
}

export const HERO_SHOWCASE_VENTURES: HeroShowcaseVenture[] = [
  {
    id: 'afrodocs',
    name: 'AfroDocs',
    image: '/images/venture-afrodocs.webp',
    type: 'laptop',
  },
  {
    id: 'ubatechcamp',
    name: 'UbaTechCamp',
    image: '/images/venture-ubatechcamp.webp',
    type: 'video',
  },
  {
    id: 'camiv',
    name: 'Camiv',
    image: '/images/venture-camiv.webp',
    type: 'classroom',
  },
  {
    id: 'camtinel',
    name: 'Camtinel',
    image: '/images/venture-camtinel.webp',
    type: 'phone',
  },
];

interface HeroVenturesSliderProps {
  onSelectVenture: (id: string) => void;
  variant?: 'desktop' | 'mobile';
}

export const HeroVenturesSlider: React.FC<HeroVenturesSliderProps> = ({
  onSelectVenture,
  variant = 'desktop',
}) => {
  const isDesktop = variant === 'desktop';
  const skewClass = isDesktop ? '-skew-x-[11deg]' : '-skew-x-[6deg]';
  const unskewClass = isDesktop ? 'skew-x-[11deg]' : 'skew-x-[6deg]';

  const [hoveredVenture, setHoveredVenture] = useState<string | null>(null);

  return (
    <div
      className={`relative select-none ${
        isDesktop
          ? 'w-full max-w-[500px] lg:max-w-[530px] xl:max-w-[560px]'
          : 'w-full max-w-[360px] mx-auto'
      }`}
    >
      {/* Outer Radiant Glowing Neon Aura outlining the tilted slab */}
      <div
        className={`absolute inset-0 ${skewClass} rounded-[44px] pointer-events-none transition-opacity duration-500`}
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(242,184,36,0.85) 0%, rgba(143,16,40,0.65) 60%, transparent 100%)',
          filter: isDesktop ? 'blur(26px)' : 'blur(16px)',
          opacity: 0.65,
        }}
        aria-hidden="true"
      />

      {/* Main 4-Tier Tilted Slab Frame (Matches Reference Image Exactly) */}
      <div
        className={`relative z-20 w-full ${
          isDesktop ? 'h-[630px]' : 'h-[510px]'
        } ${skewClass} rounded-[38px] lg:rounded-[44px] border-[3.5px] border-[#F2B824] bg-[#14040a]/95 backdrop-blur-md shadow-[0_0_35px_rgba(242,184,36,0.65),0_0_80px_rgba(242,184,36,0.22),0_25px_65px_rgba(0,0,0,0.92)] overflow-hidden flex flex-col justify-between`}
      >
        {/* Subtle Glass Sheen Diagonal Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-30 opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 45%, rgba(242,184,36,0.2) 80%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* 4 STACKED TIERS */}
        {HERO_SHOWCASE_VENTURES.map((venture, idx) => {
          const isHovered = hoveredVenture === venture.id;
          const isLast = idx === HERO_SHOWCASE_VENTURES.length - 1;

          return (
            <React.Fragment key={venture.id}>
              <div
                onClick={() => onSelectVenture(venture.id)}
                onMouseEnter={() => setHoveredVenture(venture.id)}
                onMouseLeave={() => setHoveredVenture(null)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectVenture(venture.id)}
                className={`group/tier relative flex-1 flex items-center justify-between px-6 sm:px-8 cursor-pointer transition-colors duration-300 overflow-hidden ${
                  isHovered ? 'bg-[#350715]/40' : 'bg-transparent'
                }`}
              >
                {/* Left Side: Venture Brand Name + Gold Underline Dash */}
                <div className={`z-20 shrink-0 ${unskewClass}`}>
                  <h3 className="font-display italic font-extrabold text-xl sm:text-2xl text-[#FFFFFF] tracking-tight group-hover/tier:text-[#F2B824] transition-colors duration-300 drop-shadow-md">
                    {venture.name}
                  </h3>
                  <span
                    className="block w-8 sm:w-9 h-[2.5px] bg-[#F2B824] rounded-full mt-1.5 shadow-[0_0_8px_rgba(242,184,36,0.6)]"
                    aria-hidden="true"
                  />
                </div>

                {/* Right Side: Realistic Device Preview matching Mockup */}
                <div
                  className={`relative z-10 flex items-center justify-end h-full overflow-hidden ${unskewClass} transition-transform duration-500 ease-out group-hover/tier:scale-105`}
                >
                  {/* TIER 1: AfroDocs Laptop/Desktop Document UI (Dissertation Page) */}
                  {venture.type === 'laptop' && (
                    <div className="relative w-[190px] sm:w-[250px] lg:w-[280px] h-[98px] sm:h-[120px] rounded-tl-2xl overflow-hidden border-t-2 border-l-2 border-[#8F1028]/80 shadow-[0_10px_30px_rgba(0,0,0,0.85)] bg-[#1a050d]">
                      {/* Top Browser Bar */}
                      <div className="h-4 sm:h-5 bg-[#3a0614] flex items-center justify-between px-2.5 border-b border-[#8F1028]/60">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#FF2A55]" />
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#F2B824]" />
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#34D399]" />
                          <span className="text-[9px] font-mono text-[#F8F5EF]/85 ml-1 font-bold">
                            AfroDocs
                          </span>
                        </div>
                        <div className="flex items-center gap-1 opacity-60">
                          <span className="w-2 h-0.5 bg-white" />
                          <span className="w-1.5 h-1.5 border border-white" />
                        </div>
                      </div>
                      {/* Document Workspace Preview */}
                      <div className="relative w-full h-full bg-[#F5F6F8] flex overflow-hidden">
                        {/* Left Mini Sidebar */}
                        <div className="w-[48px] sm:w-[58px] bg-[#FFFFFF] border-r border-gray-200 p-1.5 flex flex-col gap-1 shrink-0">
                          <div className="h-1.5 w-7 bg-[#8F1028] rounded-full" />
                          <div className="h-1 w-6 bg-gray-200 rounded-full mt-1" />
                          <div className="h-1 w-5 bg-gray-200 rounded-full" />
                          <div className="h-1 w-7 bg-gray-200 rounded-full" />
                        </div>
                        {/* Document Sheet */}
                        <div className="flex-1 p-2 sm:p-2.5 bg-[#FFFFFF] m-1 rounded shadow-sm border border-gray-100 flex flex-col items-center">
                          <span className="text-[10px] sm:text-[11px] font-serif font-bold text-gray-900 tracking-tight">
                            Dissertation
                          </span>
                          <div className="w-full mt-1.5 space-y-1">
                            <div className="h-0.5 sm:h-1 w-full bg-gray-200 rounded-full" />
                            <div className="h-0.5 sm:h-1 w-[90%] bg-gray-200 rounded-full" />
                            <div className="h-0.5 sm:h-1 w-[95%] bg-gray-200 rounded-full" />
                            <div className="h-0.5 sm:h-1 w-[75%] bg-gray-200 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TIER 2: UbaTechCamp Video Learning Player */}
                  {venture.type === 'video' && (
                    <div className="relative w-[190px] sm:w-[250px] lg:w-[280px] h-[98px] sm:h-[120px] rounded-tl-2xl overflow-hidden border-t-2 border-l-2 border-[#8F1028]/80 shadow-[0_10px_30px_rgba(0,0,0,0.85)] bg-[#1c0812]">
                      {/* Top Player Header */}
                      <div className="h-4 sm:h-5 bg-[#3a0614] flex items-center justify-between px-2.5 border-b border-[#8F1028]/60">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#FF2A55]" />
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#F2B824]" />
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#34D399]" />
                          <span className="text-[9px] font-mono text-[#F8F5EF]/85 ml-1 font-bold">
                            UbaTechCamp
                          </span>
                        </div>
                        <span className="text-[8px] font-mono text-[#FF2A55] font-bold">● LIVE</span>
                      </div>
                      {/* Video Preview */}
                      <div className="relative w-full h-full bg-[#0a0205]">
                        <img
                          src={venture.image}
                          alt="UbaTechCamp Video Class"
                          className="w-full h-full object-cover object-center photo-warm-grade"
                        />
                        {/* Red Center Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-[#FF1E4E] text-white flex items-center justify-center shadow-[0_0_12px_rgba(255,30,78,0.8)] border border-white/40">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TIER 3: Camiv Live Interactive Tutoring Classroom */}
                  {venture.type === 'classroom' && (
                    <div className="relative w-[190px] sm:w-[250px] lg:w-[280px] h-[98px] sm:h-[120px] rounded-tl-2xl overflow-hidden border-t-2 border-l-2 border-[#8F1028]/80 shadow-[0_10px_30px_rgba(0,0,0,0.85)] bg-[#21191D]">
                      {/* Top Tutoring Header */}
                      <div className="h-4 sm:h-5 bg-[#3a0614] flex items-center justify-between px-2.5 border-b border-[#8F1028]/60">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#FF2A55]" />
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#F2B824]" />
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#34D399]" />
                          <span className="text-[9px] font-mono text-[#F8F5EF]/85 ml-1 font-bold">
                            Camiv
                          </span>
                        </div>
                      </div>
                      <div className="relative w-full h-full bg-[#14040a]">
                        <img
                          src={venture.image}
                          alt="Camiv Online Tutoring Session"
                          className="w-full h-full object-cover object-center photo-warm-grade"
                        />
                      </div>
                    </div>
                  )}

                  {/* TIER 4: Camtinel Mobile Security Phone Shield */}
                  {venture.type === 'phone' && (
                    <div className="relative w-[140px] sm:w-[170px] lg:w-[190px] h-[105px] sm:h-[125px] rounded-t-3xl overflow-hidden border-t-[3px] border-x-[3px] border-[#590A1C] shadow-[0_12px_35px_rgba(0,0,0,0.9)] bg-[#100408]">
                      {/* Top Phone Notch */}
                      <div className="h-3.5 bg-[#000000] flex items-center justify-center">
                        <div className="w-12 h-2 rounded-full bg-[#20050e]" />
                      </div>
                      <div className="relative w-full h-full bg-[#18040a]">
                        <img
                          src={venture.image}
                          alt="Camtinel Mobile Security Shield"
                          className="w-full h-full object-cover object-top photo-warm-grade"
                        />
                        {/* Subtle Glowing Shield Pulse */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-10 h-10 rounded-full bg-[#FF1E4E]/20 blur-md" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Crimson Glowing Neon Laser Beam Divider between Tiers */}
              {!isLast && (
                <div className="relative w-full h-[2px] z-20 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF1E4E] to-transparent opacity-95" />
                  <div className="absolute -top-[2px] -bottom-[2px] inset-x-0 bg-gradient-to-r from-transparent via-[#FF1E4E] to-transparent blur-[3px] opacity-80" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
