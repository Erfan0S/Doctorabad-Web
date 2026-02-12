import { useEffect, useState } from "react";

export function useIsMobile(breakpoint: number = 768) {
  // 1. Default to false so the server-rendered HTML matches the initial client render
  // (Prevents "Hydration failed" errors)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 2. This code only runs on the client, where 'window' is defined
    const media = window.matchMedia(`(max-width: ${breakpoint}px)`);

    // 3. Update state immediately based on current window size
    setIsMobile(media.matches);

    // 4. Create a listener to handle resizing efficiently
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    // 5. Add the listener
    media.addEventListener("change", listener);

    // 6. Cleanup listener on unmount
    return () => media.removeEventListener("change", listener);
  }, [breakpoint]);

  return isMobile;
}
