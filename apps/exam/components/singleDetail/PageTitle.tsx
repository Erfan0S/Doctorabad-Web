import { ExamDetailType } from "@repo/apps_shared_components/exam/types/exam.ts";
import style from "./singleDetail.module.scss";

type Props = {
  exam: ExamDetailType;
};
const PageTitle = ({ exam }: Props) => {
  return (
    <div className={style.pageTitle}>
      {`${exam.title} ${exam.date.when_fa}`}
      <div>
        <span>{exam.date.when_fa}</span>
        <span>{exam.place.title}</span>
      </div>
    </div>
  );
};

export default PageTitle;
