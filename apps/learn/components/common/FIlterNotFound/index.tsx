import React from "react";
import style from "./style.module.scss";

type Props = {
  massage?: string;
};

function FIlterNotFound({ massage }: Props) {
  return (
    <div className={`${style.filterNotFound} container`}>
      <p>
        گفتند یافت می‌نشود جسته‌ایم ما
        <br />
        گفتند آنچه یافت می‌نشود آنم آرزوست!
      </p>
      {!!massage && <p>{massage}</p>}
    </div>
  );
}

export default FIlterNotFound;
