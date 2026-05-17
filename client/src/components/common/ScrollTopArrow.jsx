import { useEffect, useState } from "react";
import "../../styles/ScrollTopArrow.css";

const ScrollTopArrow = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Desplazamiento suave
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-top-arrow"
          aria-label="Ir arriba"
          title="Subir al inicio"
        >
          <i className="fa-solid fa-angles-up"></i>
        </button>
      )}
    </>
  );
};

export default ScrollTopArrow;
