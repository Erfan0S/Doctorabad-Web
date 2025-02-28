import React, { useState } from "react";
import styles from "./AddLeasonNoteModal.module.scss";
import { ModalProps } from "@repo/core/types/modals";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { toast } from "react-toastify";

interface AddLeasonNoteModalProps {
  currentTime: number;
  lessonId: number;
  onSuccess?: () => void;
  onClose?: () => void;
}

const AddLeasonNoteModal: React.FC<ModalProps<AddLeasonNoteModalProps>> = ({
  data,
  closeModal,
}) => {
  const [note, setNote] = useState("");

  const createBookmarkMutation = useMutation({
    mutationFn: () => {
      return api.createVideoBookmark(data.lessonId, {
        jump_time: Math.floor(data.currentTime),
        title: formatTime(data.currentTime),
        description: note,
      });
    },
    onSuccess: () => {
      toast.success("یادداشت با موفقیت ثبت شد");
      setNote("");
      if (data.onSuccess) {
        data.onSuccess();
      }
      if (data.onClose) {
        data.onClose();
      } else if (closeModal) {
        closeModal();
      }
    },
    onError: (error) => {
      toast.error("خطا در ثبت یادداشت");
    },
  });

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim()) {
      createBookmarkMutation.mutate();
    } else {
      toast.warning("لطفا یادداشت خود را وارد کنید");
    }
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <h2 className={styles.title}>یادداشت</h2>
        <span className={styles.timestamp}>{formatTime(data.currentTime)}</span>
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
  );
};

export default AddLeasonNoteModal;
