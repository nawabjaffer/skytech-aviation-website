import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'scaleDown' | 'reveal' | 'stagger';

interface ScrollAnimationOptions {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  staggerAmount?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

/**
 * Custom hook for GSAP scroll-triggered animations with reverse on scroll back
 * Supports various animation types: fadeUp, fadeDown, fadeLeft, fadeRight, scaleUp, reveal, stagger
 */
export const useScrollAnimation = <T extends HTMLElement>(options: ScrollAnimationOptions = {}) => {
  const ref = useRef<T>(null);
  const {
    type = 'fadeUp',
    duration = 0.8,
    delay = 0,
    staggerAmount = 0.15,
    start = 'top 85%',
    end = 'top 20%',
    scrub = false,
    markers = false
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial states based on animation type
    const getInitialState = () => {
      switch (type) {
        case 'fadeUp':
          return { opacity: 0, y: 60 };
        case 'fadeDown':
          return { opacity: 0, y: -60 };
        case 'fadeLeft':
          return { opacity: 0, x: -60 };
        case 'fadeRight':
          return { opacity: 0, x: 60 };
        case 'scaleUp':
          return { opacity: 0, scale: 0.8 };
        case 'scaleDown':
          return { opacity: 0, scale: 1.2 };
        case 'reveal':
          return { opacity: 0, y: 40, scale: 0.95 };
        case 'stagger':
          return { opacity: 0, y: 40 };
        default:
          return { opacity: 0, y: 60 };
      }
    };

    // Set final (animated) states
    const getFinalState = () => {
      switch (type) {
        case 'fadeUp':
        case 'fadeDown':
          return { opacity: 1, y: 0, duration, delay, ease: 'power3.out' };
        case 'fadeLeft':
        case 'fadeRight':
          return { opacity: 1, x: 0, duration, delay, ease: 'power3.out' };
        case 'scaleUp':
        case 'scaleDown':
          return { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)' };
        case 'reveal':
          return { opacity: 1, y: 0, scale: 1, duration, delay, ease: 'power4.out' };
        case 'stagger':
          return { opacity: 1, y: 0, duration, delay, ease: 'power3.out', stagger: staggerAmount };
        default:
          return { opacity: 1, y: 0, duration, delay, ease: 'power3.out' };
      }
    };

    const initialState = getInitialState();
    const finalState = getFinalState();

    // Apply initial state
    gsap.set(element, initialState);

    // Create animation with ScrollTrigger
    const animation = gsap.to(element, {
      ...finalState,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        toggleActions: 'play reverse play reverse', // Forward on enter, reverse on leave
        scrub,
        markers,
      }
    });

    // Cleanup
    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [type, duration, delay, staggerAmount, start, end, scrub, markers]);

  return ref;
};

/**
 * Hook for staggered children animations
 */
export const useStaggerAnimation = <T extends HTMLElement>(options: ScrollAnimationOptions = {}) => {
  const containerRef = useRef<T>(null);
  const {
    type = 'fadeUp',
    duration = 0.6,
    delay = 0,
    staggerAmount = 0.1,
    start = 'top 85%',
    end = 'top 20%',
    scrub = false,
    markers = false
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    if (!children.length) return;

    // Initial state for children
    const getInitialState = () => {
      switch (type) {
        case 'fadeUp':
          return { opacity: 0, y: 50 };
        case 'fadeDown':
          return { opacity: 0, y: -50 };
        case 'fadeLeft':
          return { opacity: 0, x: -50 };
        case 'fadeRight':
          return { opacity: 0, x: 50 };
        case 'scaleUp':
          return { opacity: 0, scale: 0.85 };
        case 'reveal':
          return { opacity: 0, y: 30, scale: 0.95 };
        default:
          return { opacity: 0, y: 50 };
      }
    };

    const getFinalState = () => {
      switch (type) {
        case 'fadeUp':
        case 'fadeDown':
          return { opacity: 1, y: 0 };
        case 'fadeLeft':
        case 'fadeRight':
          return { opacity: 1, x: 0 };
        case 'scaleUp':
          return { opacity: 1, scale: 1 };
        case 'reveal':
          return { opacity: 1, y: 0, scale: 1 };
        default:
          return { opacity: 1, y: 0 };
      }
    };

    const initialState = getInitialState();
    const finalState = getFinalState();

    // Apply initial state to all children
    gsap.set(children, initialState);

    // Create staggered animation
    const animation = gsap.to(children, {
      ...finalState,
      duration,
      delay,
      stagger: staggerAmount,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start,
        end,
        toggleActions: 'play reverse play reverse',
        scrub,
        markers,
      }
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [type, duration, delay, staggerAmount, start, end, scrub, markers]);

  return containerRef;
};

/**
 * Hook for text reveal animations (word by word or letter by letter)
 */
export const useTextReveal = <T extends HTMLElement>(options: { splitBy?: 'words' | 'chars'; duration?: number; stagger?: number } = {}) => {
  const ref = useRef<T>(null);
  const { splitBy = 'words', duration = 0.5, stagger = 0.05 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const text = element.textContent || '';
    const items = splitBy === 'words' ? text.split(' ') : text.split('');
    
    // Clear and rebuild with spans
    element.innerHTML = items
      .map(item => `<span class="inline-block overflow-hidden"><span class="inline-block">${item}${splitBy === 'words' ? '&nbsp;' : ''}</span></span>`)
      .join('');

    const innerSpans = element.querySelectorAll('span > span');
    
    gsap.set(innerSpans, { y: '100%', opacity: 0 });

    const animation = gsap.to(innerSpans, {
      y: '0%',
      opacity: 1,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 40%',
        toggleActions: 'play reverse play reverse',
      }
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [splitBy, duration, stagger]);

  return ref;
};

export default useScrollAnimation;
