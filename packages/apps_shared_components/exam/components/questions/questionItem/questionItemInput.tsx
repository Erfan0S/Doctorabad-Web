import { toast } from "react-toastify";
import styles from "./questionItem.module.scss";

type Props = {
  name: string;
  id: string;
  title: string;
  type?: "radio" | "checkbox" | "text";
  isCorrect?: boolean;
  showAnswer?: boolean;
  isFinished?: boolean;
};

const QuestionInput = ({
  id,
  name,
  title,
  showAnswer,
  isCorrect,
  type = "radio",
  isFinished,
}: Props) => {
  const showAnswerClass = showAnswer
    ? isCorrect
      ? styles.radioCurrect
      : styles.radioWrong
    : "";

  if (type === "text") {
    return <input type="text" name={name} id={id} />;
  }

  const onClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    if (isFinished) {
      e.preventDefault();
      toast.error("آزمون تموم شده!");
    }
  };

  return (
    <div className={`${styles.radioWrapper} ${showAnswerClass}`}>
      <input type={type} name={name} id={id} onClick={onClickHandler} />
      <label htmlFor={id} className={styles.radio}>
        <div />
      </label>
      <label htmlFor={id} className={styles.radioLabel}>
        {title}
      </label>
    </div>
  );
};

export default QuestionInput;
