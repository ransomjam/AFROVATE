import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Reusable staggered text/element entrance linked to ScrollTrigger
 */
export function animateStaggerReveal(
  targets: gsap.TweenTarget,
  trigger: Element | string | null,
  options?: {
    y?: number;
    stagger?: number;
    duration?: number;
    delay?: number;
    start?: string;
  }
) {
  if (prefersReducedMotion() || !trigger) {
    gsap.set(targets, { opacity: 1, y: 0, clearProps: 'transform' });
    return null;
  }

  return gsap.fromTo(
    targets,
    {
      opacity: 0,
      y: options?.y ?? 42,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.95,
      stagger: options?.stagger ?? 0.12,
      delay: options?.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start: options?.start ?? 'top 82%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Reusable diagonal/directional clip-path image reveal
 */
export function animateMaskReveal(
  target: gsap.TweenTarget,
  trigger: Element | string | null,
  direction: 'left-to-right' | 'bottom-to-top' | 'diagonal' = 'diagonal',
  start = 'top 80%'
) {
  if (prefersReducedMotion() || !trigger) {
    gsap.set(target, { opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
    return null;
  }

  const initialClip =
    direction === 'left-to-right'
      ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
      : direction === 'bottom-to-top'
      ? 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
      : 'polygon(0% 12%, 0% 0%, 0% 100%, 0% 100%)';

  return gsap.fromTo(
    target,
    {
      clipPath: initialClip,
      opacity: 0.2,
    },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      opacity: 1,
      duration: 1.25,
      ease: 'expo.out',
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Reusable subtle GPU-friendly vertical parallax for inner photography
 */
export function animateSubtleParallax(
  target: gsap.TweenTarget,
  trigger: Element | string | null,
  yPercent = 10
) {
  if (prefersReducedMotion() || !trigger) return null;

  return gsap.fromTo(
    target,
    { yPercent: -yPercent },
    {
      yPercent: yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
}
