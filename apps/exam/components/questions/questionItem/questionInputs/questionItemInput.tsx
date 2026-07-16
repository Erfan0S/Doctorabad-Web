import { toast } from "react-toastify";
import { QuestionTypes } from "@/types/exam";
import CheckIcon from "@/assets/svg/check";
import XIcon from "@/assets/svg/x";
import { ExamStatus } from "@repo/apps_shared_components/exam/types";

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
  const radioColor = showAnswer
    ? isCorrect
      ? "border-green-base bg-green-base peer-checked:border-green-dark peer-checked:bg-green-base"
      : "border-gray-light bg-white peer-checked:bg-red peer-checked:border-red"
    : "border-gray-light bg-white peer-checked:bg-purple peer-checked:border-purple";

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
    <div className="flex flex-row items-center gap-[10px] z-[5]">
      <input
        className="peer hidden"
        type={inputType}
        name={name}
        id={id}
        onChange={onClickHandler}
        checked={checked}
      />
      <label
        htmlFor={id}
        className={`${type === QuestionTypes.MultipleSelect ? "rounded-[3px]" : "rounded-full"} w-[15px] h-[15px] border border-solid ${radioColor} flex items-center justify-center cursor-pointer m-0 relative [&_svg]:text-white [&_svg]:w-2 [&_svg]:h-full`}
      >
        {showAnswer ? isCorrect ? <CheckIcon /> : <XIcon /> : null}
      </label>
      <label
        htmlFor={id}
        className="flex-1 px-[3px] rounded-[100px] m-0 relative cursor-pointer"
      >
        {title}
      </label>
    </div>
  );
};

export default QuestionInput;
