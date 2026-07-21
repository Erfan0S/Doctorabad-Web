"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { ModalProps } from "@repo/core/types/modals";
import { toast } from "react-toastify";
import Loading from "../../components/loading";
import BugIcon from "../../../assets/svg/bug";
import { Apps } from "@repo/core/types/general";
import { Button } from "..";

// TODO: need test

const BugReport = ({
  data,
  closeModal,
}: ModalProps<{ productId: number; app: Omit<Apps, Apps.BASE> }>) => {
  const [text, setText] = useState("");

  const reportApi = () => {
    switch (data.app) {
      case Apps.LEARN:
        return api.courseReportIssue(text, data.productId);
      case Apps.MARKET:
        return api.prodoctReportIssue(text, data.productId);
      case Apps.EXAM:
        return api.examReportIssue(text, data.productId);
      case Apps.PHARMACY:
        return api.reportMedicineError(text, data.productId);
      case Apps.CLINIC:
        return api.reportDiseaseError(text, data.productId);
      case Apps.DOWNLOAD:
        return api.downloadErrorReport( data.productId, text);
      default:
        return new Promise((resolve) => resolve(null));
    }
  };

  const { isPending, mutate } = useMutation({
    mutationFn: () => reportApi(),
    onSuccess: () => {
      toast("گزارش شما ثبت شد", { type: "success", position: "top-left" });
      closeModal();
    },
  });

  const submit = () => {
    if (!text) return;
    mutate();
  };

  return (
    <div
      className={`mx-auto flex w-[400px] min-w-[250px] max-w-full flex-col items-center rounded-[24px] bg-white px-[20px] max-sm:w-full [&_button]:relative [&_button]:-mb-[22px] [&_button]:min-h-[45px] [&_button]:cursor-pointer [&_button]:rounded-[12px] [&_button]:border-none [&_button]:px-[24px] [&_button]:text-center [&_button]:text-[14px] [&_button]:font-semibold [&_button]:leading-[45px] [&_button]:text-white [&_button]:shadow-[0_3px_10px_rgba(0,0,0,0.1)] [&_button:focus]:shadow-none [&_button:focus]:outline-none [&_button:active]:shadow-none [&_button:active]:outline-none [&_button:disabled]:!cursor-default [&_button:disabled]:!bg-gray [&_button:disabled]:!shadow-none ${(data.app as string) === "course" ? "[&_label]:!text-red [&_svg]:!fill-red [&_svg]:!text-red [&_textarea]:!border-red [&_button]:!bg-red" : ""} ${data.app as string}`}
    >
      <div className="-mt-[45px] mb-[8px] flex h-[90px] w-[90px] items-center justify-center rounded-[8px] bg-white p-[8px] text-app-base shadow-[0_0_10px_rgba(0,0,0,0.15)] [&_img]:h-full [&_img]:max-h-full [&_img]:w-full [&_img]:max-w-full [&_svg]:h-full [&_svg]:max-h-full [&_svg]:w-full [&_svg]:max-w-full">
        <BugIcon />
      </div>
      <label
        htmlFor="bugReport"
        className="mb-[8px] text-[14px] font-semibold text-app-base"
      >
        گزارش خطا
      </label>
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        id="bugReport"
        name="bugReport"
        placeholder="هر چه میخواهد دل تنگت بگو ..."
        className="mb-[12px] min-h-[120px] w-full rounded-[8px] border border-solid border-app-base px-[12px] py-[4px] leading-[25px] focus:outline-none active:outline-none"
      />
      <Button onClick={submit} app={data.app as Apps}>
        {isPending ? (
          <Loading size={12} app={data.app as Apps} />
        ) : (
          "بفرست بره!"
        )}
      </Button>
    </div>
  );
};

export default BugReport;
