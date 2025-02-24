import { useEffect, useState } from 'react';
import { scrollToTop } from '@lara/utils/react.utils';
import './ScrollTopButton.scss';
import React from 'react';

interface IconProps {
  className?: string;
  path: string;
}

const Icon: React.FC<IconProps> = ({ className, path }) => (
  <img className={className} src={path} alt="Arrow up icon" />
);

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector('.project-item-first'); 
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting); 
      },
      { root: null, threshold: 0 } 
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  return (
    <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
      <Icon className="back-to-top__arrow" path={'/src/assets/icons/arrow-top.svg'} />
      <a className="sr-only">
        <span>Back to top</span>
      </a>
    </button>
  );
};

export default BackToTopButton;

