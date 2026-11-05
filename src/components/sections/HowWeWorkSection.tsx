import React, { useEffect, useRef, useState } from 'react';
import { HOW_WE_WORK_CONTENT } from '../../data/siteContent';
import { gsap, prefersReducedMotion } from '../../utils/animations';

export const HowWeWorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activePathway, setActivePathway] = useState<'client' | 'venture'>('client');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const stepNodes = containerRef.current?.querySelectorAll('.process-node-card');
      if (stepNodes) {
        gsap.fromTo(
          stepNodes,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: 'back.out(1.2)',
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activePathway]);

  const currentSteps =
    activePathway === 'client'
      ? HOW_WE_WORK_CONTENT.clientPath.steps
      : HOW_WE_WORK_CONTENT.venturePath.steps;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full bg-[#21191D] text-[#F8F5EF] py-20 md:py-28 lg:py-36 overflow-hidden border-t border-[#8F1028]/30"
    >
      {/* Lower-Right Horizon Backdrop & Sweeping Crimson-Gold Wave */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute right-0 bottom-0 w-full lg:w-[65%] h-[52%] opacity-10">
          <img
            src="/images/downtown-skyline.webp"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-top photo-warm-grade"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#21191D] via-[#21191D]/80 to-[#21191D]" />
        </div>

        <svg
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 right-0 w-full h-36 md:h-48"
          aria-hidden="true"
        >
          <path
            d="M0 220 C 320 140, 620 290, 1020 240 C 1220 215, 1350 165, 1440 130 L 1440 320 L 0 320 Z"
            fill="#8F1028"
            opacity="0.92"
          />
          <path
            d="M0 265 C 360 195, 720 310, 1140 260 C 1290 240, 1380 205, 1440 185 L 1440 320 L 0 320 Z"
            fill="#590A1C"
          />
          <path
            d="M280 320 C 620 250, 980 285, 1440 175 L 1440 205 C 980 305, 620 275, 280 320 Z"
            fill="#F2B824"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-16">
        {/* Section Header + Pathway Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-4 mb-4">
              <span className="text-xs md:text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#F2B824]">
                {HOW_WE_WORK_CONTENT.eyebrow}
              </span>
              <span className="w-16 h-[2.5px] bg-[#8F1028] rounded-full" />
            </div>

            <h2 className="font-display italic font-extrabold text-3xl sm:text-5xl lg:text-[54px] leading-[1.06] tracking-tight text-[#FFFFFF]">
              Clear Expectations.{' '}
              <span className="text-[#F2B824] block sm:inline">Two Transparent Pathways.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#F8F5EF]/85 leading-relaxed">
              {HOW_WE_WORK_CONTENT.supportingText}
            </p>
          </div>

          {/* Interactive Dual-Pathway Selector */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#1c1318]/90 border-2 border-[#8F1028]/40 shadow-lg self-start lg:self-end">
            <button
              type="button"
              onClick={() => {
                setActivePathway('client');
                setActiveStepIndex(0);
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-tight transition-all cursor-pointer flex items-center gap-2 ${
                activePathway === 'client'
                  ? 'bg-[#8F1028] text-[#FFFFFF] shadow-md'
                  : 'text-[#F8F5EF]/70 hover:text-[#F2B824]'
              }`}
            >
              <span>Path A:</span>
              <span>Client Delivery</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActivePathway('venture');
                setActiveStepIndex(0);
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-tight transition-all cursor-pointer flex items-center gap-2 ${
                activePathway === 'venture'
                  ? 'bg-[#8F1028] text-[#FFFFFF] shadow-md'
                  : 'text-[#F8F5EF]/70 hover:text-[#F2B824]'
              }`}
            >
              <span>Path B:</span>
              <span>Venture Co-Creation</span>
            </button>
          </div>
        </div>

        {/* Current Pathway Summary Banner */}
        <div className="mb-10 p-5 rounded-2xl bg-[#590A1C]/25 border-l-4 border-[#F2B824] shadow-sm flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#F2B824]">
              {activePathway === 'client'
                ? HOW_WE_WORK_CONTENT.clientPath.title
                : HOW_WE_WORK_CONTENT.venturePath.title}
            </div>
            <div className="text-sm font-bold text-[#FFFFFF] mt-0.5">
              {activePathway === 'client'
                ? 'Agreed deliverables, clear milestone governance and transparent progress reviews.'
                : 'Collaborative co-creation from initial market validation to live product rollout and founder operational leadership.'}
            </div>
          </div>
          <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-[#F2B824]/20 text-[#F2B824] border border-[#F2B824]/30 shrink-0">
            {currentSteps.length} Milestones
          </span>
        </div>

        {/* ========================================================================= */}
        {/* PROGRESSIVE STEPS CONTAINER */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          className={`grid gap-6 ${
            activePathway === 'client'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {currentSteps.map((step, index) => {
            const isActive = activeStepIndex === index;
            return (
              <div
                key={step.number}
                onMouseEnter={() => setActiveStepIndex(index)}
                onClick={() => setActiveStepIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveStepIndex(index)}
                className={`process-node-card group relative p-6 sm:p-7 rounded-[26px] cursor-pointer transition-all duration-300 flex flex-col justify-between border-2 ${
                  isActive
                    ? 'bg-gradient-to-b from-[#590A1C]/60 to-[#21191D] border-[#F2B824] shadow-[0_20px_50px_rgba(242,184,36,0.2)] -translate-y-1.5'
                    : 'bg-[#1c1318]/90 border-[#8F1028]/35 hover:border-[#F2B824]/50 shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-extrabold text-base transition-colors shadow-md ${
                        isActive
                          ? 'bg-[#F2B824] text-[#21191D]'
                          : 'bg-[#8F1028]/30 text-[#F2B824] group-hover:bg-[#8F1028] group-hover:text-[#FFFFFF]'
                      }`}
                    >
                      {step.number}
                    </span>

                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md ${
                        isActive
                          ? 'bg-[#8F1028] text-[#FFFFFF]'
                          : 'bg-[#590A1C]/40 text-[#F8F5EF]/70'
                      }`}
                    >
                      Stage {step.number}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl text-[#FFFFFF] group-hover:text-[#F2B824] transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm font-semibold text-[#F2B824]">
                    {step.description}
                  </p>

                  <p className="mt-3 text-xs sm:text-[13px] text-[#F8F5EF]/75 leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#8F1028]/25 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#F8F5EF]/60">
                    {activePathway === 'client' ? 'Client Milestone' : 'Venture Phase'}
                  </span>
                  <span
                    className={`text-xs font-bold transition-transform ${
                      isActive ? 'text-[#F2B824] translate-x-1' : 'text-[#F8F5EF]/40'
                    }`}
                  >
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
