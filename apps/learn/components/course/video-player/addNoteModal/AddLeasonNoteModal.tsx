import React, { useState } from "react";
import { ModalProps } from "@repo/core/types/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { toast } from "react-toastify";
import { convertSecondsToNormalTime } from "@/utils/convertSecondsToNormalTime";
import { font } from "@/assets/fonts/font";

interface AddLeasonNoteModalProps {
  currentTime: number;
  lessonId: number;
  courseId: number;
  showOnPlayer?: boolean;
  onSuccess?: () => void;
}

// ponytail: `!` on every utility — the old scss used !important everywhere to
// win over modal/player styles; keeping that behavior verbatim.
const modalContentClass =
  "!absolute !left-1/2 !top-1/2 !z-[1001] !w-[500px] !max-w-[90vw] !-translate-x-1/2 !-translate-y-1/2 !rounded-xl !bg-white !p-5 !shadow-[0_4px_6px_rgba(0,0,0,0.1)] ![direction:rtl]";

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
        <div
          className="fixed left-0 top-0 z-[1000] h-full w-full bg-black/50"
          onClick={() => closeModal()}
          onContextMenu={(e) => e.preventDefault()}
        />
      )}
      <div
        className={`${modalContentClass} ${font.className}`}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="!mb-5 !flex !items-center !justify-between">
          <h2 className="!m-0 !text-[1.25rem] !font-semibold !text-[#333]">یادداشت</h2>
          <span className="!inline-block !font-mono !text-[1.2rem] !text-[#666] ![direction:ltr]">
            {convertSecondsToNormalTime(data.currentTime)}
          </span>
        </div>
        <form onSubmit={handleSubmit} className="!flex !flex-col !gap-4">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="!min-h-[120px] !w-full !resize-y !rounded-lg !border-2 !border-solid !border-[#e0e0e0] !p-3 !text-[1rem] !leading-normal ![font-family:inherit] focus:!border-red focus:!outline-none"
            placeholder="یادداشت خود را وارد کنید..."
            autoFocus
            disabled={createBookmarkMutation.isPending}
          />
          <button
            type="submit"
            className="!w-full !cursor-pointer !rounded-lg !border-none !bg-red !px-6 !py-3 !text-[1rem] !font-semibold !text-white ![transition:background-color_0.2s_ease] hover:!bg-[#d81335] active:!translate-y-px"
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
