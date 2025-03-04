import React, { useState } from "react";
import styles from "./AddLeasonNoteModal.module.scss";
import { ModalProps } from "@repo/core/types/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { toast } from "react-toastify";
import { convertSecondsToNormalTime } from "@/utils/convertSecondsToNormalTime";

interface AddLeasonNoteModalProps {
  currentTime: number;
  lessonId: number;
  courseId: number;
  showOnPlayer?: boolean;
  onSuccess?: () => void;
}

const AddLeasonNoteModal: React.FC<ModalProps<AddLeasonNoteModalProps>> = ({
  data,
  closeModal,
}) => {
  const [note, setNote] = useState("");
  const queryClient = useQueryClient();
  const createBookmarkMutation = useMutation({
    mutationFn: () => {
      return api.createVideoBookmark(data.lessonId, {
        jump_time: Math.floor(data.currentTime),
        title: convertSecondsToNormalTime(data.currentTime),
        description: note,
      });
    },
    onSuccess: () => {
      toast.success("یادداشت با موفقیت ثبت شد");
      setNote("");
      // Invalidate the videoBookmarks query to refresh the data
      queryClient.invalidateQueries({
        queryKey: ["videoBookmarks", data.courseId, data.lessonId],
      });
      if (data.onSuccess) {
        data.onSuccess();
      }
      closeModal();
    },
    onError: (error) => {
      toast.error("خطا در ثبت یادداشت");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim()) {
      createBookmarkMutation.mutate();
    } else {
      toast.warning("لطفا یادداشت خود را وارد کنید");
    }
  };

  return (
    <>
      {data.showOnPlayer && (
        <div className={styles.modalOverlay} onClick={() => closeModal()} />
      )}
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>یادداشت</h2>
          <span className={styles.timestamp}>
            {convertSecondsToNormalTime(data.currentTime)}
          </span>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={styles.textarea}
            placeholder="یادداشت خود را وارد کنید..."
            autoFocus
            disabled={createBookmarkMutation.isPending}
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={createBookmarkMutation.isPending}
          >
            {createBookmarkMutation.isPending ? "در حال ثبت..." : "ثبت"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddLeasonNoteModal;
