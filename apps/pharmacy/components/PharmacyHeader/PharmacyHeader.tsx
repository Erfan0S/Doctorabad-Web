// components/PharmacyHeader/PharmacyHeader.tsx
"use client";

import { useRouter } from "next/navigation";
import styles from "./PharmacyHeader.module.scss";
import BackArrow from "@/assets/svg/backArrow";
import Heart from "@/assets/svg/heart";


interface PharmacyHeaderProps {
  title: string;
}

export default function PharmacyHeader({
  title,
}: PharmacyHeaderProps) {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.lefSideHeader}>
          <button
            className={styles.favoriteBtn}
            onClick={() => router.push("/favorites")}
          >
            <Heart size={32} strokeWidth={2} />
          </button>
          <button className={styles.backBtn} onClick={() => router.back()}>
            <BackArrow strokeWidth={2}></BackArrow>
          </button>
        </div>
      </div>
    </header>
  );
}
