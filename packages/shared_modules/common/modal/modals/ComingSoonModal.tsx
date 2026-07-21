import React from "react";
import { ModalProps } from "@repo/core/types/modals";
import { Close_X } from "@repo/shared_modules/icons";

type ComingSoonModalData = {
  message?: string;
};

const DEFAULT_MESSAGE = "این بخش به زودی در دسترس قرار می‌گیره";

const ComingSoonModal: React.FC<ModalProps<ComingSoonModalData>> = ({
  closeModal,
  data,
}) => {
  return (
    <div className="relative bg-white rounded-[7px] p-[30px] pt-[40px] shadow-[0_0_10px_rgba(0,0,0,0.5)] max-w-[360px] w-[calc(100vw-32px)] [&_p]:text-center [&_p]:text-[1rem] [&_p]:font-semibold [&_p]:leading-[32px] [&_p]:m-0">
      <Close_X onClick={() => closeModal()} className="absolute top-[10px] start-[10px] text-black cursor-pointer w-[28px] h-[28px]" />
      <p>{data?.message || DEFAULT_MESSAGE}</p>
    </div>
  );
};

export default ComingSoonModal;
