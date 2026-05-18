"use client";
import { api } from "@/api/Api";
import style from "./ProductCommentsForm.module.scss";
import { useMediaQuery } from "@repo/core/hooks/useMediaQuery";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loading } from "@repo/shared_modules/components";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { Apps } from "@repo/core/types/general";

type Props = {
  courseId?: number;
  packageId?: number;
};

const ProductCommentsForm = ({ courseId, packageId }: Props) => {
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");

  const mutation = useMutation({
    mutationFn: (data: { id: number; text: string }) => {
      return api.createPackageComment({ packageId: data.id, text: data.text });
    },
    onSuccess() {
      toast("نظر شما با موفقیت ثبت شد و در انتظار تایید است", {
        type: "success",
        position: "top-left",
      });
      setRate(0);
      setComment("");
    },
  });

  const isMobile = useMediaQuery("max-width:768px");

  const submitComment = () => {
    if (comment) {
      mutation.mutate({ id: (packageId || courseId)!, text: comment });
    } else {
      toast("لطفا نظر خود را وارد کنید", { type: "warning" });
    }
  };

  return (
    <div className={style.productCommentsForm}>
      <div className={style.productCommentsFormHeader}>
        <button
          onClick={authorizeClientAction(submitComment)}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <Loading size={12} app={Apps.DOWNLOAD} />
          ) : isMobile ? (
            "ارسال"
          ) : (
            "ارسال برای کدخدای دکترآباد"
          )}
        </button>
      </div>
      <textarea
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </div>
  );
};

export default ProductCommentsForm;
