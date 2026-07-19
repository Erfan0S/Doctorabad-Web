"use client";

import Link from "next/link";

const interactionPillCls =
  "inline-block whitespace-nowrap rounded-xl bg-green-base px-[14px] py-[6px] text-[0.85rem] !text-white no-underline shadow-[0_2px_5px_rgba(0,0,0,0.1)] transition-all duration-200 ease-[ease] hover:-translate-y-[2px] hover:bg-green-base";

export default function InteractionSection({
  description,
  medicines,
}: {
  description: string[];
  medicines: { id: number; title_fa: string; title_en: string }[];
}) {
  return (
    <div className="px-[2px] py-[5px] [&_p]:mb-2 [&_p]:leading-[1.7]">
      {/* توضیحات تداخل‌ها */}
      {description?.length > 0 &&
        description.map((item, i) => (
          <p key={i}>✓ {item}</p>
        ))}

      {/* داروهای درگیر در تداخل */}
      {medicines?.length > 0 && (
        <>

          <div className="flex flex-wrap gap-2">
            {medicines.map((m) => (
              <Link
                key={m.id}
                href={`/medicine/${m.id}`}
                className={interactionPillCls}
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
