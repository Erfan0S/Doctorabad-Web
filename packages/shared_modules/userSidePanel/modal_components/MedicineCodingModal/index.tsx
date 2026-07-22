"use client";
import React from "react";
import { ModalProps } from "@repo/core/types/modals";
import { Button } from "@repo/shared_modules/components";
import PillsIcon from "../../../../../apps/pharmacy/assets/svg/pillsIcon";
import Image from "next/image";


type ShapeCoding = Record<string, any>;

type Props = ModalProps<{ medicine: any }>;

const MedicineCodingModalInner: React.FC<Props> = ({ data, closeModal }) => {
  const { medicine } = data || {};

  const renderTable = (coding: ShapeCoding | undefined) => {
    if (!coding) return <div>اطلاعاتی موجود نیست</div>;

    const rows: Array<[string, any]> = Object.entries(coding);

    return (
      <table className="w-full border-collapse border border-solid border-[#666]">
        <thead>
          <tr>
            <th className="sticky top-0 z-[2] bg-[#52cc4b] border border-solid border-[#666] text-center py-[14px] px-[10px] text-[15px] text-white font-bold">اشکال دارویی</th>
            <th className="sticky top-0 z-[2] bg-[#52cc4b] border border-solid border-[#666] text-center py-[14px] px-[10px] text-[15px] text-white font-bold">کد دارو</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <td className="border border-solid border-[#666] text-center py-[14px] px-[10px] text-[15px] bg-white font-semibold">{k}</td>
              <td className="border border-solid border-[#666] text-center py-[14px] px-[10px] text-[15px] bg-white font-semibold">{typeof v === "object" ? JSON.stringify(v) : String(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="w-[420px] max-w-[calc(100vw-32px)] bg-white rounded-[24px] pt-0 px-[20px] pb-[50px] flex flex-col items-center relative">
        {medicine?.picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <Image width={110} height={110} className="w-[110px] h-[110px] bg-white rounded-[16px] shadow-[0_6px_18px_rgba(0,0,0,0.15)] flex items-center justify-center -mt-[55px] mb-[20px]" src={medicine.picture} alt={medicine.title_en || "medicine"} />
        ) : (
          <PillsIcon className="w-[110px] h-[110px] bg-white rounded-[16px] shadow-[0_6px_18px_rgba(0,0,0,0.15)] p-[10px] flex items-center justify-center -mt-[55px] mb-[20px]" />
        )}
      <div className="text-center mb-[20px]">
        <div className="text-[#52cc4b] text-[18px] font-bold mb-[4px]">{medicine?.title_fa}</div>
        <div className="text-[#52cc4b] text-[16px] font-semibold">{medicine?.title_en}</div>
      </div>
      <div className="w-full mb-[20px] max-h-[min(400px,calc(100vh-320px))] overflow-y-auto">
        {renderTable(medicine?.shape_coding)}
      </div>
      <Button className="w-[210px] h-[40px] rounded-[12px] text-[16px] font-bold absolute -bottom-[20px]" onClick={() => closeModal(false)}>
        تایید
      </Button>{" "}
    </div>
  );
};

export default MedicineCodingModalInner;
