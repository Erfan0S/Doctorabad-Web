"use client";
import CircleCheck from "@/assets/svg/circleCheck";
import Close from "@/assets/svg/close";

import Copy from "@/assets/svg/copy";
import { copyText } from "@repo/core/utils/copyText";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";

type Props = {
  orderDate?: string;
  orderId?: string;
  isOrderSuccess: boolean;
  trackingId?: string;
};

const liClass = "mb-1 flex items-center";
const liLabelClass = "me-1 text-gray";
const liValueClass =
  "flex items-center [&_svg]:ms-3 [&_svg]:w-[25px] [&_svg]:cursor-pointer";

const CallbackDetail = ({
  isOrderSuccess,
  orderDate,
  orderId,
  trackingId,
}: Props) => {
  const orderDateString = orderDate ? toFullPersianDateString(orderDate) : "";

  const orderTimeString = orderDate
    ? new Intl.DateTimeFormat("fa-u-ca-persian", {
        timeStyle: "medium",
      }).format(new Date(orderDate))
    : "";

  return (
    <div>
      <div
        className={`mb-6 flex items-center rounded-lg p-2 text-[13px] font-semibold text-white [&_svg]:me-2 [&_svg]:w-[30px] [&_svg]:fill-white ${
          isOrderSuccess ? "bg-[#00ae00]" : "bg-red"
        }`}
      >
        {isOrderSuccess ? <CircleCheck fill="#fff" /> : <Close fill="#fff" />}
        <span>
          {isOrderSuccess
            ? "سفارش با موفقیت ثبت شد"
            : "سفارش شما با خطا مواجه شد.در صورت عدم بازگشت وجه تا 72 ساعت اینده با پشتیبانی تماس بگیرید"}
        </span>
      </div>
      {isOrderSuccess && (
        <div className="ps-5">
          <span className="mb-1 block text-[14px] font-medium leading-[30px]">
            {orderDateString} ساعت {orderTimeString}
          </span>
          <ul className="m-0 list-none p-0 text-[14px] font-medium leading-[30px]">
            <li className={liClass}>
              <span className={liLabelClass}>شماره سفارش :</span>
              <span className={liValueClass}>
                {orderId}
                <Copy
                  onClick={() => copyText(orderId!, "شماره سفارش کپی شد")}
                />
              </span>
            </li>
            {trackingId && (
              <li className={liClass}>
                <span className={liLabelClass}>شماره رهگیری :</span>
                <span className={liValueClass}>
                  {trackingId}
                  <Copy
                    onClick={() => copyText(trackingId!, "کد رهگیری کپی شد")}
                  />
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CallbackDetail;
