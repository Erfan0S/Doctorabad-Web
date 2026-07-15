"use client";
import { api } from "@/api/Api";
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
    <div className="mb-3 rounded-2xl border-2 border-solid border-blue p-2">
      <div className="relative mb-3 flex items-center">
        <button
          onClick={authorizeClientAction(submitComment)}
          disabled={mutation.isPending}
          className="mr-auto h-[35px] min-w-[170px] cursor-pointer rounded-xl border-0 bg-blue px-3 py-0 text-center text-[13px] font-semibold leading-[35px] text-white shadow-[0_3px_10px_rgba(0,0,0,0.1)] outline-none transition-all duration-150 hover:shadow-[0_0_0_rgba(0,0,0,0.1)] max-[568px]:min-w-[120px]"
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
        className="m-0 block min-h-[150px] w-full rounded-xl border-2 border-solid border-gray px-3 py-2"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </div>
  );
};

export default ProductCommentsForm;
