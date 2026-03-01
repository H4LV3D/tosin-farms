"use client";

import { useEffect } from "react";

export function PageObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.closest("section");
            if (section) {
              const reveals = section.querySelectorAll(".reveal:not(.active)");
              let delay = 0;
              reveals.forEach((el) => {
                if (!el.classList.contains("active")) {
                  setTimeout(() => el.classList.add("active"), delay);
                  delay += 120;
                }
              });
            } else {
              entry.target.classList.add("active");
            }
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.08 },
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
