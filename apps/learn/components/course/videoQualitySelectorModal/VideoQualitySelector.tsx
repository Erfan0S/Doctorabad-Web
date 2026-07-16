// import { motion } from "framer-motion";
// import { animationConfigs } from "@repo/core";
import { ModalProps } from "@repo/core/types/modals";
import videojs from "video.js";
import { font } from "@/assets/fonts/font";


// TODO: add type to variables in this component

const optionClass =
  "mb-1 cursor-pointer rounded px-3 py-2 text-center text-[14px] transition-all duration-200 ease-[ease] last:mb-0 hover:bg-[#f7fafc]";
const selectedClass = "bg-[#f0fff4] font-medium text-[#2f855a]";

export const VideoQualitySelector = ({
  data,
  closeModal,
}: ModalProps<{
  player: ReturnType<typeof videojs>;
  selectedQualityLevelIndex: number;
}>) => {
  //@ts-ignore
  const qualityLevels = data!.player!.qualityLevels();

  const isAutoQualityActive = Array.from(qualityLevels).every(
    (level: any) => level.enabled
  );

  const onSpecificQualityClick = (qualityLevel: any) => {
    for (let level of qualityLevels) {
      level.enabled = qualityLevel.id === level.id;
    }
    closeModal();
  };
  const onAutoQualityClick = () => {
    for (let level of qualityLevels) {
      level.enabled = true;
    }
    closeModal();
  };
  const getQualityLevelnodes = () => {
    const nodes: any = [];
    // use for of loop
    for (const level of qualityLevels) {
      nodes.push(
        <div
          key={level.id}
          className={`${optionClass} ${level.enabled && !isAutoQualityActive ? selectedClass : "text-[#4a5568]"}`}
          onClick={() => onSpecificQualityClick(level)}
        >
          {level.height}
        </div>
      );
    }
    return nodes;
  };

  return (
    <div
      className={`absolute bottom-0 inset-x-0 min-w-[160px] rounded-lg bg-white p-3 shadow-[0_4px_6px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.08)] ${font.className}`}
    >
      <div
        onClick={onAutoQualityClick}
        className={`${optionClass} ${isAutoQualityActive ? selectedClass : "text-[#4a5568]"}`}
      >
        خودکار{" "}
        {isAutoQualityActive &&
          `(${qualityLevels[qualityLevels.selectedIndex_].height})`}
      </div>
      {getQualityLevelnodes()}
    </div>
  );
};
