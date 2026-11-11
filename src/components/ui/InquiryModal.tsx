import React, { useEffect, useState } from 'react';
import { SITE_CONFIG } from '../../data/siteContent';
import { Scale54Logo } from './Scale54Logo';
import { MagneticButton } from './MagneticButton';

interface InquiryModalProps {
  isOpen: boolean;
  initialTopic?: string;
  onClose: () => void;
}

const ENGAGEMENT_OPTIONS = [
  'Business Consulting & Commercial Strategy',
  'Software & Enterprise Application Development',
  'AI Integration & WhatsApp AI Chatbots',
  'Digital Marketing & Brand Management',
  'Ongoing Service / Technical Outsourcing',
  'Strategic Venture Partnership',
];

const STAGE_OPTIONS = [
  'Concept / Early Idea',
  'Prototype / MVP Built',
  'Early Traction & Users',
  'Operational / Revenue-Generating',
];

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  initialTopic,
  onClose,
}) => {
  const isVentureInitial =
    initialTopic?.toLowerCase().includes('venture') ||
    initialTopic?.toLowerCase().includes('idea') ||
    initialTopic?.toLowerCase().includes('founder');

  const [formMode, setFormMode] = useState<'service' | 'venture'>(
    isVentureInitial ? 'venture' : 'service'
  );

  // Service Inquiry State
  const [selectedInterest, setSelectedInterest] = useState(ENGAGEMENT_OPTIONS[0]);
  const [name, setName] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [brief, setBrief] = useState('');

  // Venture Studio Application State (All 10 Brief Fields)
  const [founderName, setFounderName] = useState('');
  const [founderEmail, setFounderEmail] = useState('');
  const [founderPhone, setFounderPhone] = useState('');
  const [ventureName, setVentureName] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [devStage, setDevStage] = useState(STAGE_OPTIONS[0]);
  const [existingTeam, setExistingTeam] = useState('');
  const [supportRequired, setSupportRequired] = useState<string[]>([
    'Capital',
    'Product Engineering',
  ]);
  const [pitchDeckUrl, setPitchDeckUrl] = useState('');

  const [submittedMode, setSubmittedMode] = useState<'service' | 'venture' | null>(null);

  useEffect(() => {
    if (initialTopic) {
      if (
        initialTopic.toLowerCase().includes('venture') ||
        initialTopic.toLowerCase().includes('idea') ||
        initialTopic.toLowerCase().includes('founder')
      ) {
        setFormMode('venture');
      } else {
        setFormMode('service');
        const matched = ENGAGEMENT_OPTIONS.find((opt) =>
          opt.toLowerCase().includes(initialTopic.toLowerCase().slice(0, 8))
        );
        if (matched) setSelectedInterest(matched);
      }
    }
  }, [initialTopic]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSupportRequirement = (item: string) => {
    setSupportRequired((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Real submission handler hook for backend integration
    console.log('[Scale54 Service Inquiry]', {
      name,
      organisation,
      email,
      phone,
      service: selectedInterest,
      brief,
      submittedAt: new Date().toISOString(),
    });
    setSubmittedMode('service');
  };

  const handleVentureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Real venture application submission handler hook for backend integration
    console.log('[Scale54 Venture Studio Application]', {
      founderName,
      contact: { email: founderEmail, phone: founderPhone },
      ventureName,
      problem,
      solution,
      targetMarket,
      developmentStage: devStage,
      existingTeam,
      supportRequired,
      pitchDeckUrl,
      submittedAt: new Date().toISOString(),
    });
    setSubmittedMode('venture');
  };

  const handleReset = () => {
    setSubmittedMode(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#21191D]/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl bg-[#21191D] border-2 border-[#8F1028]/60 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden text-[#F8F5EF] max-h-[92vh] flex flex-col">
        {/* Top Crimson & Gold Ribbon Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#590A1C] via-[#8F1028] to-[#F2B824]" />

        <div className="p-6 sm:p-8 overflow-y-auto">
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#F8F5EF]/10">
            <div>
              <Scale54Logo variant="light" size="sm" />
              <h3
                id="inquiry-modal-title"
                className="mt-3 font-display font-extrabold text-2xl sm:text-3xl text-[#FFFFFF]"
              >
                {formMode === 'venture' ? 'Venture Studio Application' : 'Initiate an Engagement'}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#F8F5EF]/75">
                {formMode === 'venture'
                  ? 'Submit your business idea or technology venture for Scale54 Studio evaluation.'
                  : 'Tell us about your consulting, software development or marketing requirements.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-10 h-10 rounded-xl bg-[#590A1C]/60 hover:bg-[#8F1028] text-[#F8F5EF] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Form Mode Selector Switcher */}
          {!submittedMode && (
            <div className="mt-5 p-1 rounded-xl bg-[#590A1C]/35 border border-[#8F1028]/45 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFormMode('venture')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer ${
                  formMode === 'venture'
                    ? 'bg-[#F2B824] text-[#21191D] shadow-md'
                    : 'text-[#F8F5EF]/75 hover:text-[#FFFFFF]'
                }`}
              >
                Venture Studio (Submit Idea)
              </button>
              <button
                type="button"
                onClick={() => setFormMode('service')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer ${
                  formMode === 'service'
                    ? 'bg-[#F2B824] text-[#21191D] shadow-md'
                    : 'text-[#F8F5EF]/75 hover:text-[#FFFFFF]'
                }`}
              >
                Services & Project Inquiry
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUBMISSION CONFIRMATION STATE */}
          {/* ========================================================================= */}
          {submittedMode ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#8F1028]/30 border border-[#F2B824] flex items-center justify-center text-[#F2B824]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h4 className="font-display font-extrabold text-2xl text-[#FFFFFF]">
                {submittedMode === 'venture'
                  ? 'We received your venture idea!'
                  : 'Thank you for reaching out!'}
              </h4>

              <p className="text-xs sm:text-sm text-[#F8F5EF]/85 max-w-md mx-auto leading-relaxed">
                Thank you,{' '}
                <span className="text-[#F2B824] font-bold">
                  {submittedMode === 'venture' ? founderName : name || 'Partner'}
                </span>
                . We appreciate you taking the time to share what you&apos;re working on.
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#590A1C]/35 border border-[#8F1028]/40 text-xs text-[#F8F5EF]/80 max-w-md mx-auto space-y-2 text-left">
                <div className="font-bold text-[#F2B824] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2B824]" />
                  <span>What happens next:</span>
                </div>
                <p className="text-xs leading-relaxed text-[#F8F5EF]/85">
                  Our team will review your submission carefully within 5 business days. If there is strong mutual alignment, we will reach out directly to schedule an informal introductory conversation to discuss how we can collaborate.
                </p>
                <div className="text-[11px] text-[#F8F5EF]/60 pt-2 border-t border-[#F8F5EF]/10">
                  Questions in the meantime? Reach us directly at{' '}
                  <span className="text-[#FFFFFF] font-mono">{SITE_CONFIG.contactPlaceholders.partnershipsEmail}</span>
                </div>
              </div>

              <div className="pt-2">
                <MagneticButton variant="gold" onClick={handleReset} showArrow={false}>
                  Return to Website
                </MagneticButton>
              </div>
            </div>
          ) : formMode === 'venture' ? (
            /* ========================================================================= */
            /* VENTURE STUDIO APPLICATION FORM (ALL 10 BRIEF FIELDS) */
            /* ========================================================================= */
            <form onSubmit={handleVentureSubmit} className="mt-6 space-y-4">
              <div className="p-3.5 rounded-xl bg-[#590A1C]/30 border border-[#F2B824]/30 text-xs text-[#F8F5EF]/85">
                <span className="text-[#F2B824] font-bold">Collaborative Partnership: </span>
                Tell us about what you&apos;re building. We partner with dedicated founders, providing milestone seed capital (up to FCFA 300,000), engineering, branding and hands-on launch support.
              </div>

              {/* 1. Founder Name & 2. Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                    Founder Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={founderEmail}
                    onChange={(e) => setFounderEmail(e.target.value)}
                    placeholder="founder@venture.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={founderPhone}
                    onChange={(e) => setFounderPhone(e.target.value)}
                    placeholder="+237 ..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                  />
                </div>
              </div>

              {/* 3. Business or Venture Name & 6. Target Market */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                    Venture / Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={ventureName}
                    onChange={(e) => setVentureName(e.target.value)}
                    placeholder="Name of proposed business"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                    Target Market & Geography *
                  </label>
                  <input
                    type="text"
                    required
                    value={targetMarket}
                    onChange={(e) => setTargetMarket(e.target.value)}
                    placeholder="e.g. Cameroonian SMEs, African students"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                  />
                </div>
              </div>

              {/* 4. Problem Being Addressed */}
              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                  Problem Being Addressed *
                </label>
                <textarea
                  rows={2}
                  required
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="What critical market problem or inefficiency does this venture solve?"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                />
              </div>

              {/* 5. Proposed Solution */}
              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                  Proposed Solution & Product *
                </label>
                <textarea
                  rows={2}
                  required
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="How does your technology product or business solve this problem?"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                />
              </div>

              {/* 7. Current Development Stage & 8. Existing Team */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                    Current Development Stage *
                  </label>
                  <select
                    value={devStage}
                    onChange={(e) => setDevStage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#21191D] border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                  >
                    {STAGE_OPTIONS.map((stg) => (
                      <option key={stg} value={stg} className="bg-[#21191D]">
                        {stg}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                    Existing Team Overview *
                  </label>
                  <input
                    type="text"
                    required
                    value={existingTeam}
                    onChange={(e) => setExistingTeam(e.target.value)}
                    placeholder="e.g. Solo founder, 2 co-founders"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                  />
                </div>
              </div>

              {/* 9. Required Support (Multi-Select) */}
              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1.5">
                  Required Studio Support *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    'Capital',
                    'Product Engineering',
                    'Brand & UX Design',
                    'Go-to-Market',
                  ].map((item) => {
                    const active = supportRequired.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSupportRequirement(item)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                          active
                            ? 'bg-[#8F1028] border-[#F2B824] text-[#FFFFFF]'
                            : 'bg-[#590A1C]/25 border-[#F8F5EF]/15 text-[#F8F5EF]/70'
                        }`}
                      >
                        {item} {active ? '✓' : '+'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 10. Pitch Deck or Business Proposal URL */}
              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                  Pitch Deck or Business Proposal URL (Optional)
                </label>
                <input
                  type="url"
                  value={pitchDeckUrl}
                  onChange={(e) => setPitchDeckUrl(e.target.value)}
                  placeholder="https://drive.google.com/... or Notion link"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-[#F8F5EF]/60">
                  Milestone-based approval • Negotiated equity terms.
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#F2B824] hover:bg-[#FFFFFF] text-[#21191D] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Submit Venture Idea →
                </button>
              </div>
            </form>
          ) : (
            /* ========================================================================= */
            /* SERVICES & CLIENT CONSULTING INQUIRY FORM */
            /* ========================================================================= */
            <form onSubmit={handleServiceSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#F2B824] mb-2">
                  Select Service Domain
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ENGAGEMENT_OPTIONS.map((option) => {
                    const active = selectedInterest === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSelectedInterest(option)}
                        className={`text-left px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#8F1028] border-[#F2B824] text-[#FFFFFF]'
                            : 'bg-[#590A1C]/30 border-[#F8F5EF]/15 text-[#F8F5EF]/80 hover:border-[#F8F5EF]/40'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                    Organisation / Company
                  </label>
                  <input
                    type="text"
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                    placeholder="Company name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organisation.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+237 ..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF]/80 mb-1">
                  Project Overview & Scope *
                </label>
                <textarea
                  rows={3}
                  required
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Share your goals, requirements, timeline or questions..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF]/5 border border-[#F8F5EF]/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#F2B824]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-[#F8F5EF]/60">
                  Response coordinated within 24–48 hours.
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#F2B824] hover:bg-[#FFFFFF] text-[#21191D] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Submit Inquiry →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
