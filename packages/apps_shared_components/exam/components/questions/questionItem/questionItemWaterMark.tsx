import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import Image from "next/image";
import style from "./questionItem.module.scss";

function QuestionItemWaterMark() {
  return (
    <div className={style.questionItemWaterMark}>
      <Image src={placeHolderDataUrl} alt="doctorAbad" width={0} height={0} />
    </div>
  );
}

export default QuestionItemWaterMark;
