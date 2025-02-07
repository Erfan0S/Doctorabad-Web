"use client";
import BackIcon from "@/assets/svg/back";
import style from "./PageHeader.module.scss";

interface Props {
  title: string;
  suffix?: React.ReactNode;
  children?: React.ReactNode;
  onBack?: () => void;
}
const PageHeader: React.FC<Props> = ({ title, suffix, onBack, children }) => {
  return (
    <div className={style.sidePanelHeaderContainer}>
      <div className={style.sidePanelHeader}>
        <span>{title}</span>
        <div className={style.headerButtonContainer}>
          <button
            className={style.headerButton}
            onClick={() => (onBack ? onBack() : null)}
          >
            <BackIcon />
          </button>
          {suffix}
        </div>
      </div>
      <div className={style.sidePanelHeaderChildren}>{children}</div>
    </div>
  );
};

export default PageHeader;
