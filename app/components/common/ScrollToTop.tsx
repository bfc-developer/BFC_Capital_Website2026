"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  // Show button only when scrolling up and past a certain threshold
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const toggleVisibility = () => {
      const currentScrollY = window.scrollY;

      // If scrolling UP and we are not at the very top (e.g. > 300px down)
      if (currentScrollY < lastScrollY && currentScrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Scroll to top button (mobile only) */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 md:hidden ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <button
          onClick={scrollToTop}
          className="bg-[#024B39] hover:bg-[#039c75] text-white p-3 rounded-full shadow-lg transition-colors flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} strokeWidth={2.5} />
        </button>
      </div>
    </>
  );
}
