import React, { Fragment, useRef, useState, useEffect } from 'react';
import './Collapse.scss';
import type { JSX } from 'astro/jsx-runtime';

interface CollapseProps {
  className?: string;
  heading: string;
  headingTag?: 'h2' | 'h3' | 'h4' | 'span';
  hasCTA?: boolean;
  CTA?: {link: string, text: string};
  tag?: 'article' | 'div';
  icon?: boolean;
  children: JSX.Element;
  subsHeaderHeight?: boolean;
}

interface CollapseInnerProps {
  heading: string;
  headingTag: 'h2' | 'h3' | 'h4' | 'span';
  hasCTA?: boolean;
  CTA?: {link: string, text: string};
  icon: boolean;
  onChange?: (el: HTMLElement, headerEl: HTMLElement) => void;
  onResize?: (el: HTMLElement, headerEl: HTMLElement) => void;
  children: JSX.Element;
}

const CollapseInner = ({ heading, headingTag, hasCTA, CTA, icon, children, onChange, onResize } : CollapseInnerProps) => {

  const contentInner = useRef(null);
  const headerRef = useRef(null);

  const handleClick = () => {
    const contentInnerRef = contentInner?.current as HTMLElement | null;
    const headerEl = headerRef?.current as HTMLElement | null;
    if (contentInnerRef && headerEl) onChange?.(contentInnerRef, headerEl);
  }

  useEffect(() => {
    const handleResize = () => {
      const contentInnerRef = contentInner?.current as HTMLElement | null;
      const headerEl = headerRef?.current as HTMLElement | null;
      if (contentInnerRef && headerEl) onResize?.(contentInnerRef, headerEl);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <Fragment>
      <header className="collapse__header" ref={headerRef}>
      {React.createElement(
        headingTag, 
        { 
          className: 'collapse__heading', 
          onClick: () => handleClick() 
        }, 
        heading
      )}
      {hasCTA && CTA && (
        <a className="button button--regular" href={CTA.link}>
          {CTA.text}
        </a>
      )}
    </header>
      <div className="collapse__content">
        <div className="collapse__content-inner" ref={contentInner}>
          {children}
        </div>
      </div>
    </Fragment>
  )
}

export const Collapse = ({ className, headingTag, tag, heading, CTA, hasCTA, icon, children, subsHeaderHeight }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  className = !!isOpen ? `collapse collapse--open ${className ?? ''}` : `collapse collapse--close ${className ?? ''}`;
  headingTag = headingTag ?? 'h2';
  tag = tag ?? 'article';
  icon = icon ?? true;
  subsHeaderHeight = subsHeaderHeight ?? false;

  const isMobile = () => {
    return matchMedia('(max-width: 767px)').matches;
  }

  const setElsHeights = (contentInnerEl: HTMLElement, headerEl: HTMLElement) => {
    const headerElHeight = headerEl.getBoundingClientRect().height;
    const contentInnerElHeight = contentInnerEl.getBoundingClientRect().height;

    setHeaderHeight(headerElHeight);
    setHeight(subsHeaderHeight && !isMobile() ? contentInnerElHeight - headerElHeight : contentInnerElHeight);
  }

  const toggle = (contentInnerEl: HTMLElement, headerEl: HTMLElement) => {
    setElsHeights(contentInnerEl, headerEl);
    setIsOpen(!isOpen);
  }

  return React.createElement(tag, {
    className,
    style: {
      '--exp-height': !!isOpen ? `${height ? `${height}px` : 'auto' }`: 0,
      '--header-height': headerHeight
    }},

    <CollapseInner
      heading={heading}
      hasCTA={hasCTA}
      CTA={CTA}
      headingTag={headingTag}
      icon={icon}
      onChange={(el: HTMLElement, headerEl: HTMLElement) => { toggle(el, headerEl) }}
      onResize={(el: HTMLElement, headerEl: HTMLElement) => { setElsHeights(el, headerEl) }}
    >
      {children}
    </CollapseInner>
  );
};
