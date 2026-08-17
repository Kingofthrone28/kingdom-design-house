import { useEffect, useRef } from 'react';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function useSectionMotion() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const sections = Array.from(root.querySelectorAll('[data-motion-section]'));
    const parallaxSections = Array.from(root.querySelectorAll('[data-parallax-section]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reducedMotion.matches) {
      sections.forEach((section) => section.setAttribute('data-motion-state', 'visible'));
      root.setAttribute('data-motion-enabled', 'reduced');
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.setAttribute('data-motion-state', 'visible'));
      root.setAttribute('data-motion-enabled', 'reduced');
      return undefined;
    }

    sections.forEach((section) => section.setAttribute('data-motion-state', 'hidden'));
    root.setAttribute('data-motion-enabled', 'true');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-motion-state', 'visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '-8% 0px -8% 0px', threshold: 0.16 }
    );

    sections.forEach((section) => observer.observe(section));

    let frameId = null;
    const updateParallax = () => {
      frameId = null;
      const viewportCenter = window.innerHeight / 2;

      parallaxSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;

        const sectionCenter = rect.top + rect.height / 2;
        const distance = viewportCenter - sectionCenter;
        section.style.setProperty('--parallax-slow', `${clamp(distance * 0.045, -34, 34)}px`);
        section.style.setProperty('--parallax-fast', `${clamp(distance * 0.085, -62, 62)}px`);
        section.style.setProperty('--parallax-reverse', `${clamp(distance * -0.032, -26, 26)}px`);
      });
    };

    const requestParallaxUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    window.addEventListener('resize', requestParallaxUpdate);
    requestParallaxUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', requestParallaxUpdate);
      window.removeEventListener('resize', requestParallaxUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return rootRef;
}
