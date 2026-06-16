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
import React from "react";
import styles from "./BuyRecommendationModal.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { OrderType } from "@repo/core/types/cart";
import { useCart } from "@repo/core/states/cart";

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
      className={styles.buyRecommendationModalWrapper}
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
          src={exam.picture || ""}
          alt={exam.title}
          width={150}
          height={150}
        />
      }
    >
      <h3>{exam.title}</h3>
      <p className={styles.examInfo}>
        <span>{exam.date}</span>
        <span>{exam.place}</span>
      </p>
      <p>همراه با پاسخ تشریحی</p>

      <ProductPrice
        mainPrice={exam.main_price}
        offPrice={exam.off_price}
        app={Apps.EXAM}
        className={styles.price}
      />
      {exam.installment_payment && exam.installment_text && (
        <ProductSnappayNotif
          text={exam.installment_text}
          className={styles.snappayNotif}
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
