import { useCallback } from 'react';

/**
 * Custom hook for smooth scrolling to sections
 * Usage: const scrollToSection = useSmoothScroll();
 *        scrollToSection('section-id');
 */
export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId: string, offset: number = 80) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return scrollToSection;
};

/**
 * Custom hook for smooth scroll to top
 * Usage: const scrollToTop = useScrollToTop();
 *        scrollToTop();
 */
export const useScrollToTop = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return scrollToTop;
};
