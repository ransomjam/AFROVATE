import React, { useEffect, useRef } from 'react';
import { PARTNERSHIPS_CONTENT } from '../../data/siteContent';
import {
  animateMaskReveal,
  animateStaggerReveal,
  animateSubtleParallax,
} from '../../utils/animations';
import { MagneticButton } from '../ui/MagneticButton';

interface PartnershipsSectionProps {
  onOpenInquiry: (topic?: string) => void;
}

export const PartnershipsSection: React.FC<PartnershipsSectionProps> = ({
  onOpenInquiry,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const photoImgRef = useRef<HTMLImageElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const maskAnim = animateMaskReveal(
      photoWrapRef.current,
      sectionRef.current,
      'left-to-right',
      'top 78%'
    );
    const parallaxAnim = animateSubtleParallax(
      photoImgRef.current,
      sectionRef.current,
      7
    );

    const headItems = headerRef.current?.querySelectorAll('.partner-head-reveal');
    const headAnim = headItems
      ? animateStaggerReveal(headItems, headerRef.current, {
          y: 34,
          stagger: 0.12,
        })
      : null;

    const domainItems = domainsRef.current?.querySelectorAll('.partner-domain-blade');
    const domainAnim = domainItems
      ? animateStaggerReveal(domainItems, domainsRef.current, {
          y: 40,
          stagger: 0.12,
          duration: 0.9,
        })
      : null;

    return () => {
      maskAnim?.kill();
      parallaxAnim?.kill();
      headAnim?.kill();
      domainAnim?.kill();
    };
  }, []);

  return (
    <section
      id="partnerships"
      ref={sectionRef}
      className="relative w-full bg-[#21191D] text-[#F8F5EF] py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      {/* Top-Left Deep Crimson & Warm Gold Curved Ribbon Accent (Matches Ref Image 4) */}
      <svg
        viewBox="0 0 600 900"
        fill="none"
        preserveAspectRatio="none"
        className="hidden lg:block absolute top-0 left-0 w-[44%] h-full pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <path
          d="M0 0 L 420 0 C 310 180, 140 240, 45 480 C 120 640, 340 760, 560 900 L 0 900 Z"
          fill="#590A1C"
          opacity="0.3"
        />
      </svg>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* TOP EDITORIAL COMPOSITION: Collaborative Business Photography + Headline + 4 Angled Burgundy Blades */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT COLUMN (5 cols): Collaborative Strategy Photography Framed by Crimson-Gold Ribbon */}
          <div className="lg:col-span-5 relative">
            <div
              ref={photoWrapRef}
              className="relative rounded-[32px] overflow-hidden shadow-[0_28px_70px_rgba(0,0,0,0.6)] border border-[#8F1028]/50 bg-[#21191D]"
            >
              <div className="relative aspect-[4/3.6] sm:aspect-[16/11] lg:aspect-[4/4.2] w-full overflow-hidden">
                <img
                  ref={photoImgRef}
                  src="/images/strategy-meeting.webp"
                  srcSet="/images/strategy-meeting-mobile.webp 800w, /images/strategy-meeting.webp 1600w"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  alt="Scale54 executives and partners collaborating around a laptop"
                  loading="lazy"
                  className="w-full h-full object-cover scale-110 photo-warm-grade"
                />
                {/* Subtle Warm Sunset Rim & Lower Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#21191D]/85 via-transparent to-[#590A1C]/20" />
              </div>

              {/* Sweeping Crimson & Warm Gold Ribbon Across Lower Edge of Photo */}
              <div className="relative p-5 sm:p-6 bg-gradient-to-r from-[#590A1C] via-[#8F1028] to-[#21191D] text-[#FFFFFF] border-t-2 border-[#F2B824]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F2B824] block">
                      Collaborative Execution
                    </span>
                    <p className="text-sm font-bold text-[#FFFFFF] mt-0.5">
                      Strategy, marketing & technology under one roof.
                    </p>
                  </div>
                  <span className="w-10 h-10 rounded-xl bg-[#F2B824] text-[#21191D] font-display font-extrabold text-sm flex items-center justify-center shrink-0">
                    S54
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (7 cols): Headline + 4 Angled Burgundy/Crimson Domain Blades (Matches Ref Image 4) */}
          <div className="lg:col-span-7 lg:pl-4">
            <div ref={headerRef}>
              <div className="partner-head-reveal inline-flex items-center gap-4 mb-4">
                <span className="text-xs md:text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#F2B824]">
                  {PARTNERSHIPS_CONTENT.eyebrow}
                </span>
                <span className="w-16 h-[2.5px] bg-[#8F1028] rounded-full" />
              </div>

              <h2 className="partner-head-reveal font-display font-extrabold text-3xl sm:text-5xl xl:text-[56px] leading-[1.05] tracking-tight text-[#FFFFFF]">
                Grow your business with{' '}
                <span className="italic text-[#F2B824]">Scale54.</span>
              </h2>

              <p className="partner-head-reveal mt-5 text-base sm:text-lg text-[#F8F5EF]/85 leading-relaxed max-w-2xl">
                {PARTNERSHIPS_CONTENT.supportingText}
              </p>
            </div>

            {/* 4 Angled Dark Burgundy & Deep Crimson Parallelogram Blades */}
            <div
              ref={domainsRef}
              className="mt-8 lg:-ml-16 relative z-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
            >
              {PARTNERSHIPS_CONTENT.domains.map((domain) => (
                <div
                  key={domain.id}
                  className="partner-domain-blade group relative rounded-2xl xl:-skew-x-[10deg] bg-gradient-to-br from-[#8F1028] via-[#590A1C] to-[#21191D] text-[#FFFFFF] p-5 shadow-[0_18px_40px_rgba(89,10,28,0.28)] border border-[#F2B824]/30 hover:border-[#F2B824] transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="xl:skew-x-[10deg]">
                    <h3 className="font-display italic font-extrabold text-lg sm:text-xl leading-snug text-[#FFFFFF] group-hover:text-[#F2B824] transition-colors">
                      {domain.title}
                    </h3>
                    <span
                      className="block w-10 h-[3px] bg-[#F2B824] rounded-full my-3"
                      aria-hidden="true"
                    />
                    <p className="text-xs sm:text-[13px] text-[#F8F5EF]/85 leading-relaxed">
                      {domain.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <MagneticButton
                variant="gold"
                size="lg"
                onClick={() => onOpenInquiry('Business Partnership Inquiry')}
              >
                Partner With Us
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
