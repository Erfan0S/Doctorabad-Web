// import { motion } from "framer-motion";
// import { animationConfigs } from "@repo/core";
import { ModalProps } from "@repo/core/types/modals";
import videojs from "video.js";
import styles from "./VideoQualitySelector.module.scss";
import { font } from "@/assets/fonts/font";


// TODO: add type to variables in this component

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
          className={`${styles.option} ${level.enabled && !isAutoQualityActive ? styles.selected : ""}`}
          onClick={() => onSpecificQualityClick(level)}
        >
          {level.height}
        </div>
      );
    }
    return nodes;
  };

  return (
    <div className={`${styles.root} ${font.className}`}>
      <div
        onClick={onAutoQualityClick}
        className={`${styles.option} ${isAutoQualityActive ? styles.selected : ""}`}
      >
        خودکار{" "}
        {isAutoQualityActive &&
          `(${qualityLevels[qualityLevels.selectedIndex_].height})`}
      </div>
      {getQualityLevelnodes()}
    </div>
  );
};
