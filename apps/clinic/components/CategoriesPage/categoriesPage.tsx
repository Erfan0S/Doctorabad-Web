"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { clinicApi } from "@/api/Api";
import { DiseaseCategory, DiseaseTreatment } from "@/types/clinic";
import LeftArrow from "@/assets/svg/leftArrow";
import DownArrow from "@/assets/svg/downArrow";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import CategoriesSkeleton from "@/components/Skeletons/CategoriesSkeleton/CategoriesSkeleton";

const STORAGE_KEY = "clinic-categories-open";

// ponytail: the old scss-module `open` modifier resolved to undefined (no .open
// class existed), so it rendered nothing and was dropped here.
const HEADER_CLASS =
  "group flex cursor-pointer items-center justify-between rounded-2xl border-2 border-solid border-[#62d260] bg-white px-[1.1rem] py-[0.6rem] text-[1.1rem] font-bold text-[#333] transition-all duration-300 hover:bg-green-base hover:text-white";

const ARROW_CLASS = "text-[1.4rem] text-green-base group-hover:fill-white group-hover:text-white";

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
  if (error)
    return <div className="p-4 text-center text-[red]">خطا در دریافت داده‌ها</div>;

  return (
    <div className="flex flex-col gap-[0.6rem] bg-white p-4 [direction:rtl]">
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
    <div className="overflow-hidden rounded-2xl bg-white transition-all duration-300">
      <div className={HEADER_CLASS} onClick={() => setOpen(!open)}>
        <span>{category.title}</span>
        {open ? (
          <DownArrow className={ARROW_CLASS} />
        ) : (
          <LeftArrow className={ARROW_CLASS} />
        )}
      </div>

      {open && (
        <div className="mt-2 flex animate-clinic-slide-down flex-col gap-2 ps-[1.2rem]">
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
            <div className="mt-[0.4rem] flex flex-col gap-[0.4rem] ps-4">
              {treatments?.map((drug) => (
                <div
                  onClick={() => router.push(`/disease/${drug.id}`)}
                  key={drug.id}
                  className="flex cursor-pointer justify-between rounded-[0.6rem] bg-green-base px-[0.8rem] py-[0.6rem] text-[1.1rem] font-bold text-white transition-colors duration-200 hover:bg-[#36b233]"
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
