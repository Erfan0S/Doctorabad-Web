import style from "./questionItem.module.scss";
import { DrAbadWatermark } from "@repo/shared_modules/icons";

function QuestionItemWaterMark() {
  return (
    <div className={style.questionItemWaterMark}>
      <DrAbadWatermark />
      <DrAbadWatermark />
      <DrAbadWatermark />
    </div>
  );
}

export default QuestionItemWaterMark;
