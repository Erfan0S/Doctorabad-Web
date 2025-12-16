"use client";

import { useEffect, useState } from "react";
import styles from "./ResultToast.module.scss";

type Tone = "green" | "yellow" | "red";

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
      className={`${styles.overlay} ${visible ? styles.open : styles.closed}`}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.backdrop} onClick={onClose} />
      
      <div className={`${styles.modal} ${styles[tone]}`}>
      <button type="button" className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        {title ? <div className={styles.title}>{title}</div> : null}
        {message ? <div className={styles.text}>{message}</div> : null}
      </div>
    </div>
  );
}
