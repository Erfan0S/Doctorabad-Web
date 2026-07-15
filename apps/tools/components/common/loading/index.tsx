"use client";

interface LoadingProps {
  size?: number;
  className?: string;
}

export default function Loading({ size = 32, className }: LoadingProps) {
  return (
    <span
      role="status"
      aria-label="loading"
      className={`inline-block animate-spin rounded-full border-[3px] border-solid border-black/10 border-t-[#1677ff] [animation-duration:600ms] ${className ?? ""}`.trim()}
      style={{ width: size, height: size }}
    />
  );
}
