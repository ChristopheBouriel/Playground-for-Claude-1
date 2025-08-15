import { animateScroll as scroll } from "react-scroll";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: "easeInOutQuart"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-12 h-12 bg-white border-2 border-brightColor text-brightColor hover:bg-brightColor hover:text-white transition-all duration-300 rounded-full flex items-center justify-center shadow-lg z-50"
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default ScrollToTop;