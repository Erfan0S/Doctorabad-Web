import React from "react";
import styles from "./questions.module.scss";
import { BugIcon, HeartIcon, InfoIcon } from "@repo/shared_modules/icons";
import Button from "../common/Button/Button";

const buttons = [
  {
    onClick: () => null,
    component: <HeartIcon />,
  },
  {
    onClick: () => null,
    component: <InfoIcon />,
  },
  {
    onClick: () => null,
    component: <BugIcon />,
  },
];

const QuestionRadio = ({
  id,
  name,
  title,
}: {
  name: string;
  id: string;
  title: string;
}) => {
  return (
    <div className={styles.radioWrapper}>
      <input type="radio" name={name} id={id} />
      <label htmlFor={id} className={styles.radio}>
        <div />
      </label>
      <label htmlFor={id}>{title}</label>
    </div>
  );
};

function QuestionItem() {
  return (
    <div className={`${styles.questionItem} card`}>
      <h4>
        <span>12 - </span>تشستیتشتسیتشتسیتشتسیتشت شتستیشتس تشتسی تشتسی تشسحش
        <span className={styles.category}>اطفال</span>
      </h4>
      <div className={styles.optionsWrapper}>
        <QuestionRadio id="radio1" name="question1" title="تست" />
        <QuestionRadio id="radio2" name="question1" title="تست" />
        <QuestionRadio id="radio3" name="question1" title="تست" />
        <QuestionRadio id="radio4" name="question1" title="تست" />
      </div>
      <div className={styles.buttonsWrapper}>
        <div className={styles.actionButtons}>
          {buttons.map((button) => {
            return <button onClick={button.onClick}>{button.component}</button>;
          })}
        </div>
        <div>
          <Button>پاسخ تشریحی</Button>
          <Button>پاسخ تستی</Button>
        </div>
      </div>
    </div>
  );
}

export default QuestionItem;
