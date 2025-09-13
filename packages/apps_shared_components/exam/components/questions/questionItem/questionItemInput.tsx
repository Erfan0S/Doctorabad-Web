import { toast } from "react-toastify";
import styles from "./questionItem.module.scss";
import { ExamStatus } from "../../../types/exam";

type Props = {
  name: string;
  id: string;
  title: string;
  type?: "radio" | "checkbox" | "text";
  isCorrect?: boolean;
  showAnswer?: boolean;
  status?: ExamStatus;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
};

const QuestionInput = ({
  id,
  name,
  title,
  showAnswer,
  isCorrect,
  type = "radio",
  status,
  onChange,
  checked,
}: Props) => {
  const showAnswerClass = showAnswer
    ? isCorrect
      ? styles.radioCorrect
      : styles.radioWrong
    : "";

  if (type === "text") {
    return <input type="text" name={name} id={id} />;
  }

  const onClickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status === ExamStatus.FINISHED) {
      e.preventDefault();
      toast.error("آزمون تموم شده!");
      return;
    } else if (status === ExamStatus.DRAFT) {
      e.preventDefault();
      toast.warning("آزمون هنوز شروع نشده!");
      return;
    }
    onChange && onChange(e);
  };

  return (
    <div className={`${styles.radioWrapper} ${showAnswerClass}`}>
      <input
        type={type}
        name={name}
        id={id}
        onChange={onClickHandler}
        checked={checked}
      />
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
