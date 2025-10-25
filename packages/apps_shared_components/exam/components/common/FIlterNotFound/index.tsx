import React from "react";
import { FIlterNotFound as SharedFIlterNotFound } from "@repo/shared_modules/components";

type Props = {
  massage?: string;
};

function ExamFIlterNotFound({ massage }: Props) {
  return (
    <SharedFIlterNotFound
      primaryMassage={
        <>
          بار دیگر طرح کن با من سوال عشق را
          <br />
          تا منِ ماهی بگویم پاسخ قلاب چیست!
        </>
      }
      secondaryMassage={
        massage || "فیلترهای کمتری اعمال کن تا سوالات بیشتری نشان داده بشه!"
      }
    />
  );
}

export default ExamFIlterNotFound;
