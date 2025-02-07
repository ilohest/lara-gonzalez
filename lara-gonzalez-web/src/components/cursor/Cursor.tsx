import React from "react";
import "./Cursor.scss";
import { useCursorPosition } from "src/hooks/useCursorPosition";

interface CursorProps {
  hidden: boolean;
  notAllowed: boolean;
}

const Cursor: React.FC<CursorProps> = ({ hidden, notAllowed }) => {
  const cursorPosition = useCursorPosition();
  const sizes = [210, 100, 76, 76, 50];
  const left = [-40, 20, 32, 32, 45];

  return (
    <>
      <svg
          width={sizes[0]}
          height={sizes[0]}
          viewBox="0 0 304 304"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`lara-cursor ${notAllowed ? "not-allowed" : ""} cursor-0`}
          style={{
              transform:
                  "matrix(1, 0, 0, 1, " +
                  (cursorPosition.x - 67) +
                  ", " +
                  (cursorPosition.y - 67) +
                  ")",
              opacity: hidden || cursorPosition.isOut ? 0 : 1,
              left: `${left[0]}px`,
              top: `${left[0]}px`,
          }}
      >
          <g filter="url(#filter0_f_238_1022)">
              <circle cx="151.695" cy="151.753" r="67.5" fill="#fff" />
              {/* <circle cx="151.695" cy="151.753" r="67" stroke="#010315" /> */}
          </g>
          <defs>
              <filter
                  id="filter0_f_238_1022"
                  x="0.195312"
                  y="0.25293"
                  width="303"
                  height="303"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
              >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                  />
                  <feGaussianBlur
                      stdDeviation="42"
                      result="effect1_foregroundBlur_238_1022"
                  />
              </filter>
          </defs>
      </svg>
    </>
  );
};

export default Cursor;
