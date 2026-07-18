"use client";

// ponytail: Tailwind's built-in `spin` keyframes are identical to the old
// clinic-loading-spin keyframes, so no custom animation was added.
const SPINNER =
  "inline-block animate-[spin_0.6s_linear_infinite] rounded-full border-[3px] border-solid border-[rgba(0,0,0,0.1)] border-t-[#1677ff]";

interface LoadingProps {
  size?: number;
  className?: string;
}

export default function Loading({ size = 32, className }: LoadingProps) {
  return (
    <span
      role="status"
      aria-label="loading"
      className={`${SPINNER} ${className ?? ""}`.trim()}
      style={{ width: size, height: size }}
    />
  );
}
