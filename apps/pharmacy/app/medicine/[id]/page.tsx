"use client";
import {  useState } from "react";
import Image from "next/image";
import styles from "./MedicineDetails.module.scss";
import type { MedicineDetails } from "@/types/pharmacy"


export default function MedicineDetailsPage({ data }: { data: MedicineDetails }) {
  const [openSection, setOpenSection] = useState<string | null>(null);


  const toggleSection = (key: string) =>
    setOpenSection((prev) => (prev === key ? null : key));


  const medicine = data;

  return (
    
    <div className={styles.container}>
      {/* --- Header --- */}
      <div className={styles.header}>
       
      
        <div className={styles.imageWrapper}>
          <Image
            src={medicine.picture}
            alt={medicine.title_fa}
            width={100}
            height={100}
            className={styles.image}
          />
        </div>

        <div className={styles.titles}>
          <h2>{medicine.title_en}</h2>
          <h3>{medicine.title_fa}</h3>
        </div>
      </div>

      {/* --- Accordion sections --- */}
      <div className={styles.sections}>
        {[
          { key: "category", label: "دسته‌بندی", content: medicine.categories.map(c => c.title).join("، ") },
          { key: "mechanism", label: "مکانیسم اثر", content: medicine.effect_mechanism },
          { key: "shape", label: "اشکال دارویی", content: medicine.shapes.join(", ") },
          { key: "use_case", label: "موارد مصرف", content: medicine.use_case },
          {
            key: "direction",
            label: "دستور مصرف",
            content: `
              <b>بزرگسال:</b> ${medicine.direction.adult.join(", ")}<br/>
              <b>کودک:</b> ${medicine.direction.child.join(", ")}<br/>
              <b>سالمند:</b> ${medicine.direction.elder?.join(", ")}
            `,
          },
          { key: "prevention", label: "منع مصرف", content: medicine.prevention },
          { key: "pregnant", label: "حاملگی و شیردهی", content: medicine.pregnant },
          { key: "side", label: "عوارض جانبی", content: medicine.side_effects.join(", ") },
          {
            key: "interaction",
            label: "تداخلات دارویی",
            content: `
              ${medicine.interaction_description.join("<br/>")}
              <br/><br/><b>داروهای مرتبط:</b> ${medicine.interaction_medicines.map(m => m.title_fa).join(", ")}
            `,
          },
          { key: "points", label: "نکات", content: medicine.points },
        ].map(({ key, label, content }) => (
          <div key={key} className={styles.section}>
            <button
              className={styles.sectionButton}
              onClick={() => toggleSection(key)}
            >
              {label}
              <span>{openSection === key ? "▾" : "◀"}</span>
            </button>
            {openSection === key && (
              <div
                className={styles.sectionContent}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}