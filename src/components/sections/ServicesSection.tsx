import React, { useEffect, useRef } from 'react';
import { SERVICES_CONTENT } from '../../data/siteContent';
import { gsap, prefersReducedMotion } from '../../utils/animations';
import { MagneticButton } from '../ui/MagneticButton';

interface ServicesSectionProps {
  onOpenInquiry: (topic?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenInquiry,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header entrance animation
      const headItems = headerRef.current?.querySelectorAll('.services-reveal-item');
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
              start: 'top 80%',
            },
          }
        );
      }

      // 4 Service Cards staggered reveal
      const cards = cardsRef.current?.querySelectorAll('.service-exact-card');
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
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-[#21191D] text-[#F8F5EF] py-20 md:py-28 lg:py-32 overflow-hidden border-t border-[#8F1028]/35"
    >
      {/* Background with Dark Burgundy Horizon & Soft Lighting (Seamless with #21191D) */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #21191D 0%, #2e0813 42%, #420a1a 75%, #21191D 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, rgba(143, 16, 40, 0.35) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ========================================================================= */}
        {/* SECTION HEADER: Clean & Balanced */}
        {/* ========================================================================= */}
        <div ref={headerRef} className="max-w-3xl mb-12 lg:mb-14">
          <div className="services-reveal-item inline-flex items-center gap-2.5 mb-3.5">
            <span className="w-5 h-[2px] bg-[#F2B824] rounded-full" />
            <span className="text-xs md:text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#F2B824]">
              {SERVICES_CONTENT.eyebrow}
            </span>
          </div>

          <h2 className="services-reveal-item font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] leading-[1.08] tracking-tight text-[#FFFFFF]">
            <span>Capabilities </span>
            <span className="text-[#F2B824]">For Your Growth</span>
          </h2>

          <p className="services-reveal-item mt-4 text-sm sm:text-base text-[#F8F5EF]/80 leading-relaxed font-normal max-w-2xl">
            {SERVICES_CONTENT.introText}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 4 REDESIGNED SERVICE CARDS: Exact 2x2 Grid from User Reference */}
        {/* ========================================================================= */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {SERVICES_CONTENT.principalServices.map((service) => (
            <article
              key={service.id}
              onClick={() => onOpenInquiry(`Services / ${service.title}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === 'Enter' && onOpenInquiry(`Services / ${service.title}`)
              }
              className="service-exact-card group relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-gradient-to-r from-[#290712] via-[#350817] to-[#3a0919] border border-[#590a1c]/65 hover:border-[#F2B824]/60 shadow-[0_15px_45px_rgba(0,0,0,0.55)] hover:shadow-[0_20px_55px_rgba(143,16,40,0.3)] transition-all duration-400 ease-out flex flex-row items-stretch min-h-[220px] sm:min-h-[250px] lg:min-h-[270px] cursor-pointer hover:-translate-y-1.5"
            >
              {/* Left Photo Container (Bleeds to edges with smooth gradient fade to the right) */}
              <div className="relative w-[42%] sm:w-[46%] md:w-[44%] lg:w-[46%] shrink-0 overflow-hidden bg-[#21191D]">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out photo-warm-grade"
                />

                {/* Smooth Gradient Dissolve from Photo into Dark Burgundy Card Background */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(53, 8, 23, 0.65) 75%, #350817 100%)',
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

              {/* Right Content Area (Title, Supporting Copy & "Get in touch →") */}
              <div className="flex-1 p-5 sm:p-7 md:p-6 lg:p-8 flex flex-col justify-center min-w-0 z-10">
                <h3 className="font-display font-bold text-2xl sm:text-[26px] lg:text-[28px] text-[#FFFFFF] leading-[1.18] tracking-tight group-hover:text-[#F2B824] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[15px] text-[#F8F5EF]/85 leading-relaxed font-normal max-w-sm">
                  {service.description}
                </p>

                <div className="mt-4 sm:mt-6">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm lg:text-[15px] font-bold text-[#F2B824] group-hover:text-[#FFFFFF] transition-colors duration-300">
                    <span>Get in touch</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* CENTERED GOLD CTA BUTTON: Matches User Reference Exactly */}
        {/* ========================================================================= */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <MagneticButton
            variant="gold"
            size="lg"
            className="px-10 py-4 text-base sm:text-lg font-extrabold shadow-[0_10px_30px_rgba(242,184,36,0.35)]"
            onClick={() => onOpenInquiry('Professional Services Consultation')}
          >
            Discuss Your Requirements →
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
