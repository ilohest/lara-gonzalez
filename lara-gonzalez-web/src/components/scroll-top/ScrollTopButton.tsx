import { useEffect, useState } from 'react';
import { scrollToTop } from '@lara/utils/react.utils';
import './ScrollTopButton.scss';
import React from 'react';
import Icon from '../shared/Icon';


const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

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

  if (!isVisible) return null;

  return (
    <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
      <Icon classes="back-to-top__arrow" url={'public/icons/arrow-top.svg'} />
      <a className="sr-only">
        <span>Back to top</span>
      </a>
    </button>
  );
};

export default BackToTopButton;

