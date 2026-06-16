import React from "react";
import styles from "./ServiceCard.module.scss";
import { StaticImageData } from "next/image";

export interface ServiceCardProps {
  title: string;
  enTitle: string;
  icon: StaticImageData;
  href: string;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  enTitle,
  icon,
  href,
  onClick,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onClick) return;
    event.preventDefault();
    onClick();
  };

  return (
    <a href={href} onClick={handleClick} className={styles.card}>
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
