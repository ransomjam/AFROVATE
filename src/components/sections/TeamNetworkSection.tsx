import React, { useEffect, useRef, useState } from 'react';
import { TEAM_NETWORK_CONTENT } from '../../data/siteContent';
import { animateStaggerReveal, gsap, prefersReducedMotion } from '../../utils/animations';
import { MagneticButton } from '../ui/MagneticButton';

interface TeamNetworkSectionProps {
  onOpenInquiry: (topic?: string) => void;
}

const TALENT_FUNCTIONS = [
  { id: 'dev', title: 'Software engineers', role: 'Full-stack, mobile, cloud infrastructure & application architecture.', icon: '01' },
  { id: 'biz', title: 'Business consultants', role: 'Commercial strategy, feasibility studies & operational structuring.', icon: '02' },
  { id: 'design', title: 'Product & UI/UX designers', role: 'User research, interface design, design systems & art direction.', icon: '03' },
  { id: 'marketing', title: 'Digital marketers', role: 'Audience acquisition, multi-channel campaigns & conversion growth.', icon: '04' },
  { id: 'content', title: 'Content creators & video editors', role: 'Brand storytelling, video production & digital media assets.', icon: '05' },
  { id: 'ai', title: 'AI automation specialists', role: 'WhatsApp chatbots, AI models, workflow automation & system integrations.', icon: '06' },
  { id: 'pm', title: 'Project managers', role: 'Cross-functional delivery governance, sprint tracking & QA assurance.', icon: '07' },
  { id: 'venture', title: 'Venture development professionals', role: 'Market validation, business modeling & founder-partner support.', icon: '08' },
];

export const TeamNetworkSection: React.FC<TeamNetworkSectionProps> = ({
  onOpenInquiry,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeFuncId, setActiveFuncId] = useState<string>('dev');

  useEffect(() => {
    if (!sectionRef.current) return;

    const headItems = headerRef.current?.querySelectorAll('.team-head-reveal');
    const headAnim = headItems
      ? animateStaggerReveal(headItems, headerRef.current, {
          y: 34,
          stagger: 0.12,
        })
      : null;

    const cards = listRef.current?.querySelectorAll('.team-function-card');
    const cardAnim = cards
      ? animateStaggerReveal(cards, listRef.current, {
          y: 28,
          stagger: 0.08,
          duration: 0.75,
        })
      : null;

    return () => {
      headAnim?.kill();
      cardAnim?.kill();
    };
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative w-full bg-[#21191D] text-[#FFFFFF] py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      {/* Subtle Burgundy & Crimson Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 80% 30%, rgba(143, 16, 40, 0.32) 0%, rgba(89, 10, 28, 0.25) 45%, rgba(33, 25, 29, 1) 85%)',
          }}
        />
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[34%] bg-[#590A1C]/35 -skew-x-[14deg] translate-x-16 border-l border-[#8F1028]/35"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Editorial Introduction */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14"
        >
          <div className="lg:col-span-7">
            <div className="team-head-reveal inline-flex items-center gap-4 mb-4">
              <span className="text-xs md:text-[13px] font-extrabold uppercase tracking-[0.26em] text-[#F2B824]">
                {TEAM_NETWORK_CONTENT.eyebrow}
              </span>
              <span className="w-16 h-[2.5px] bg-[#8F1028] rounded-full" />
            </div>

            <h2 className="team-head-reveal font-display font-extrabold text-3xl sm:text-5xl lg:text-[52px] leading-[1.06] tracking-tight text-[#FFFFFF]">
              Specialist talent assembled{' '}
              <span className="italic text-[#F2B824]">around your needs.</span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <div className="team-head-reveal p-5 rounded-2xl bg-[#590A1C]/45 border-l-4 border-[#F2B824] text-xs sm:text-sm text-[#F8F5EF]/90 leading-relaxed shadow-lg backdrop-blur-sm">
              &ldquo;{TEAM_NETWORK_CONTENT.supportingText}&rdquo;
            </div>
          </div>
        </div>

        {/* 8 TALENT FUNCTIONS GRID */}
        <div
          ref={listRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14"
        >
          {TALENT_FUNCTIONS.map((item) => {
            const isSelected = activeFuncId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveFuncId(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveFuncId(item.id)}
                className={`team-function-card relative p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#8F1028] to-[#590A1C] border-[#F2B824] shadow-[0_15px_35px_rgba(242,184,36,0.18)] -translate-y-1'
                    : 'bg-[#FFFFFF]/5 hover:bg-[#590A1C]/35 border-[#F8F5EF]/12'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-[#F2B824] text-[#21191D]'
                          : 'bg-[#590A1C]/60 text-[#F2B824]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F8F5EF]/50">
                      Coordinated Network
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-lg text-[#FFFFFF]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#F8F5EF]/80 leading-relaxed">
                    {item.role}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F8F5EF]/15 flex items-center justify-between text-[11px] font-bold">
                  <span className={isSelected ? 'text-[#F2B824]' : 'text-[#F8F5EF]/60'}>
                    Specialist Function
                  </span>
                  <span className={isSelected ? 'text-[#FFFFFF]' : 'text-[#F2B824]'}>
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM TALENT INVITATION BANNER */}
        <div className="rounded-[28px] bg-gradient-to-r from-[#21191D] via-[#590A1C] to-[#21191D] border border-[#8F1028]/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F2B824] block mb-1">
              REMOTE-FIRST OPPORTUNITY
            </span>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#FFFFFF]">
              Are you an experienced developer, designer, strategist or growth specialist?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#F8F5EF]/80 max-w-xl">
              We welcome high-calibre remote professionals to collaborate across live proprietary ventures and client engagements.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <MagneticButton
              variant="gold"
              size="md"
              onClick={() => onOpenInquiry('Remote Talent Network Application')}
            >
              {TEAM_NETWORK_CONTENT.ctaLabel}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
