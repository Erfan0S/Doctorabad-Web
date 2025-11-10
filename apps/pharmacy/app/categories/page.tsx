"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { MedicineCategory } from "@/types/category";
import styles from "./Categories.module.scss";

export default function Categories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["medicine-categories"],
    queryFn: async () => (await api.getMedicineCategories()).data.data,
  });

  if (isLoading)
    return <div className={styles.loading}>در حال بارگذاری دسته‌ها...</div>;
  if (error) return <div className={styles.error}>خطا در دریافت داده‌ها</div>;

  return (
    <div className={styles.container}>
      {data?.map((cat) => (
        <CategoryItem key={cat.id} category={cat} />
      ))}
    </div>
  );
}

function CategoryItem({ category }: { category: MedicineCategory }) {
  const [open, setOpen] = useState(false);

  const { data: children, isLoading } = useQuery({
    queryKey: ["medicine-children", category.id],
    queryFn: async () => (await api.getMedicineChildren(category.id)).data.data,
    enabled: open && category.has_children,
  });

  const { data: treatments, isLoading: loadingTreatments } = useQuery({
    queryKey: ["medicine-treatments", category.id],
    queryFn: async () =>
      (await api.getMedicineTreatments(category.id)).data.data,
    enabled: open && !category.has_children,
  });

  return (
    <div className={styles.item}>
      <div
        className={`${styles.header} ${open ? styles.open : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span>{category.title}</span>
        <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className={styles.children}>
          {category.has_children ? (
            isLoading ? (
              <div className={styles.loading}>
                در حال بارگذاری زیر‌دسته‌ها...
              </div>
            ) : (
              children?.map((child) => (
                <CategoryItem key={child.id} category={child} />
              ))
            )
          ) : loadingTreatments ? (
            <div className={styles.loading}>در حال بارگذاری داروها...</div>
          ) : (
            <div className={styles.treatments}>
              {treatments?.map((drug) => (
                <div key={drug.id} className={styles.treatment}>
                  <span className={styles.drugFa}>{drug.title_fa}</span>
                  <span className={styles.drugEn}>{drug.title_en}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
