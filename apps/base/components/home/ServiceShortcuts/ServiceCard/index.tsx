import React from "react";
import styles from "./ServiceCard.module.scss";
import { StaticImageData } from "next/image";

export interface ServiceCardProps {
  title: string;
  enTitle: string;
  icon: StaticImageData;
  href: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  enTitle,
  icon,
  href,
}) => {
  return (
    <a href={href} className={styles.card}>
      <img
        src={icon.src}
        alt={title}
        className={styles.image}
      />
      <div className={styles.textWrap}>
        <span className={styles.title}>{title}</span>
        {/* <span className={styles.enTitle}>{enTitle}</span> */}
      </div>
    </a>
  );
};

export default ServiceCard;
