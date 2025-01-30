import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Mover el cursor al cambiar la posición del ratón
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`; // Ajustamos el tamaño del cursor
      }
    };

    // Escuchar el movimiento global del ratón
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        width: "40px",
        height: "40px",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
        borderRadius: "50%",
        boxShadow: "0 0 50px 20px rgba(0, 0, 255, 0.6)",
        pointerEvents: "none",
        zIndex: 9999,
        top: 0,
        left: 0,
        transform: "translate(-50%, -50%)", // Comienza centrado
        transition: "transform 0.1s ease-out", // Suaviza el movimiento inicial
      }}
    />
  );
};

export default Cursor;
