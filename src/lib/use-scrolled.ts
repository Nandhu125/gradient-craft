import { useState, useEffect } from "react";

/** Tracks whether the window has scrolled past `threshold` px (default 20).
    Shared by the landing shell and the templates page navbar. */
export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll(); // sync on mount in case the page loads already scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}
