import IntersectionItem from "@lara/components/intersection/IntersectionItem";
import { buildSrc } from "@lara/utils/content.utils";
import { useStateRef } from "@lara/utils/react.utils";
import React, {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
  type HTMLAttributes,
} from "react";
import "./Picture.scss";

declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: "high" | "low" | "auto";
  }
}

export interface PictureProps {
  formats?: Array<{ url: string; width: number; height: number }>;
  src: string;
  alt?: string;
  title?: string;
  cover?: boolean;
  contain?: boolean;
  className?: string;
  isAnimated?: boolean;
  asBackground?: boolean;
  rounded?: boolean;
  children?: React.ReactNode;
  loading?: "lazy" | "eager";
  fetchPriority?: "auto" | "high" | "low";
  blurPreload?: boolean;
  blurPreloadType?: "default" | "no-scale";
  onClick?: () => void;
  handleImageLoaded?: () => void;
}

interface PictureCustomCSSProps extends CSSProperties {
  "--picture-url"?: string;
}

const Picture = ({
  src,
  alt,
  title,
  formats,
  cover,
  contain,
  className,
  asBackground,
  isAnimated,
  rounded = false,
  children,
  loading = "lazy",
  fetchPriority = "auto",
  blurPreload = false,
  blurPreloadType = "default",
  onClick,
  handleImageLoaded,
}: PictureProps) => {
  const [imageLoaded, setImageLoaded] = useStateRef(false);
  const [intersected, setIntersected] = useState(false);

  const baseClasses = {
    picture: true,
    "picture--contain": !!contain,
    "picture--cover": !!cover,
    "picture--background": !!asBackground,
    "picture--rounded": !!rounded,
    "picture--blurpreload": !!blurPreload,
    "picture--animated": !!isAnimated,
    "picture--animate": !!intersected,
    "picture--blurpreload-no-scale": blurPreloadType === "no-scale",
    "picture--loaded": imageLoaded,
  };

  // Convertimos className string en un objeto de clases individuales
  const extraClasses =
    className?.split(" ").reduce((acc, cls) => {
      if (cls.trim()) acc[cls.trim()] = true;
      return acc;
    }, {} as Record<string, boolean>) || {};

  const classes = Object.entries({ ...baseClasses, ...extraClasses })
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(" ");

  const elementRef = useRef(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const loadingImage = formats?.find((i) => i.width < 500);
  const thumbnailImage = formats?.find((i) => i.width <= 250);

  const srcSetArray = formats
    ?.filter((f) => !!f.url && !!f.width)
    .map(
      (format, i) =>
        `${buildSrc({ src: format.url })} ${formats?.[i + 1]?.width || 1}w`
    );

  const srcSet = srcSetArray
    ? `${buildSrc({ src })} ${formats?.[0]?.width}w, ${srcSetArray?.join(", ")}`
    : undefined;

  useEffect(() => {
    if (!blurPreload) return;
    if (!imgRef.current?.complete) {
      imgRef.current?.addEventListener("load", () => {
        setImageLoaded(true);
      });
    } else {
      setImageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (imageLoaded && handleImageLoaded) {
      handleImageLoaded();
    }
  }, [imageLoaded]);

  const pictureStyles: PictureCustomCSSProps | undefined =
    (blurPreload && thumbnailImage) || loadingImage
      ? {
          "--picture-url": `url("${buildSrc({
            src: thumbnailImage?.url ?? loadingImage?.url,
          })}")`,
        }
      : undefined;

  const ImgElement = (
    <img
      ref={imgRef}
      className="picture__img"
      src={buildSrc({ src })}
      alt={alt ?? ""}
      title={title}
      loading={loading}
      onLoad={() => setImageLoaded(true)}
      fetchPriority={fetchPriority}
      width={loadingImage?.width}
      height={loadingImage?.height}
    />
  );

  const PictureContent = (
    <picture
      ref={elementRef}
      className={classes}
      onClick={() => onClick?.()}
      style={pictureStyles}
    >
      {srcSet && <source srcSet={srcSet} />}
      {children}
      {ImgElement}
    </picture>
  );

  return isAnimated ? (
    <IntersectionItem
      callback={(isIntersecting) => {
        if (isIntersecting) setIntersected(true);
      }}
      itemRef={elementRef}
      options={{
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: 0,
      }}
    >
      {PictureContent}
    </IntersectionItem>
  ) : (
    PictureContent
  );
};

export default Picture;
