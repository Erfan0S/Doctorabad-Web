// components/MedicineCard/MedicineCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { Medicine } from "@/types/pharmacy";
import PillsIcon from "@/assets/svg/pillsIcon";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";

const medicineNameCls = "m-0 select-none text-base font-bold text-[#333]";

interface MedicineCardProps {
  medicine: Medicine;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  const router = useRouter();

  return (
    <div
      className="relative flex cursor-pointer select-none items-center gap-4 rounded-2xl border-2 border-solid border-[#ccc] bg-white p-[10px] transition-all duration-200 active:scale-[0.98] active:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
      onClick={() => router.push(`/medicine/${medicine.id}`)}
    >
      <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-solid border-[#ccc]">
        {medicine.picture ? (
          <img
            src={medicine.picture}
            width={100}
            height={100}
            className="block h-full w-full rounded-xl object-cover"
          />
        ) : (
          <PillsIcon width={75} height={75} />
        )}
      </div>
      <div className="flex-1 text-right">
        <h3 className={`${medicineNameCls} mb-1`}>{medicine.title_en}</h3>
        <p className={medicineNameCls}>{medicine.title_fa}</p>
        {medicine.shape_coding && Object.keys(medicine.shape_coding).length > 0 ? (
          <div
            className="absolute left-3 z-[2] flex w-fit cursor-pointer rounded-[10px] bg-green px-3 py-[2px] text-white"
            onClick={(e) => {
              e.stopPropagation();
              modalActions.addModal(ModalTypes.MEDICINE_CODING, { medicine });
            }}
          >
            کدینگ
          </div>
        ) : null}{" "}
      </div>
    </div>
  );
}
