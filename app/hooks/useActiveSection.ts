import { useEffect, useState } from "react";

export type NavigationItem = { id: string; href: string; label: string };

// Custom hook to determine which section is currently active based on scroll
// navigationItems is expected to be a stable array (imported constant is fine)
export function useActiveSection(navigationItems: NavigationItem[], initial = "home") {
  const [activeSection, setActiveSection] = useState(initial);
  const OFFSET = 100; // Offset in pixels to consider a section active

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = initial;

      navigationItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (!section) return;

        const top = section.getBoundingClientRect().top;

        // Consider a section active when it is near or above the top of the viewport
        if (top <= OFFSET) {
          currentSection = item.id;
        }
      });

      setActiveSection(currentSection);
    };

    // run once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);

    // navigationItems is normally a stable import; avoid including it in deps to prevent
    // effect recomputation if the array identity changes during development.
    // If navigationItems may change at runtime, add it to the dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeSection;
}
