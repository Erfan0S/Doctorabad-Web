import { DrAbadWatermark } from "@repo/shared_modules/icons";

// ponytail: physical right/bottom kept — full-bleed watermark overlay
function QuestionItemWaterMark() {
  return (
    <div className="absolute w-full h-full bottom-0 right-0 opacity-15 -translate-y-1/2 flex flex-row flex-wrap [&>svg]:translate-y-[-31px] [&_img]:w-full [&_img]:h-full [&_img]:object-contain">
      <DrAbadWatermark />
      <DrAbadWatermark />
      <DrAbadWatermark />
    </div>
  );
}

export default QuestionItemWaterMark;
