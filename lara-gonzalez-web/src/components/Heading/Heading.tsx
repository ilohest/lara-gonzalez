
import React, { type CSSProperties, type JSX } from 'react';
import './Heading.scss';
import { classList, wrapWordsInSpan } from '@lara/utils/react.utils';

export type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSizes = 'xxl' | 'xl' | 'lg' | 'md' | 'base';

export interface HeadingProps {
  tag: HeadingTags;
  text?: string;
  size?: HeadingSizes;
  color?:
    | 'dark'
    | 'light';
  fontFamily?: 'primary' | 'secondary';
  headingFontWeight?: number | string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  wrapTextWords?: boolean;
  setOpticalCorrection?: boolean;
}

export interface CustomProps extends CSSProperties {
  '--heading-font-variation-settings'?: string;
}

const Heading = ({
  size,
  tag,
  text,
  color,
  fontFamily,
  headingFontWeight,
  description,
  children,
  className,
  wrapTextWords,
}: HeadingProps) => {
  color = color || 'dark';
  fontFamily = fontFamily || 'primary';
  headingFontWeight = headingFontWeight || 'inherit';

  const headingStyle: CustomProps = {
    '--heading-font-variation-settings': `'wght' ${headingFontWeight}`,
  };

  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <>
      <Tag
        className={classList({
          heading: true,
          [`heading--${size}`]: true,
          [`heading--${color}`]: true,
          [`heading--${fontFamily}`]: true,
          [`${className}`]: !!className,
        })}
        style={headingStyle as CustomProps}
        {...(text
          ? {
              dangerouslySetInnerHTML: {
                __html: wrapTextWords ? wrapWordsInSpan(text) : text,
              },
            }
          : { children })}
      />
      {description && <div className="heading__description">{description}</div>}
    </>
  );
};

export default Heading;
