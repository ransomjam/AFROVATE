import React, { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './utils/animations';
import { Preloader } from './components/ui/Preloader';
import { Navbar } from './components/ui/Navbar';
import { InquiryModal } from './components/ui/InquiryModal';
import { HeroSection } from './components/sections/HeroSection';
import { VentureStudioSection } from './components/sections/VentureStudioSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { VenturesSection } from './components/sections/VenturesSection';
import { PartnershipsSection } from './components/sections/PartnershipsSection';
import { TeamNetworkSection } from './components/sections/TeamNetworkSection';
import { FinalCtaSection } from './components/sections/FinalCtaSection';
import { Footer } from './components/sections/Footer';

const SECTION_IDS = [
  'hero',
  'venture-studio',
  'services',
  'ventures',
  'about',
  'partnerships',
  'team',
  'contact',
];

export const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedVentureId, setSelectedVentureId] = useState<string>('afrodocs');
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>(undefined);
  const lenisRef = useRef<Lenis | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scrolling synchronized with GSAP ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Track active section and overall scroll progress
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 45%',
        end: 'bottom 45%',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
      triggers.push(st);
    });

    if (progressBarRef.current && !prefersReducedMotion()) {
      const progSt = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      });
      triggers.push(progSt);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [isReady]);

  const handlePreloaderComplete = useCallback(() => {
    setIsReady(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, []);

  const handleNavigate = useCallback((href: string) => {
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetEl, { offset: -64, duration: 1.2 });
    } else {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOpenInquiry = useCallback((topic?: string) => {
    setInquiryTopic(topic);
    setInquiryOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#21191D] text-[#F8F5EF] relative selection:bg-[#8F1028] selection:text-[#F2B824]">
      {/* Top Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none"
        aria-hidden="true"
      >
        <div
          ref={progressBarRef}
          className="h-full w-full bg-gradient-to-r from-[#8F1028] via-[#F2B824] to-[#F2B824] origin-left scale-x-0"
        />
      </div>

      {/* Initial Brand Wordmark & Crimson-Gold Reveal Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Adaptive Fixed Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenInquiry={handleOpenInquiry}
        isReady={isReady}
      />

      {/* Main Continuous Storytelling Experience */}
      <main>
        {/* SECTION 1 — HERO (INTRO) */}
        <HeroSection
          isReady={isReady}
          onNavigate={handleNavigate}
          onOpenInquiry={handleOpenInquiry}
          onSelectVenture={setSelectedVentureId}
        />

        {/* SECTION 2 — VENTURE STUDIO (DEDICATED DIVISION 01) */}
        <VentureStudioSection onOpenInquiry={handleOpenInquiry} />

        {/* SECTION 3 — OUR SERVICES (DIVISION 02) */}
        <ServicesSection onOpenInquiry={handleOpenInquiry} />

        {/* SECTION 3 — ABOUT SCALE54 (WELL SUMMARIZED) */}
        <AboutSection
          onNavigate={handleNavigate}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* SECTION 4 — OUR VENTURES */}
        <VenturesSection
          selectedVentureId={selectedVentureId}
          onSelectVenture={setSelectedVentureId}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* SECTION 5 — BUSINESS PARTNERSHIPS */}
        <PartnershipsSection onOpenInquiry={handleOpenInquiry} />

        {/* SECTION 6 — OUR TEAM AND NETWORK */}
        <TeamNetworkSection onOpenInquiry={handleOpenInquiry} />

        {/* SECTION 8 — FINAL CALL TO ACTION */}
        <FinalCtaSection
          onOpenInquiry={handleOpenInquiry}
          onNavigate={handleNavigate}
        />
      </main>

      {/* SECTION 9 — FOOTER */}
      <Footer onNavigate={handleNavigate} onOpenInquiry={handleOpenInquiry} />

      {/* Interactive Partnership & Project Consultation Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        initialTopic={inquiryTopic}
        onClose={() => setInquiryOpen(false)}
      />
    </div>
  );
};

export default App;
