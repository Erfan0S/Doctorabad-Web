// components/modals/EditInfoModal/EditInfoModal.tsx
"use client";

import React, { useState } from "react";
import styles from "./UserInfoModal.module.scss";
import { ModalProps } from "@repo/core/types/modals";
import { useInsuranceInfos, useStoreInsuranceInfo } from "@/hooks/useUserInfo";

interface EditInfoModalProps extends ModalProps {
  data: {
    onSelect: (id: number) => void;
    currentId: number | null;
  };
}

const UserInfoModal: React.FC<EditInfoModalProps> = ({ closeModal, data }) => {
  const { data: infos = [], isLoading } = useInsuranceInfos();
  const [view, setView] = useState<"list" | "form">("list");
  
  // State برای فرم جدید
  const [newName, setNewName] = useState("");
  // ... سایر استیت‌های فرم ویرایش (رشته، تخصص، وضعیت) طبق عکس دوم

  const storeMutation = useStoreInsuranceInfo();

  const handleSelect = (id: number) => {
    data.onSelect(id);
    closeModal();
  };

  const handleSaveNew = () => {
    // ذخیره اطلاعات جدید
    // storeMutation.mutate({ ... }, { onSuccess: () => setView("list") })
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.header}>
        {view === "list" ? "انتخاب اطلاعات بیمه گذار" : "ویرایش اطلاعات بیمه گذار"}
      </div>

      <div className={styles.content}>
        {view === "list" ? (
          <div className={styles.listWrapper}>
            {isLoading && <div>Loading...</div>}
            
            {infos.map((info) => (
              <div 
                key={info.id} 
                className={`${styles.infoItem} ${info.id === data.currentId ? styles.selected : ""}`}
                onClick={() => handleSelect(info.id)}
              >
                <div className={styles.infoTitle}>{info.title || "بدون عنوان"}</div>
                {/* دکمه ویرایش کوچک برای هر آیتم اگر لازم است */}
              </div>
            ))}

            <button className={styles.addNewBtn} onClick={() => setView("form")}>
              + افزودن اطلاعات جدید
            </button>
          </div>
        ) : (
          <div className={styles.formWrapper}>
             {/* فرم طبق عکس دوم: نام، شماره، دراپ‌دان‌ها */}
             <label>نام و نام خانوادگی:</label>
             <input className={styles.input} value={newName} onChange={e => setNewName(e.target.value)} />
             
             {/* ... بقیه اینپوت‌ها ... */}

             <div className={styles.formActions}>
               <button className={styles.cancelBtn} onClick={() => setView("list")}>بازگشت</button>
               <button className={styles.saveBtn} onClick={handleSaveNew}>تایید</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoModal;
