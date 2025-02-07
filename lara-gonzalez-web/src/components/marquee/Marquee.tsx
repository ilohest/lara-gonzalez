import { useEffect, useRef, useState, type CSSProperties } from 'react';
import './Marquee.scss';
import { classList } from '@lara/utils/react.utils';
import React from 'react';

interface CustomCSSProps extends CSSProperties {
  '--item-width': string;
  '--animation-duration': string;
}

const Marquee = ({
  clones = 4,
  children,
  link,
}: {
  clones?: number;
  children: React.ReactNode;
  link?: string;
}) => {
  const firstItemRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const secondCheckTimeoutRef = useRef<any| null>(null);

  clones = clones < 2 ? 2 : clones;

  useEffect(() => {
    if (!firstItemRef.current) return;
    const currentWidth =
      firstItemRef.current?.getBoundingClientRect().width || 0;
    setItemWidth(Math.floor(currentWidth));

    if (currentWidth > 0) {
      setLoaded(true);
    }

    secondCheckTimeoutRef.current = setTimeout(setWidth, 1000);
    window.addEventListener('resize', setWidth);
    return () => {
      window.removeEventListener('resize', setWidth);
      if (secondCheckTimeoutRef.current) {
        clearTimeout(secondCheckTimeoutRef.current);
      }
    };
  }, []);

  const setWidth = () => {
    const currentWidth =
      firstItemRef.current?.getBoundingClientRect().width || 0;
    if (currentWidth !== itemWidth) {
      setItemWidth(Math.floor(currentWidth));
    }
  };

  return (
    <div
      className={classList({
        marquee: true,
        'marquee--loaded': loaded,
      })}
      style={
        {
          '--item-width': `${itemWidth}`,
        } as CustomCSSProps
      }
    >
      <div className="marquee__inner">
        <div className="marquee__content">
          <div className="marquee__item" ref={firstItemRef}>
            <a href={link} className="marquee__link">
              {children}
              <span>·</span>
            </a>
          </div>

          {Array.from({ length: clones - 1 }).map((_, i) => (
            <div className="marquee__item" key={i}>
              <a href={link} className="marquee__link">
                {children}
                <span>·</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
