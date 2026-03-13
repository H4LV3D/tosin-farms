"use client";

import { useState, useEffect } from "react";

/**
 * Module-level flag — survives SPA navigations but resets on hard refresh.
 * This lets the hero know whether the page loader has already fired.
 */
let _pageLoaded = false;

/**
 * Returns true after `delay` ms on first hard load.
 * On subsequent SPA navigations it returns true immediately so
 * components don't sit invisible waiting for a loader that never shows.
 */
export function useIsLoaded(delay = 1500) {
  const [isLoaded, setIsLoaded] = useState(_pageLoaded);

  useEffect(() => {
    if (_pageLoaded) return; // loader already done — skip timer

    const t = setTimeout(() => {
      _pageLoaded = true;
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(t);
  }, [delay]);

  return isLoaded;
}
