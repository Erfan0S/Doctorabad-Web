"use client";

import styles from "./Loading.module.scss";

interface LoadingProps {
  size?: number;
  className?: string;
}

export default function Loading({ size = 32, className }: LoadingProps) {
  return (
    <span
      role="status"
      aria-label="loading"
      className={`${styles.loading} ${className ?? ""}`.trim()}
      style={{ width: size, height: size }}
    />
  );
}

