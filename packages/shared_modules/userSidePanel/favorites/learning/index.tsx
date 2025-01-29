import Image from "next/image";
import { learningData } from "./learning-data";
import style from "./SidePanelFavoritesLearning.module.scss";
import Teacher from "../../../assets/svg/teacher";
import Link from "next/link";
import React from "react";

const SidePanelFavoritesLearning: React.FC = () => {
  return (
    <div className={style.sidePanelFavoritesLearning} aria-label="hello">
      {learningData.map(({ id, image, language, teacher, title, href }) => (
        <div key={id} className={style.sidePanelFavoritesLearningItem}>
          <div className={style.sidePanelFavoritesLearningItemImage}>
            <Image src={image} alt="favoritesImage" width={100} height={65} />
          </div>
          <div className={style.sidePanelFavoritesLearningItemContent}>
            <div className={style.sidePanelFavoritesLearningItemTitle}>
              <span>{title}</span>
            </div>
            <div className={style.sidePanelFavoritesLearningItemFooter}>
              <span>
                <Teacher /> {teacher}
              </span>
              <small>{language}</small>
            </div>
          </div>
          <Link href={href} />
        </div>
      ))}
    </div>
  );
};

export default SidePanelFavoritesLearning;
