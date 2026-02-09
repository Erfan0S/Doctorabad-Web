"use client";

import Link from "next/link";
import styles from "./InteractionSection.module.scss";

export default function InteractionSection({
  description,
  medicines,
}: {
  description: string[];
  medicines: { id: number; title_fa: string; title_en: string }[];
}) {
  return (
    <div className={styles.interactionWrapper}>
      {/* توضیحات تداخل‌ها */}
      {description?.length > 0 &&
        description.map((item, i) => (
          <p key={i}>✓ {item}</p>
        ))}

      {/* داروهای درگیر در تداخل */}
      {medicines?.length > 0 && (
        <>

          <div className={styles.interactionPills}>
            {medicines.map((m) => (
              <Link
                key={m.id}
                href={`/medicine/${m.id}`}
                className={styles.interactionPill}
              >
                {m.title_fa}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
