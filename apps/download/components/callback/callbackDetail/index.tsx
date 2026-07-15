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
        className={`mb-6 flex items-center rounded-lg p-2 text-[13px] font-semibold text-white [&_svg]:ml-2 [&_svg]:w-[30px] [&_svg]:fill-white ${!isOrderSuccess ? "bg-blue" : "bg-[#00ae00]"}`}
      >
        {isOrderSuccess ? <CircleCheck fill="#fff" /> : <Close fill="#fff" />}
        <span>
          {isOrderSuccess
            ? "سفارش با موفقیت ثبت شد"
            : "سفارش شما با خطا مواجه شد.در صورت عدم بازگشت وجه تا 72 ساعت اینده با پشتیبانی تماس بگیرید"}
        </span>
      </div>
      {isOrderSuccess && (
        <div className="pr-5">
          <span className="mb-1 block text-[14px] font-medium leading-[30px]">
            {orderDateString} ساعت {orderTimeString}
          </span>
          <ul className="m-0 list-none p-0 text-[14px] font-medium leading-[30px]">
            <li className="mb-1 flex items-center">
              <span className="ml-1 text-gray">شماره سفارش :</span>
              <span className="flex items-center [&_svg]:mr-3 [&_svg]:w-[25px] [&_svg]:cursor-pointer">
                {orderId}
                <Copy
                  onClick={() => copyText(orderId!, "شماره سفارش کپی شد")}
                />
              </span>
            </li>
            {trackingId && (
              <li className="mb-1 flex items-center">
                <span className="ml-1 text-gray">شماره رهگیری :</span>
                <span className="flex items-center [&_svg]:mr-3 [&_svg]:w-[25px] [&_svg]:cursor-pointer">
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
