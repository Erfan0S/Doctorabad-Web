"use client";

import { copyText } from "@repo/core/utils/copyText";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import CircleCheck from "@repo/shared_modules/icons/circleCheck";
import Close from "@repo/shared_modules/icons/close";
import Copy from "@repo/shared_modules/icons/copy";

type Props = {
  orderDate?: string;
  orderId?: string;
  isOrderSuccess: boolean;
  trackingId?: string;
  installmentTransactionId?: string;
};

const CallbackDetail = ({
  isOrderSuccess,
  orderDate,
  orderId,
  trackingId,
  installmentTransactionId,
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
        className={`mb-6 flex items-center rounded-lg bg-[#00ae00] p-2 text-[13px] font-semibold text-white ${!isOrderSuccess ? "!bg-[#ed3152]" : ""}`}
      >
        {isOrderSuccess ? <CircleCheck fill="#fff" /> : <Close fill="#fff" />}
        <span className="ms-2 [&_svg]:w-[30px]">
          {isOrderSuccess
            ? "سفارش با موفقیت ثبت شد"
            : "سفارش شما با خطا مواجه شد.در صورت عدم بازگشت وجه تا 72 ساعت اینده با پشتیبانی تماس بگیرید"}
        </span>
      </div>
      {isOrderSuccess && (
        <div className="pr-5 text-sm font-medium leading-7">
          <span className="mb-1 block">
            {orderDateString} ساعت {orderTimeString}
          </span>
          <ul className="m-0 list-none p-0 text-sm font-medium leading-7">
            <li className="mb-1 flex items-center">
              <span className="ms-1 text-gray-light">شماره سفارش :</span>
              <span className="flex items-center">
                {orderId}
                <Copy
                  className="me-3 w-[25px] cursor-pointer"
                  onClick={() => copyText(orderId!, "شماره سفارش کپی شد")}
                />
              </span>
            </li>
            {trackingId && (
              <li className="mb-1 flex items-center">
                <span className="ms-1 text-gray-light">شماره رهگیری :</span>
                <span className="flex items-center">
                  {trackingId}
                  <Copy
                    className="me-3 w-[25px] cursor-pointer"
                    onClick={() => copyText(trackingId!, "کد رهگیری کپی شد")}
                  />
                </span>
              </li>
            )}
            {installmentTransactionId && (
              <li className="mb-1 flex items-center">
                <span className="ms-1 text-gray-light">
                  کد رهگیری سفارش قسطی :
                </span>
                <span className="flex items-center">
                  {installmentTransactionId}
                  <Copy
                    className="me-3 w-[25px] cursor-pointer"
                    onClick={() =>
                      copyText(installmentTransactionId!, "کد رهگیری کپی شد")
                    }
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
