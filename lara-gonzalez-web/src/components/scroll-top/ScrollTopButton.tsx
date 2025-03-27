import { useEffect, useState } from 'react';
import React from 'react';
import './ScrollTopButton.scss';
import Icon from '../shared/Icon';
import Lenis from 'lenis';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lenisInstance = new Lenis();
      setLenis(lenisInstance);

      function raf(time: number) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }
  }, []);

  useEffect(() => {
    const firstProject = document.querySelector(".projects__item--first");
    if (!firstProject) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.boundingClientRect.top <= 0);
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(firstProject);

    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    lenis?.scrollTo(0, { duration: 1.5 });
  };

  if (!isVisible) return null;

  return (
    <button className="back-to-top" onClick={handleScrollToTop} aria-label="Back to top">
      <Icon classes="back-to-top__arrow" url={'/static-icons/arrow-top.svg'} />
      <span className="sr-only">Back to top</span>
    </button>
  );
};

export default BackToTopButton;
