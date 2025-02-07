"use client";
import { api } from "@/api/Api";
import style from "./ProductCommentsForm.module.scss";
import { useMediaQuery } from "@repo/core/hooks";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loading } from "@repo/shared_modules/components";
import { authorizeClientAction } from "@repo/core/utils";
import { purgeObjectFromFalsyValues } from "@repo/core/utils";
import StarIcon from "@/assets/svg/star";
import StarFillIcon from "@/assets/svg/starFill";

type Props = {
  productId: number;
  userRating: number;
};

const ProductCommentsForm = ({ productId, userRating }: Props) => {
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");

  const mutation = useMutation({
    mutationFn: (data: Parameters<typeof api.createCOmment>["0"]) => {
      return api.createCOmment(data);
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
      mutation.mutate(
        purgeObjectFromFalsyValues({ id: productId, text: comment, rate })
      );
    } else {
      toast("لطفا نظر خود را وارد کنید", { type: "warning" });
    }
  };

  return (
    <div className={style.productCommentsForm}>
      <div className={style.productCommentsFormHeader}>
        <div className={style.productCommentsFormHeaderRating}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className={rate >= 5 - index ? style.active : ""}
                onClick={() => setRate(5 - index)}
              >
                <StarIcon />
                <StarFillIcon />
              </div>
            ))}
        </div>

        <button
          onClick={authorizeClientAction(submitComment)}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <Loading size={12} />
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
