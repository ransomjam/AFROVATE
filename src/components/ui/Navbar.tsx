import React, { useEffect, useState } from 'react';
import { SITE_CONFIG, SERVICES_CONTENT, VENTURES_CONTENT } from '../../data/siteContent';
import { AfrovateLogo } from './AfrovateLogo';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  activeSection: string;
  onNavigate: (href: string) => void;
  onOpenInquiry: (defaultTopic?: string) => void;
  isReady: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenInquiry,
  isReady,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);

  // Determine whether the active section has a light (Ivory) background when at top
  const isLightSection =
    activeSection === 'partnerships' ||
    activeSection === 'process';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setServicesHover(false);
    onNavigate(href);
  };

  // Adaptive surface styling
  const headerSurface = scrolled
    ? isLightSection
      ? 'bg-[#F8F5EF]/95 text-[#21191D] shadow-[0_8px_30px_rgba(33,25,29,0.08)] border-b border-[#21191D]/10 backdrop-blur-md py-3.5'
      : 'bg-[#21191D]/92 text-[#FFFFFF] shadow-[0_10px_35px_rgba(0,0,0,0.45)] border-b border-[#8F1028]/35 backdrop-blur-md py-3.5'
    : 'bg-transparent text-[#FFFFFF] py-5 md:py-6';

  const logoVariant = scrolled && isLightSection ? 'dark' : 'light';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerSurface} ${
          isReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B824] rounded-lg"
            aria-label="Afrovate Group Home"
          >
            <AfrovateLogo variant={logoVariant} size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Primary Navigation"
          >
            {SITE_CONFIG.navigation.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              const isServices = sectionId === 'services';

              const textColor =
                scrolled && isLightSection
                  ? isActive
                    ? 'text-[#8F1028]'
                    : 'text-[#21191D]/80 hover:text-[#8F1028]'
                  : isActive
                  ? 'text-[#FFFFFF]'
                  : 'text-[#F8F5EF]/80 hover:text-[#FFFFFF]';

              const indicatorColor =
                scrolled && isLightSection ? 'bg-[#8F1028]' : 'bg-[#F2B824]';

              if (isServices) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setServicesHover(true)}
                    onMouseLeave={() => setServicesHover(false)}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className={`relative px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold tracking-tight transition-colors duration-200 inline-flex items-center gap-1.5 ${textColor}`}
                    >
                      <span>{item.label}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={`transition-transform duration-200 ${
                          servicesHover ? 'rotate-180' : ''
                        }`}
                      >
                        <path
                          d="M2.5 4.5L6 8L9.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className={`absolute bottom-0 left-3.5 right-3.5 h-[2.5px] rounded-full transition-transform duration-300 origin-left ${indicatorColor} ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </a>

                    {/* Refined Services Quick-Jump Panel */}
                    <div
                      className={`absolute top-full left-0 pt-3 w-[340px] transition-all duration-200 ${
                        servicesHover
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="bg-[#21191D] border border-[#8F1028]/50 rounded-2xl p-4 shadow-2xl text-[#F8F5EF]">
                        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F2B824] mb-2.5 px-2">
                          Principal Service Categories
                        </div>
                        <div className="space-y-1">
                          {SERVICES_CONTENT.principalServices.map((srv) => (
                            <a
                              key={srv.id}
                              href="#services"
                              onClick={(e) => handleLinkClick(e, '#services')}
                              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#590A1C]/70 transition-colors"
                            >
                              <span className="text-xs font-extrabold text-[#F2B824] mt-0.5">
                                {srv.number}
                              </span>
                              <div>
                                <div className="text-sm font-bold text-[#FFFFFF] group-hover:text-[#F2B824] transition-colors">
                                  {srv.title}
                                </div>
                                <div className="text-xs text-[#F8F5EF]/65 line-clamp-1">
                                  {srv.shortSummary}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`group relative px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold tracking-tight transition-colors duration-200 ${textColor}`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-3.5 right-3.5 h-[2.5px] rounded-full transition-transform duration-300 origin-left ${indicatorColor} ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <MagneticButton
              variant={scrolled && isLightSection ? 'crimson' : 'gold'}
              size="sm"
              onClick={() => onOpenInquiry('General Partnership / Project')}
            >
              Work With Us
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`lg:hidden relative z-50 w-12 h-9 rounded-2xl flex items-center justify-center border transition-all cursor-pointer ${
              mobileMenuOpen
                ? 'bg-[#8F1028] border-[#F2B824] text-[#FFFFFF]'
                : scrolled && isLightSection
                ? 'bg-[#21191D]/5 border-[#21191D]/40 text-[#21191D]'
                : 'bg-transparent border-[#F8F5EF]/35 hover:border-[#F2B824] text-[#FFFFFF]'
            }`}
          >
            <div className="w-5 h-2.5 relative flex flex-col justify-between">
              <span
                className={`w-full h-[2px] bg-current rounded-full transition-transform duration-300 origin-center ${
                  mobileMenuOpen ? 'translate-y-[4px] rotate-45 bg-[#F2B824]' : ''
                }`}
              />
              <span
                className={`w-full h-[2px] bg-current rounded-full transition-transform duration-300 origin-center ${
                  mobileMenuOpen ? '-translate-y-[4px] -rotate-45 bg-[#F2B824]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Editorial Navigation Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#21191D]/98 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Decorative Crimson & Gold diagonal accent */}
        <div
          className="absolute top-0 right-0 w-72 h-72 bg-[#8F1028]/30 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 h-full flex flex-col justify-between px-6 pt-24 pb-8 overflow-y-auto">
          <div className="space-y-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F2B824]">
              Navigation
            </div>
            <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
              {SITE_CONFIG.navigation.map((item, idx) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`flex items-center justify-between py-2.5 border-b border-[#F8F5EF]/10 text-2xl font-display font-extrabold tracking-tight transition-colors ${
                      isActive ? 'text-[#F2B824]' : 'text-[#FFFFFF] hover:text-[#F2B824]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono text-[#8F1028] font-bold">
                      0{idx + 1}
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* Ventures Quick Links in Mobile Menu */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F8F5EF]/60 mb-3">
                Our Ventures Portfolio
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {VENTURES_CONTENT.ventures.map((v) => (
                  <a
                    key={v.id}
                    href="#ventures"
                    onClick={(e) => handleLinkClick(e, '#ventures')}
                    className="p-3 rounded-xl bg-[#590A1C]/50 border border-[#8F1028]/40 hover:border-[#F2B824] transition-colors"
                  >
                    <div className="text-sm font-bold text-[#FFFFFF]">{v.name}</div>
                    <div className="text-[11px] text-[#F8F5EF]/70 line-clamp-1 mt-0.5">
                      {v.category}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#F8F5EF]/15 flex flex-col gap-3">
            <MagneticButton
              variant="gold"
              size="lg"
              className="w-full justify-center"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry('Mobile Navigation Inquiry');
              }}
            >
              Work With Afrovate
            </MagneticButton>
          </div>
        </div>
      </div>
    </>
  );
};
