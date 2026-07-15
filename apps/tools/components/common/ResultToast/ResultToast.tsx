"use client";

import { useEffect, useState } from "react";

type Tone = "green" | "yellow" | "red";

const TONE_CLASSES: Record<Tone, string> = {
  green: "border-t-green-base",
  yellow: "border-t-[#f4c430]",
  red: "border-t-red",
};

type Props = {
  open: boolean;
  tone?: Tone;
  title?: string;
  message?: string;
  onClose: () => void;
};

export default function ResultToast({
  open,
  tone = "green",
  title,
  message,
  onClose,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);

      // برای اینکه ورود حتماً transition بخورد:
      // mount -> (frame) -> visible true
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });

      return;
    }

    // خروج
    setVisible(false);
    const t = setTimeout(() => setMounted(false), 220);
    return () => clearTimeout(t);
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`absolute inset-0 transition-[background] duration-[220ms] ease-[ease] motion-reduce:transition-none ${
          visible ? "bg-black/45" : "bg-black/0"
        }`}
        onClick={onClose}
      />
      
      <div
        className={`relative z-[1] w-[min(92vw,420px)] rounded-[14px] border-0 border-t-[12px] border-solid bg-white px-4 pb-3.5 pt-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-[transform,opacity] duration-[220ms] ease-[ease] will-change-[transform,opacity] motion-reduce:transition-none ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-[10px] scale-[0.98] opacity-0"
        } ${TONE_CLASSES[tone]}`}
      >
        <button
          type="button"
          className="absolute left-1.5 top-1.5 h-5 w-5 cursor-pointer rounded-lg border-none bg-black/[0.06] text-base leading-5"
          onClick={onClose}
        >
          ×
        </button>

        {title ? (
          <div className="mb-2 flex justify-center text-center text-lg font-bold">
            {title}
          </div>
        ) : null}
        {message ? (
          <div className="text-center text-sm font-medium leading-[1.6]">
            {message}
          </div>
        ) : null}
      </div>
    </div>
  );
}
