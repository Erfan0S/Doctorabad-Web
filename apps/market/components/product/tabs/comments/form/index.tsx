"use client";
import { api } from "@/api/Api";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "@/components/common/loading";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { purgeObjectFromFalsyValues } from "@repo/core/utils/purgeObjectFromFalsyValues";
import StarIcon from "@/assets/svg/newIcons/star";
import StarFillIcon from "@/assets/svg/newIcons/starFill";

const STAR_WRAPPER =
  "cursor-pointer [&_svg]:h-[25px] [&_svg]:w-[25px] [&_svg]:cursor-pointer";

type Props = {
  productId: number;
  userRating: number;
};

const ProductCommentsForm = ({ productId, userRating }: Props) => {
  const [rate, setRate] = useState(0);
  const [hoveredRate, setHoveredRate] = useState(0);
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
        purgeObjectFromFalsyValues({ id: productId, text: comment, rate }),
      );
    } else {
      toast("لطفا نظر خود را وارد کنید", { type: "warning" });
    }
  };

  return (
    <div className="mb-3 rounded-2xl border-2 border-solid border-orange p-2">
      <div className="relative mb-3 flex items-center">
        <div
          className="flex flex-row-reverse items-center"
          onMouseLeave={() => setHoveredRate(0)}
        >
          {Array(5)
            .fill(0)
            .map((_, index) => {
              const starValue = 5 - index;
              const isActive = (hoveredRate || rate) >= starValue;
              return (
                <div
                  key={index}
                  className={STAR_WRAPPER}
                  onClick={() => setRate(starValue)}
                  onMouseEnter={() => setHoveredRate(starValue)}
                >
                  <StarIcon className={isActive ? "hidden" : "inline-block"} />
                  <StarFillIcon
                    className={isActive ? "inline-block text-orange" : "hidden"}
                  />
                </div>
              );
            })}
        </div>

        <button
          className="ms-auto h-[35px] min-w-[170px] cursor-pointer rounded-xl border-0 bg-orange px-3 text-center text-[13px] font-semibold text-white shadow-[0_3px_10px_rgba(0,0,0,0.1)] outline-none transition duration-150 hover:shadow-none [@media(max-width:568px)]:min-w-[120px]"
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
        className="m-0 block min-h-[150px] w-full rounded-xl border-2 border-solid border-gray px-3 py-2"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </div>
  );
};

export default ProductCommentsForm;
