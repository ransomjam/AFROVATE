import React, { useState } from 'react';
import {
  SITE_CONFIG,
  VENTURES_CONTENT,
} from '../../data/siteContent';
import { Scale54Logo } from '../ui/Scale54Logo';

interface FooterProps {
  onNavigate: (href: string) => void;
  onOpenInquiry: (topic?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiry }) => {
  const [infoModal, setInfoModal] = useState<'careers' | 'privacy' | 'terms' | null>(
    null
  );

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <footer className="relative bg-[#21191D] text-[#F8F5EF] border-t border-[#8F1028]/50 overflow-hidden">
      {/* Top Crimson & Gold Horizon Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#590A1C] via-[#8F1028] to-[#F2B824]" />

      {/* Subtle Dark Burgundy Architectural Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          background:
            'radial-gradient(circle at 15% 0%, #590A1C 0%, #21191D 65%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-12">
        {/* Main Multi-Column Footer Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-14 border-b border-[#F8F5EF]/12">
          {/* Column 1 (4 cols): Scale54 Introduction & Social Links */}
          <div className="lg:col-span-4 pr-0 lg:pr-6">
            <Scale54Logo variant="light" size="md" />
            <p className="mt-5 text-sm text-[#F8F5EF]/80 leading-relaxed">
              Scale54 is a venture studio, technology and business development group.
              We partner with founders to co-build new technology businesses, manage a portfolio
              of proprietary ventures, and deliver consulting, digital marketing, software
              engineering and AI automation services to organisations.
            </p>

            {/* Social Media Links */}
            <div className="mt-6">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#F2B824] mb-3">
                Connect With Scale54
              </div>
              <div className="flex flex-wrap gap-2.5">
                {SITE_CONFIG.socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    onClick={(e) => handleAnchor(e, social.href)}
                    className="px-3.5 py-2 rounded-xl bg-[#590A1C]/45 hover:bg-[#8F1028] border border-[#F8F5EF]/15 hover:border-[#F2B824] text-xs font-bold text-[#FFFFFF] transition-all"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 (2 cols): Company */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#F2B824] mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleAnchor(e, '#about')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors"
                >
                  About Scale54
                </a>
              </li>
              <li>
                <a
                  href="#venture-studio"
                  onClick={(e) => handleAnchor(e, '#venture-studio')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors flex items-center gap-1.5"
                >
                  <span>Venture Studio</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2B824]" />
                </a>
              </li>
              <li>
                <a
                  href="#ventures"
                  onClick={(e) => handleAnchor(e, '#ventures')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors"
                >
                  Our Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#partnerships"
                  onClick={(e) => handleAnchor(e, '#partnerships')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors"
                >
                  Partnerships
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setInfoModal('careers')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Careers</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#8F1028] text-[10px] font-bold text-[#F2B824]">
                    Remote
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 (2 cols): Our Services */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#F2B824] mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleAnchor(e, '#services')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors"
                >
                  Business Consulting
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleAnchor(e, '#services')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors"
                >
                  Digital Marketing
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleAnchor(e, '#services')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors"
                >
                  Software Development
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleAnchor(e, '#services')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors"
                >
                  AI and Automation
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleAnchor(e, '#services')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors"
                >
                  Technical Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 (2 cols): Our Ventures Portfolio */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#F2B824] mb-4">
              Our Ventures
            </h3>
            <ul className="space-y-2.5 text-sm">
              {VENTURES_CONTENT.ventures.map((venture) => (
                <li key={venture.id}>
                  <a
                    href={venture.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="font-bold text-[#FFFFFF] group-hover:text-[#F2B824] transition-colors flex items-center gap-1.5">
                      <span>{venture.name}</span>
                      <span className="text-xs text-[#F2B824] opacity-70 group-hover:opacity-100">
                        ↗
                      </span>
                    </div>
                    <div className="text-[11px] text-[#F8F5EF]/60 line-clamp-1">
                      {venture.tagline}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 (2 cols): Engagement */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#F2B824] mb-4">
              Engagement
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInquiry('Venture Studio / Idea Submission')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors cursor-pointer text-left"
                >
                  Submit a Venture
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInquiry('Client Project / Work With Us')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors cursor-pointer text-left"
                >
                  Work With Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInquiry('Strategic Partnership')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors cursor-pointer text-left"
                >
                  Strategic Partnerships
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInquiry('Remote Talent Network Application')}
                  className="text-[#F8F5EF]/75 hover:text-[#F2B824] transition-colors cursor-pointer text-left"
                >
                  Join Our Team
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Configurable Contact Information Bar (No Fake Addresses/Numbers) */}
        <div className="pt-8 pb-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#F8F5EF]/70">
          <div className="p-3.5 rounded-xl bg-[#590A1C]/25 border border-[#8F1028]/35">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#F2B824]">
              General Inquiries
            </div>
            <div className="mt-1 font-mono text-[11px] text-[#FFFFFF]">
              {SITE_CONFIG.contactPlaceholders.generalEmail}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#590A1C]/25 border border-[#8F1028]/35">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#F2B824]">
              Partnership & Studio Inquiries
            </div>
            <div className="mt-1 font-mono text-[11px] text-[#FFFFFF]">
              {SITE_CONFIG.contactPlaceholders.partnershipsEmail}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#590A1C]/25 border border-[#8F1028]/35">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#F2B824]">
              Operational Model
            </div>
            <div className="mt-1 text-[11px] text-[#FFFFFF]">
              {SITE_CONFIG.contactPlaceholders.location}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="mt-8 pt-6 border-t border-[#F8F5EF]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F5EF]/60">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.companyName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setInfoModal('privacy')}
              className="hover:text-[#F2B824] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setInfoModal('terms')}
              className="hover:text-[#F2B824] transition-colors cursor-pointer"
            >
              Terms of Engagement
            </button>
          </div>
        </div>
      </div>

      {/* Configurable Info Modal */}
      {infoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#21191D]/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#21191D] border border-[#8F1028] shadow-2xl text-[#F8F5EF]">
            <h4 className="font-display font-extrabold text-xl text-[#FFFFFF] capitalize mb-3">
              {infoModal === 'careers' ? 'Remote-First Talent Network' : infoModal}
            </h4>
            <p className="text-xs sm:text-sm text-[#F8F5EF]/80 leading-relaxed">
              {infoModal === 'careers'
                ? 'Scale54 operates as a remote-first, coordinated network of technology, creative and business specialists. We welcome high-calibre professionals to contribute across our ventures and client engagements.'
                : 'Official legal terms, privacy compliance and client engagement documentation are maintained and configured according to jurisdiction upon deployment.'}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                className="px-4 py-2 rounded-xl bg-[#8F1028] text-xs font-bold text-[#FFFFFF] hover:bg-[#590A1C] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
