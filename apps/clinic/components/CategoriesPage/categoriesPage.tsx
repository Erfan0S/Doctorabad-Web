"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { clinicApi } from "@/api/Api";
import { DiseaseCategory, DiseaseTreatment } from "@/types/clinic";
import styles from "./categories.module.scss";
import LeftArrow from "@/assets/svg/leftArrow";
import DownArrow from "@/assets/svg/downArrow";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import CategoriesSkeleton from "@/components/Skeletons/CategoriesSkeleton/CategoriesSkeleton";

const STORAGE_KEY = "clinic-categories-open";

function getOpenCategoryIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const s = sessionStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

function setOpenCategoryIds(ids: number[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
}

export default function Categories() {
  const { data, isLoading, error } = useQuery<DiseaseCategory[]>({
    queryKey: ["disease-categories"],
    queryFn: async () => (await clinicApi.getDiseaseCategories()).data.data,
  });

  if (isLoading) {
    return <CategoriesSkeleton items={6} />;
  }
  if (error) return <div className={styles.error}>خطا در دریافت داده‌ها</div>;

  return (
    <div className={styles.container}>
      {data?.map((cat) => <CategoryItem key={cat.id} category={cat} />)}
    </div>
  );
}

function CategoryItem({ category }: { category: DiseaseCategory }) {
  const [open, setOpenState] = useState(() =>
    getOpenCategoryIds().includes(category.id),
  );

  const setOpen = (value: boolean) => {
    setOpenState(value);
    const ids = getOpenCategoryIds();
    if (value) {
      if (!ids.includes(category.id)) setOpenCategoryIds([...ids, category.id]);
    } else {
      setOpenCategoryIds(ids.filter((id) => id !== category.id));
    }
  };

  const { data: children, isLoading } = useQuery<DiseaseCategory[]>({
    queryKey: ["disease-children", category.id],
    queryFn: async () =>
      (await clinicApi.getDiseaseChildren(category.id)).data.data,
    enabled: open && category.has_children,
  });

  const { data: treatments, isLoading: loadingTreatments } = useQuery<DiseaseTreatment[]>({
    queryKey: ["disease-treatments", category.id],
    queryFn: async () =>
      (await clinicApi.getDiseaseTreatments(category.id)).data.data,
    enabled: open && !category.has_children,
  });
  const router = useRouter();
  return (
    <div className={styles.item}>
      <div
        className={`${styles.header} ${open ? styles.open : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span>{category.title}</span>
        {open ? (
          <DownArrow className={styles.arrow} />
        ) : (
          <LeftArrow className={styles.arrow} />
        )}
      </div>

      {open && (
        <div className={styles.children}>
          {category.has_children ? (
            isLoading ? (
              <CategoriesSkeleton nested items={3} />
            ) : (
              children?.map((child) => (
                <CategoryItem key={child.id} category={child} />
              ))
            )
          ) : loadingTreatments ? (
            <CategoriesSkeleton nested items={3} />
          ) : (
            <div className={styles.treatments}>
              {treatments?.map((drug) => (
                <div
                  onClick={() => router.push(`/disease/${drug.id}`)}
                  key={drug.id}
                  className={styles.treatment}
                >
                  <span>{drug.title_fa}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
