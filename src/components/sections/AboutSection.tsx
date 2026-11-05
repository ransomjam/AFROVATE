import React, { useEffect, useRef } from 'react';
import { ABOUT_CONTENT } from '../../data/siteContent';
import {
  animateMaskReveal,
  animateStaggerReveal,
  animateSubtleParallax,
  gsap,
  prefersReducedMotion,
} from '../../utils/animations';
import { MagneticButton } from '../ui/MagneticButton';

interface AboutSectionProps {
  onNavigate: (href: string) => void;
  onOpenInquiry?: (topic?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onNavigate,
  onOpenInquiry,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const innerImgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const maskAnim = animateMaskReveal(
      imageWrapRef.current,
      sectionRef.current,
      'diagonal',
      'top 78%'
    );
    const parallaxAnim = animateSubtleParallax(
      innerImgRef.current,
      sectionRef.current,
      8
    );

    const textTargets = contentRef.current?.querySelectorAll('.about-reveal');
    const textAnim = textTargets
      ? animateStaggerReveal(textTargets, contentRef.current, {
          y: 28,
          stagger: 0.1,
          duration: 0.85,
        })
      : null;

    // Card entrance animation synchronized with scroll up/down
    const cards = contentRef.current?.querySelectorAll('.about-division-card');
    let cardTrigger: gsap.core.Tween | null = null;
    if (cards && cards.length > 0 && !prefersReducedMotion()) {
      cardTrigger = gsap.fromTo(
        cards,
        { opacity: 0, y: 34, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }

    return () => {
      maskAnim?.kill();
      parallaxAnim?.kill();
      textAnim?.kill();
      cardTrigger?.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#21191D] text-[#F8F5EF] py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* DESKTOP ONLY: Angled Architectural Photograph (Sticky pinned alongside content) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 relative justify-start lg:sticky lg:top-28 self-start">
            <div ref={imageWrapRef} className="relative w-full max-w-[500px]">
              {/* Secondary Deep Crimson Diagonal Blade Behind Edge */}
              <div
                className="absolute -right-5 -bottom-6 w-[62%] h-[68%] bg-gradient-to-t from-[#590A1C] via-[#8F1028] to-[#8F1028] rounded-[28px] -skew-x-[15deg] z-0"
                aria-hidden="true"
              />

              {/* Main Architectural Glass Tower Frame */}
              <div className="relative z-10 w-full aspect-[4/4.2] rounded-[28px] -skew-x-[15deg] overflow-hidden shadow-[0_25px_65px_rgba(0,0,0,0.45)] border-2 border-[#8F1028]/50">
                <img
                  ref={innerImgRef}
                  src="/images/architecture-tower.webp"
                  alt="Modern glass corporate architecture reflecting golden hour light"
                  loading="lazy"
                  className="w-full h-full object-cover skew-x-[15deg] scale-[1.26] photo-warm-grade"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#21191D]/45 via-transparent to-[#F2B824]/15 pointer-events-none" />
              </div>

              {/* Editorial Badge Over Image Corner */}
              <div className="absolute -bottom-5 left-6 z-20 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#21191D] text-[#FFFFFF] shadow-xl border border-[#F2B824]/40">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F2B824]" />
                <span className="text-xs font-bold tracking-wide uppercase text-[#F8F5EF]">
                  Collaborative Growth Partner
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT / FULL-WIDTH: Well-Summarized Editorial Narrative & Redesigned Cards */}
          <div
            ref={contentRef}
            className="lg:col-span-7 xl:col-span-7 lg:pl-6 max-w-3xl"
          >
            {/* Eyebrow */}
            <div className="about-reveal inline-flex items-center gap-4 mb-3">
              <span className="text-xs md:text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#F2B824]">
                {ABOUT_CONTENT.eyebrow}
              </span>
              <span className="w-14 h-[2px] bg-[#8F1028] rounded-full" />
            </div>

            {/* Headline */}
            <h2 className="about-reveal font-display font-extrabold text-3xl sm:text-4xl md:text-[46px] leading-[1.1] tracking-tight text-[#FFFFFF]">
              {ABOUT_CONTENT.headline}
            </h2>

            {/* Concise Core Summary */}
            <p className="about-reveal mt-4 text-base sm:text-lg text-[#F8F5EF]/85 leading-relaxed font-normal">
              {ABOUT_CONTENT.description}
            </p>

            {/* ========================================================================= */}
            {/* 3 REDESIGNED DIVISION CARDS: Exact Visual Style from Services Reference   */}
            {/* Includes: Rich burgundy background, left photo with gradient dissolve,      */}
            {/* prominent headline, description & interactive "Get in touch →" link       */}
            {/* ========================================================================= */}
            <div className="mt-7 flex flex-col gap-4 sm:gap-5">
              {ABOUT_CONTENT.divisions.map((div) => (
                <article
                  key={div.number}
                  onClick={() => {
                    if (onOpenInquiry) {
                      onOpenInquiry(div.topic || `About / ${div.headline}`);
                    } else {
                      onNavigate(div.href || '#services');
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (onOpenInquiry) {
                        onOpenInquiry(div.topic || `About / ${div.headline}`);
                      } else {
                        onNavigate(div.href || '#services');
                      }
                    }
                  }}
                  className="about-division-card group relative rounded-[26px] sm:rounded-[30px] overflow-hidden bg-gradient-to-r from-[#290712] via-[#350817] to-[#3a0919] border border-[#590a1c]/65 hover:border-[#F2B824]/60 shadow-[0_15px_45px_rgba(0,0,0,0.55)] hover:shadow-[0_20px_55px_rgba(143,16,40,0.3)] transition-all duration-400 ease-out flex flex-row items-stretch min-h-[175px] sm:min-h-[195px] lg:min-h-[205px] cursor-pointer hover:-translate-y-1.5"
                >
                  {/* Left Photo Container (Bleeds to edges with smooth gradient fade to the right) */}
                  <div className="relative w-[38%] sm:w-[42%] md:w-[40%] lg:w-[42%] shrink-0 overflow-hidden bg-[#21191D]">
                    <img
                      src={div.image}
                      alt={div.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out photo-warm-grade"
                    />

                    {/* Smooth Gradient Dissolve from Photo into Dark Burgundy Card Background */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, transparent 42%, rgba(53, 8, 23, 0.65) 75%, #350817 100%)',
                      }}
                    />

                    {/* Subtle Top & Bottom Vignette for Cinematic Depth */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(33, 25, 29, 0.4) 0%, transparent 35%, transparent 65%, rgba(33, 25, 29, 0.4) 100%)',
                      }}
                    />
                  </div>

                  {/* Right Content Area (Pill Badge, Headline, Supporting Copy & "Get in touch →") */}
                  <div className="flex-1 p-4 sm:p-6 lg:p-7 flex flex-col justify-center min-w-0 z-10">
                    {/* Number Badge & Category Indicator */}
                    <div className="inline-flex items-center gap-2 mb-1.5 sm:mb-2">
                      <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-[#F2B824]">
                        {div.number}. {div.title}
                      </span>
                      <span className="w-4 h-[2px] bg-[#8F1028]" />
                    </div>

                    {/* Headline in bold white display font (matches Image 2 typography) */}
                    <h3 className="font-display font-bold text-lg sm:text-2xl lg:text-[24px] text-[#FFFFFF] leading-[1.18] tracking-tight group-hover:text-[#F2B824] transition-colors duration-300">
                      {div.headline}
                    </h3>

                    {/* Concise Supporting Copy */}
                    <p className="mt-1.5 sm:mt-2.5 text-xs sm:text-sm lg:text-[14px] text-[#F8F5EF]/85 leading-relaxed font-normal max-w-md">
                      {div.description}
                    </p>

                    {/* Yellow/Gold "Get in touch →" link matching Image 2 */}
                    <div className="mt-3.5 sm:mt-5">
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm lg:text-[15px] font-bold text-[#F2B824] group-hover:text-[#FFFFFF] transition-colors duration-300">
                        <span>Get in touch</span>
                        <span
                          className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Focus & Approach Compact Inline Row */}
            <div className="about-reveal mt-7 pt-6 border-t border-[#F8F5EF]/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span
                  className="w-1.5 h-8 rounded-full bg-[#F2B824] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-[#FFFFFF]">
                    Our Focus
                  </h4>
                  <p className="text-xs text-[#F8F5EF]/80 leading-snug mt-0.5">
                    Creating and scaling sustainable technology ventures and resilient
                    businesses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:border-l sm:border-[#8F1028]/50 sm:pl-4">
                <span
                  className="w-1.5 h-8 rounded-full bg-[#F2B824] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-[#FFFFFF]">
                    Our Approach
                  </h4>
                  <p className="text-xs text-[#F8F5EF]/80 leading-snug mt-0.5">
                    Practical, business-led strategy combined with disciplined technical
                    execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Forward-Leading Action CTAs */}
            <div className="about-reveal mt-7 flex flex-wrap items-center gap-3.5">
              <MagneticButton
                variant="gold"
                size="md"
                onClick={() => onNavigate('#ventures')}
              >
                Explore Our Ventures
              </MagneticButton>
              <MagneticButton
                variant="outline-light"
                size="md"
                showArrow={false}
                onClick={() =>
                  onOpenInquiry
                    ? onOpenInquiry('About Section — Partnership Inquiry')
                    : onNavigate('#contact')
                }
              >
                Work With Us
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
