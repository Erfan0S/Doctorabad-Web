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
      className={`inline-block rounded-full border-[3px] border-solid border-black/10 border-t-[#1677ff] animate-[spin_0.6s_linear_infinite] ${className ?? ""}`.trim()}
      style={{ width: size, height: size }}
    />
  );
}

