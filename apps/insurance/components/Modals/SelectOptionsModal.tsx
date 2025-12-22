"use client";

import { ModalProps } from "@repo/core/types/modals";
import SelectOptionsModal, {
  SelectOption,
} from "@/components/SelectOptions/SelectOptions"; // مسیر ایمپورت را چک کن

interface SelectOptionsData {
  title: string;
  options: SelectOption[];
  selectedId?: number | string | null;
  onSelect: (id: number | string) => void;
}

// اینترفیس ورودی کامپوننت Wrapper که data را شامل می‌شود
interface WrapperProps extends ModalProps {
  data  : SelectOptionsData; // علامت سوال برای ایمنی، هرچند باید باشد
}

export const SelectOptionsWrapper: React.FC<WrapperProps> = ({
  closeModal,
  data,
}) => {
  // اگر دیتا نیامد، برای جلوگیری از کرش یک آبجکت خالی یا null بفرست
  if (!data) return null;

  return (
    <SelectOptionsModal
      closeModal={closeModal}
      title={data.title}
      options={data.options || []}
      selectedId={data.selectedId}
      onSelect={data.onSelect}
    />
  );
};
