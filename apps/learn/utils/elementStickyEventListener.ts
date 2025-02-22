type Config = {
  selector: string;
  top: number;
  callback: (isSticky: boolean, target: Element) => void;
};

export const elementStickyEventListener = ({
  callback,
  selector,
  top,
}: Config) => {
  const fn = () => {
    const el = document.querySelector(selector);
    const bound = el?.getBoundingClientRect();

    if (bound && el) {
      callback(bound.top === top, el);
    }
  };
  fn();
  window.addEventListener("scroll", fn);

  return () => window.removeEventListener("scroll", fn);
};
