import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
  isOut: boolean;
}

const useCursorPosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: -74, y: -74, isOut: false });

  const updateMousePosition = (ev: MouseEvent) => {
    setMousePosition({ isOut: false, x: ev.clientX, y: ev.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export { useCursorPosition };
