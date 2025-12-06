import { toast } from "react-toastify";
import styles from "./questionItemInput.module.scss";
import { ExamStatus, QuestionTypes } from "../../../../types/exam";
import CheckIcon from "../../../../assets/svg/check";
import XIcon from "../../../../assets/svg/x";

type Props = {
  name: string;
  id: string;
  title: string;
  type?: QuestionTypes;
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
  type = QuestionTypes.SingleSelect,
  status,
  onChange,
  checked,
}: Props) => {
  const showAnswerClass = showAnswer
    ? isCorrect
      ? styles.radioCorrect
      : styles.radioWrong
    : "";

  if (type === QuestionTypes.Text) {
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

  const inputType = type === QuestionTypes.SingleSelect ? "radio" : "checkbox";

  return (
    <div
      className={`${styles.radioWrapper} ${showAnswerClass} ${type === QuestionTypes.MultipleSelect ? styles.radioMultipleWrapper : null}`}
    >
      <input
        type={inputType}
        name={name}
        id={id}
        onChange={onClickHandler}
        checked={checked}
      />
      <label htmlFor={id} className={styles.radio}>
        {showAnswer ? isCorrect ? <CheckIcon /> : <XIcon /> : null}
      </label>
      <label htmlFor={id} className={styles.radioLabel}>
        {title}
      </label>
    </div>
  );
};

export default QuestionInput;
