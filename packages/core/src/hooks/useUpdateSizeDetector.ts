"use client";
import { useEffect, useRef, useState } from "react";
import useDebounceAction from "@repo/core/hooks/useDebounceAction";

function useUpdateSizeDetector() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const currentSize = useRef({
    width: 0,
    height: 0,
  });
  const prevSize = useRef({
    width: 0,
    height: 0,
  });

  const updateSize = useDebounceAction(() => {
    if (
      currentSize.current.width === 0 &&
      currentSize.current.height === 0 &&
      prevSize.current.width === 0 &&
      prevSize.current.height === 0
    ) {
      console.log("set initial prev size");

      prevSize.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 300);

  useEffect(() => {
    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    prevSize.current = currentSize.current;

    console.log("prev size", prevSize);
    console.log("size", size);

    currentSize.current = size;
  }, [size]);

  return [size, prevSize.current];
}

export default useUpdateSizeDetector;
