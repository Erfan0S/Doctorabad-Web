"use client";

import Link from "next/link";
import styles from "./InteractionSection.module.scss";

export default function InteractionSection({
  description,
  diseases,
}: {
  description: string[];
  diseases: { id: number; title_fa: string; title_en: string }[];
}) {
  return (
    <div className={styles.interactionWrapper}>
      {/* توضیحات تداخل‌ها */}
      {description?.length > 0 &&
        description.map((item, i) => (
          <p key={i}>✓ {item}</p>
        ))}

      {/* بیماری‌های درگیر در تداخل */}
      {diseases?.length > 0 && (
        <>

          <div className={styles.interactionPills}>
            {diseases.map((d) => (
              <Link
                key={d.id}
                href={`/disease/${d.id}`}
                className={styles.interactionPill}
              >
                {d.title_fa}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
