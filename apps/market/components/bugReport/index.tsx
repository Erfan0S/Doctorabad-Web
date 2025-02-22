import style from "./BugReport.module.scss";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { ModalProps } from "@repo/core/types/modals";
import { toast } from "react-toastify";
import Loading from "../common/loading";
import BugIcon from "@/assets/svg/newIcons/bug";

const BugReport = ({ data, closeModal }: ModalProps<{ productId: number }>) => {
  const [text, setText] = useState("");

  const { isPending, mutate } = useMutation({
    mutationFn: () => api.reportIssue({ text, productId: data.productId }),
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
    <div className={style.bugReportModal}>
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
      <button onClick={submit}>
        {isPending ? <Loading size={12} /> : "بفرست بره!"}
      </button>
    </div>
  );
};

export default BugReport;
