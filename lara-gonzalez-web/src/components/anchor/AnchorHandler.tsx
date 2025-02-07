import { useEffect } from "react";

const AnchorHandler = () => {
  useEffect(() => {
    const anchorLinks = document.querySelectorAll(".button--link[data-anchor]");

    anchorLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("data-anchor");
        const targetElement = document.getElementById(targetId!);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }, []);

  return null;
};

export default AnchorHandler;

