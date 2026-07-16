import { ExamDetailType } from "@/types/exam";

type Props = {
  exam: ExamDetailType;
};
const PageTitle = ({ exam }: Props) => {
  return (
    <div className="flex flex-col text-[14px] max-[425px]:text-[12px] font-semibold py-[5px] gap-[2px]">
      {`${exam.title} ${exam.date.when_fa}`}
      <div className="flex flex-row text-[13px] max-[425px]:text-[11px] font-light gap-[25px]">
        <span>{exam.date.when_fa}</span>
        <span>{exam.place.title}</span>
      </div>
    </div>
  );
};

export default PageTitle;
