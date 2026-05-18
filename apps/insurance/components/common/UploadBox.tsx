// components/common/UploadBox.tsx
import React, { useRef } from "react";
import { useUploadFile, useDestroyFile } from "@/hooks/useUserInfo";
// فرض بر این است که تایپ ResponseType و UploadFileResponse در مسیر درست هستند
import { UploadFileResponse } from "@/types/insurance";
import styles from "../modals/UserInfoModal/UserInfoModal.module.scss";

interface UploadBoxProps {
  title: string;
  type: number; // 1 برای کارت ملی، 2 برای نظام پزشکی
  fileId: number | null;
  onUploadSuccess: (id: number) => void;
  onDeleteSuccess: () => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({
  title,
  type,
  fileId,
  onUploadSuccess,
  onDeleteSuccess,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // این هوک‌ها باید متدهای uploadFile و destroyFile شما را صدا بزنند
  const uploadMutation = useUploadFile();
  const destroyMutation = useDestroyFile();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMutation.mutate(
        { file, type },
        {
          onSuccess: (response) => {
            // با توجه به تایپ API شما: Promise<ResponseType<UploadFileResponse>>
            // response احتمالا ساختاری مثل { data: { file: number, ... }, status: ... } دارد
            // یا اگر خود data را برمی‌گرداند:
            const uploadedFileId =  response.file; 
            
            if (uploadedFileId) {
              onUploadSuccess(uploadedFileId);
            }
          },
          onError: (error) => {
            console.error("Upload failed", error);
            // اینجا می‌توانید توست خطا نمایش دهید
          }
        }
      );
    }
    // ریست کردن اینپوت برای امکان آپلود مجدد همان فایل در صورت نیاز
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!fileId) return;

    if (window.confirm("آیا از حذف این فایل اطمینان دارید؟")) {
      destroyMutation.mutate(
        { file_id: fileId, type },
        {
          onSuccess: () => {
            onDeleteSuccess();
          },
          onError: (error) => {
             console.error("Delete failed", error);
          }
        }
      );
    }
  };

  const isLoading = uploadMutation.isPending || destroyMutation.isPending;

  // --- حالت آپلود شده (مینیمال و تمیز) ---
  if (fileId) {
    return (
      <div className={`${styles.uploadBox} ${styles.uploaded} ${isLoading ? styles.loading : ""}`}>
        {isLoading ? (
          <span>در حال پردازش...</span>
        ) : (
          <>
            <span className={styles.fileName}>
               ✓ {title}
            </span>
            <button 
              className={styles.deleteBtn} 
              onClick={handleDelete}
              title="حذف فایل"
              type="button"
            >
              {/* آیکون سطل زباله */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </>
        )}
      </div>
    );
  }

  // --- حالت پیش‌فرض (آپلود) ---
  return (
    <div
      className={`${styles.uploadBox} ${isLoading ? styles.loading : ""}`}
      onClick={() => !isLoading && fileInputRef.current?.click()}
    >
      {isLoading ? "در حال آپلود..." : `+ افزودن${title}`}
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadBox;
