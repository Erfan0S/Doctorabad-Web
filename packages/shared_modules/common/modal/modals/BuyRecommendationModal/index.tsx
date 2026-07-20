"use client";
import { ExamType } from "@repo/apps_shared_components/exam/types";
import { Apps } from "@repo/core/types/general";
import { ModalProps } from "@repo/core/types/modals";
import {
  AddToCartButton,
  ModalWrapper,
  ProductPrice,
  ProductSnappayNotif,
} from "@repo/shared_modules/components";
import Image from "next/image";
import { OrderType } from "@repo/core/types/cart";
import { useCart } from "@repo/core/states/cart";
import examIcon from "@repo/shared_modules/images/doctor-exam.png";

const BuyRecommendationModal = ({
  closeModal,
  data: { exam },
}: ModalProps<{
  exam: ExamType;
}>) => {
  const { data, initLoading } = useCart();

  const orderId = data?.find((d) => d.product_id === exam.id)?.id;

  return (
    <ModalWrapper
      closeModal={closeModal}
      haveAppIcon
      app={Apps.EXAM}
      className="px-0 pt-[60px] max-w-[90vw] [&_img]:w-[80px] [&_img]:h-[80px] [&_p]:font-bold [&_p]:text-[14px] [&_h3]:font-bold [&_h3]:text-[14px] [&_p:last-of-type]:text-[13px] [&_p:last-of-type]:font-normal [&_p:last-of-type]:px-[75px] [&_p:last-of-type]:text-center [&_p:last-of-type]:mt-[15px]"
      submitButton={
        <AddToCartButton
          type={OrderType.Exam}
          id={exam.id}
          app={Apps.EXAM}
          isColumn
        />
      }
      customIcon={
        <Image
          src={exam.picture || examIcon}
          alt={exam.title}
          width={150}
          height={150}
        />
      }
    >
      <h3>{exam.title}</h3>
      <p className="flex flex-col justify-center items-center leading-[18px]">
        <span>{exam.date}</span>
        <span>{exam.place}</span>
      </p>
      <p>همراه با پاسخ تشریحی</p>

      <ProductPrice
        mainPrice={exam.main_price}
        offPrice={exam.off_price}
        app={Apps.EXAM}
        className="mb-0 [&>div]:!justify-center"
      />
      {exam.installment_payment && exam.installment_text && (
        <ProductSnappayNotif
          text={exam.installment_text}
        />
      )}

      <p style={{ marginBottom: orderId ? "55px" : "0px" }}>
        به جای خرید تک‌آزمون می‌تونی با خرید طرح از بخش <b>بانک سوال</b> از همه
        آزمون‌‌ها استفاده کنی!
      </p>
    </ModalWrapper>
  );
};

export default BuyRecommendationModal;
