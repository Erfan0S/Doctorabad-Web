"use client";
import React from "react";
import { ModalProps } from "@repo/core/types/modals";
import style from "./MedicineCodingModal.module.scss";
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
      <table className={style.table}>
        <thead>
          <tr>
            <th>اشکال دارویی</th>
            <th>کد دارو</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <td>{k}</td>
              <td>{typeof v === "object" ? JSON.stringify(v) : String(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={style.medicineCodingModal}>
        {medicine?.picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <Image width={110} height={110} className={style.medicineCodingModalImage} src={medicine.picture} alt={medicine.title_en || "medicine"} />
        ) : (
          <PillsIcon className={style.medicineCodingModalIcon} />
        )}
      <div className={style.titleContainer}>
        <div className={style.titleFa}>{medicine?.title_fa}</div>
        <div className={style.titleEn}>{medicine?.title_en}</div>
      </div>
      <div className={style.tableContainer}>
        {renderTable(medicine?.shape_coding)}
      </div>
      <Button className={style.confirmButton} onClick={() => closeModal(false)}>
        تایید
      </Button>{" "}
    </div>
  );
};

export default MedicineCodingModalInner;
