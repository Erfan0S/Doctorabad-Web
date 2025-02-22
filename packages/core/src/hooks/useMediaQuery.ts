import { isServerSide } from "../constants/constants";
import { useEffect, useRef, useState } from "react";

type Query = string | { min: number; max: number };

export const useMediaQuery = (query: Query) => {
  const mediaQuery = useRef(
    !isServerSide
      ? window.matchMedia(
          typeof query === "string"
            ? `(${query})`
            : `(min-width:${query.min}px) and (max-width:${query.max}px)`
        )
      : ({ matches: false } as MediaQueryList)
  ).current;
  const [match, setMatch] = useState(mediaQuery.matches);

  useEffect(() => {
    if (mediaQuery?.addEventListener) {
      const listener = (e: MediaQueryListEvent) => {
        setMatch(e.matches);
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, [mediaQuery]);

  return match;
};
