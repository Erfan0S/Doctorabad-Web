import styles from "./questionItem.module.scss";

const QuestionInput = ({
  id,
  name,
  title,
  showAnswer,
  isCorrect,
  type = "radio",
}: {
  name: string;
  id: string;
  title: string;
  type?: "radio" | "checkbox" | "text";
  isCorrect?: boolean;
  showAnswer?: boolean;
}) => {
  const showAnswerClass = showAnswer
    ? isCorrect
      ? styles.radioCurrect
      : styles.radioWrong
    : "";

  if (type === "text") {
    return <input type="text" name={name} id={id} />;
  }

  return (
    <div className={`${styles.radioWrapper} ${showAnswerClass}`}>
      <input type={type} name={name} id={id} />
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
