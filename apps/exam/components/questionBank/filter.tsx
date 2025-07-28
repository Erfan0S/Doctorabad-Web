import React from "react";
import Button from "../common/Button/Button";
import style from "./questionBank.module.scss";

function QuestionBankFilter() {
  return (
    <div className={`${style.filterContainer} container`}>
      <div className={`card ${style.topButtons}`}>
        <Button>سوالات مورد علاقه‌من</Button>
        <Button disabled>آزمون‌های ساخته شده من</Button>
      </div>
    </div>
  );
}

export default QuestionBankFilter;
