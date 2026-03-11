import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  /* ---------------- Scroll to top on page change ---------------- */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [pathname]);

  /* ---------------- Show / hide button on scroll ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- Manual scroll button ---------------- */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center overflow-hidden rounded-[22px] border border-white/15 bg-[#0a1020]/60 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* Glass highlight */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent" />

      {/* Inner border */}
      <span className="pointer-events-none absolute inset-[1px] rounded-[21px] border border-white/10" />

      {/* Icon */}
      <ArrowUp className="relative z-10" size={28} strokeWidth={2.5} />
    </button>
  );
}
