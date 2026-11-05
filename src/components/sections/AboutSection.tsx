import React, { useEffect, useRef } from 'react';
import { ABOUT_CONTENT } from '../../data/siteContent';
import {
  animateMaskReveal,
  animateStaggerReveal,
  animateSubtleParallax,
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

    return () => {
      maskAnim?.kill();
      parallaxAnim?.kill();
      textAnim?.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#21191D] text-[#F8F5EF] py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* DESKTOP ONLY: Angled Architectural Photograph (Removed on mobile to eliminate extra redundant image) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 relative justify-start">
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

          {/* RIGHT / FULL-WIDTH: Well-Summarized Editorial Narrative */}
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

            {/* Three Interconnected Divisions (Venture Building, Services, Portfolio) */}
            <div className="about-reveal mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {ABOUT_CONTENT.divisions.map((div) => (
                <div
                  key={div.number}
                  className="p-4 rounded-2xl bg-[#590A1C]/25 border border-[#8F1028]/45 hover:border-[#F2B824]/50 shadow-md transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F2B824]">
                        {div.number}. {div.title}
                      </span>
                      <span className="w-4 h-[2px] bg-[#8F1028]" />
                    </div>
                    <h3 className="font-display font-bold text-sm text-[#FFFFFF]">
                      {div.headline}
                    </h3>
                    <p className="mt-1 text-xs text-[#F8F5EF]/75 leading-relaxed">
                      {div.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Focus & Approach Compact Inline Row */}
            <div className="about-reveal mt-6 pt-5 border-t border-[#F8F5EF]/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
