"use client";

import style from "./CallbackDetail.module.scss";
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
    <div className={style.callbackDetail}>
      <div
        className={`${style.callbackDetailAlert} ${!isOrderSuccess ? style.callbackDetailAlertFailed : ""}`}
      >
        {isOrderSuccess ? <CircleCheck fill="#fff" /> : <Close fill="#fff" />}
        <span>
          {isOrderSuccess
            ? "سفارش با موفقیت ثبت شد"
            : "سفارش شما با خطا مواجه شد.در صورت عدم بازگشت وجه تا 72 ساعت اینده با پشتیبانی تماس بگیرید"}
        </span>
      </div>
      {isOrderSuccess && (
        <div className={style.callbackDetailDetail}>
          <span>
            {orderDateString} ساعت {orderTimeString}
          </span>
          <ul>
            <li>
              <span>شماره سفارش :</span>
              <span>
                {orderId}
                <Copy
                  onClick={() => copyText(orderId!, "شماره سفارش کپی شد")}
                />
              </span>
            </li>
            {trackingId && (
              <li>
                <span>شماره رهگیری :</span>
                <span>
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
