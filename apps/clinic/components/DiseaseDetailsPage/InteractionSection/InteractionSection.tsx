"use client";

import Link from "next/link";

export default function InteractionSection({
  description,
  diseases,
}: {
  description: string[];
  diseases: { id: number; title_fa: string; title_en: string }[];
}) {
  return (
    <div className="px-0.5 py-[5px] [&_p]:mb-2 [&_p]:leading-[1.7]">
      {/* توضیحات تداخل‌ها */}
      {description?.length > 0 &&
        description.map((item, i) => (
          <p key={i}>✓ {item}</p>
        ))}

      {/* بیماری‌های درگیر در تداخل */}
      {diseases?.length > 0 && (
        <>

          <div className="clinic-pill-row">
            {diseases.map((d) => (
              <Link
                key={d.id}
                href={`/disease/${d.id}`}
                className="clinic-pill-link px-3.5 py-1.5"
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
