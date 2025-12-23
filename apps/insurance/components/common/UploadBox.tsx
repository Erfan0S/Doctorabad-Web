// components/common/UploadBox.tsx
import React, { useRef } from "react";
import { useUploadFile, useDestroyFile } from "@/hooks/useUserInfo";
import styles from "../modals/UserInfoModal/UserInfoModal.module.scss"; 
// نکته: اگر استایل جدا دارید مسیرش را عوض کنید، اما اینجا از همان فایل SCSS مدال استفاده کردم که کلاس‌ها یکجا باشند.

interface UploadBoxProps {
  title: string;
  type: number; // 1 or 2
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
  
  const uploadMutation = useUploadFile();
  const destroyMutation = useDestroyFile();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMutation.mutate(
        { file, type },
        {
          onSuccess: (data: any) => {
            // سرور ممکنه { id: ... } یا { file_id: ... } برگردونه
            // با توجه به اینترفیس UploadFileResponse
            const newFileId = data.file_id || data.id; 
            if (newFileId) onUploadSuccess(newFileId);
          },
        }
      );
    }
    // ریست اینپوت
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!fileId) return;

    destroyMutation.mutate(
      { file_id: fileId, type },
      {
        onSuccess: () => {
          onDeleteSuccess();
        },
      }
    );
  };

  const isLoading = uploadMutation.isPending || destroyMutation.isPending;

  // فایل وجود دارد -> حالت حذف
  if (fileId) {
    return (
      <div 
        className={`${styles.uploadBox} ${styles.uploaded}`}
        onClick={handleDelete}
      >
        {isLoading ? "در حال پردازش..." : `${title} (حذف)`}
      </div>
    );
  }

  // فایل وجود ندارد -> حالت آپلود
  return (
    <div 
      className={styles.uploadBox} 
      onClick={() => !isLoading && fileInputRef.current?.click()}
    >
      {isLoading ? "در حال آپلود..." : title}
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
