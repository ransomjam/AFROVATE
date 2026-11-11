import React, { useEffect, useRef } from 'react';
import { FINAL_CTA_CONTENT } from '../../data/siteContent';
import { gsap, prefersReducedMotion } from '../../utils/animations';
import { Scale54Logo } from '../ui/Scale54Logo';
import { MagneticButton } from '../ui/MagneticButton';

interface FinalCtaSectionProps {
  onOpenInquiry: (topic?: string) => void;
  onNavigate: (href: string) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onOpenInquiry,
  onNavigate,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgPhotoRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Cinematic background reveal
      gsap.fromTo(
        bgPhotoRef.current,
        { scale: 1.14, opacity: 0.25 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.35,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );

      const items = contentWrapRef.current?.querySelectorAll('.cta-reveal-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.13,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 74%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-[640px] bg-[#21191D] text-[#FFFFFF] py-24 md:py-32 overflow-hidden flex items-center border-t border-[#8F1028]/40"
    >
      {/* Cinematic Architectural & Golden Hour Background Reveal */}
      <div ref={bgPhotoRef} className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[62%]">
          <img
            src="/images/downtown-skyline.webp"
            srcSet="/images/downtown-skyline-mobile.webp 800w, /images/downtown-skyline.webp 1600w"
            sizes="(max-width: 1024px) 100vw, 62vw"
            alt="Scale54 golden hour corporate skyline"
            loading="lazy"
            className="w-full h-full object-cover object-right photo-warm-grade"
          />
        </div>

        {/* Diagonal Transition Mask */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(102deg, #21191D 0%, #440714 44%, rgba(143, 16, 40, 0.85) 65%, rgba(33, 25, 29, 0.35) 100%)',
          }}
        />

        <svg
          viewBox="0 0 1440 700"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <path
            d="M 520 700 L 940 0 L 1010 0 L 610 700 Z"
            fill="#8F1028"
            opacity="0.72"
          />
          <path
            d="M 480 700 C 660 490, 820 260, 960 0 L 990 0 C 850 275, 695 505, 530 700 Z"
            fill="#F2B824"
            opacity="0.88"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div ref={contentWrapRef} className="max-w-4xl">
          {/* Scale54 Wordmark */}
          <div className="cta-reveal-item mb-6">
            <Scale54Logo variant="light" size="md" />
          </div>

          {/* Eyebrow */}
          <div className="cta-reveal-item inline-flex items-center gap-3.5 mb-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.26em] text-[#F2B824]">
              {FINAL_CTA_CONTENT.eyebrow}
            </span>
            <span className="w-12 h-[2px] bg-[#F2B824] rounded-full" />
          </div>

          {/* Closing Headline: "Let's discuss what you're building." */}
          <h2 className="cta-reveal-item font-display italic font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[62px] leading-[1.04] tracking-tight">
            <span className="text-[#FFFFFF]">Let&apos;s discuss </span>
            <span className="text-[#F2B824] block sm:inline">what you&apos;re building.</span>
          </h2>

          <p className="cta-reveal-item mt-6 text-base sm:text-lg md:text-xl text-[#F8F5EF]/90 leading-relaxed max-w-2xl font-normal">
            {FINAL_CTA_CONTENT.supportingCopy}
          </p>

          {/* 4 DEDICATED ENQUIRY PATHWAYS (Founder, Organisation, Partner, Talent) */}
          <div className="cta-reveal-item mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FINAL_CTA_CONTENT.paths.map((path) => (
              <div
                key={path.id}
                onClick={() => onOpenInquiry(path.topic)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onOpenInquiry(path.topic)}
                className="group p-5 rounded-2xl bg-[#21191D]/85 hover:bg-[#590A1C]/80 border border-[#8F1028]/50 hover:border-[#F2B824] transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F2B824]">
                      {path.label}
                    </span>
                    <span className="text-xs text-[#F8F5EF]/40 group-hover:text-[#F2B824] group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#FFFFFF] group-hover:text-[#F2B824] transition-colors">
                    {path.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#F8F5EF]/80 leading-relaxed">
                    {path.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F8F5EF]/10 flex items-center justify-between text-xs font-extrabold text-[#F2B824]">
                  <span>{path.action}</span>
                  <span>↗</span>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Alternative Action */}
          <div className="cta-reveal-item mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              variant="gold"
              size="lg"
              onClick={() => onOpenInquiry('General Inquiry / Direct Engagement')}
            >
              Start General Inquiry
            </MagneticButton>
            <MagneticButton
              variant="outline-light"
              size="lg"
              showArrow={false}
              onClick={() => onNavigate('#ventures')}
            >
              Explore Our Portfolio
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
