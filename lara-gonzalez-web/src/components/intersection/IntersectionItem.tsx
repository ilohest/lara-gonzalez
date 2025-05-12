import { useEffect, useRef } from "react";

export const IntersectionItem = ({
  children,
  itemRef,
  skip,
  options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  },
  callback,
}: {
  children: React.ReactNode;
  itemRef: React.RefObject<HTMLElement | null>;
  options?: IntersectionObserverInit;
  skip?: boolean;
  callback?: (entry: boolean) => void;
}) => {
  if (skip) {
    return children;
  }

  const observerRef = useRef<IntersectionObserver | undefined>(undefined);

  useEffect(() => {
    if (!itemRef.current) return;
    observerRef.current = initIntersectionObserver();
    // return () => observerRef.current?.disconnect();
  }, []);

  const initIntersectionObserver = () => {
    if (!itemRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback?.(true);
        } else {
          callback?.(false);
        }
      });
    }, options);
    observer.observe(itemRef.current);

    return observer;
  };

  // const resetIntersectionObserver = () => {
  //   observerRef.current?.disconnect();
  //   observerRef.current = initIntersectionObserver();
  // };

  return children;
};

export default IntersectionItem;
