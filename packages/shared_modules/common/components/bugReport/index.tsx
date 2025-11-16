"use client";
import style from "./BugReport.module.scss";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { ModalProps } from "@repo/core/types/modals";
import { toast } from "react-toastify";
import Loading from "../../components/loading";
import BugIcon from "../../../assets/svg/bug";
import { Apps } from "@repo/core/types/general";
import { Button } from "..";
import { pharmacyApi } from "../../../../../apps/pharmacy/api/Api";

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
        return pharmacyApi.reportMedicineError(text, data.productId);
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
    <div className={`${style.bugReportModal} ${style[data.app as string]}`}>
      <div className={style.bugReportModalIcon}>
        <BugIcon />
      </div>
      <label htmlFor="bugReport">گزارش خطا</label>
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        id="bugReport"
        name="bugReport"
        placeholder="هر چه میخواهد دل تنگت بگو ..."
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
