"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { pharmacyApi } from "@/api/Api";
import { MedicineCategory, MedicineTreatment } from "@/types/pharmacy";
import LeftArrow from "@/assets/svg/leftArrow";
import DownArrow from "@/assets/svg/downArrow";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import CategoriesSkeleton from "@/components/Skeletons/CategoriesSkeleton/CategoriesSkeleton";

const headerCls =
  "group flex cursor-pointer items-center justify-between rounded-2xl border-2 border-solid border-[#63d260] bg-white px-[1.1rem] py-[0.6rem] text-[1.1rem] font-bold text-[#333] transition-all duration-300 ease-[ease] hover:bg-green-base hover:text-white";
const arrowCls = "text-[1.4rem] text-green-base group-hover:fill-white group-hover:text-white";

const STORAGE_KEY = "pharmacy-categories-open";

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
  const { data, isLoading, error } = useQuery<MedicineCategory[]>({
    queryKey: ["medicine-categories"],
    queryFn: async () => (await pharmacyApi.getMedicineCategories()).data.data,
  });

  if (isLoading) {
    return <CategoriesSkeleton items={6} />;
  }
  if (error) return <div className="p-4 text-center text-[red]">خطا در دریافت داده‌ها</div>;

  return (
    <div className="flex flex-col gap-[0.6rem] bg-white p-4 [direction:rtl]">
      {data?.map((cat) => <CategoryItem key={cat.id} category={cat} />)}
    </div>
  );
}

function CategoryItem({ category }: { category: MedicineCategory }) {
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

  const { data: children, isLoading } = useQuery<MedicineCategory[]>({
    queryKey: ["medicine-children", category.id],
    queryFn: async () =>
      (await pharmacyApi.getMedicineChildren(category.id)).data.data,
    enabled: open && category.has_children,
  });

  const { data: treatments, isLoading: loadingTreatments } = useQuery<MedicineTreatment[]>({
    queryKey: ["medicine-treatments", category.id],
    queryFn: async () =>
      (await pharmacyApi.getMedicineTreatments(category.id)).data.data,
    enabled: open && !category.has_children,
  });
  const router = useRouter();
  return (
    <div className="overflow-hidden rounded-2xl bg-white transition-all duration-300 ease-[ease]">
      <div
        className={headerCls}
        onClick={() => setOpen(!open)}
      >
        <span>{category.title}</span>
        {open ? (
          <DownArrow className={arrowCls} />
        ) : (
          <LeftArrow className={arrowCls} />
        )}
      </div>

      {open && (
        <div className="mt-2 flex animate-[slide-down_0.3s_ease] flex-col gap-2 ps-[1.2rem]">
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
                  onClick={() => router.push(`/medicine/${drug.id}`)}
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
