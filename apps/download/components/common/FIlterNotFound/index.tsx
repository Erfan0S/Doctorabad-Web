import React from "react";
import { FIlterNotFound as SharedFIlterNotFound } from "@repo/shared_modules/components";

type Props = {
  massage?: string;
};

function FIlterNotFound({ massage }: Props) {
  return (
    <SharedFIlterNotFound
      primaryMassage={
        <>
          گفتند یافت می‌نشود جسته‌ایم ما
          <br />
          گفتند آنچه یافت می‌نشود آنم آرزوست!
        </>
      }
      secondaryMassage={massage}
    />
  );
}

export default FIlterNotFound;
