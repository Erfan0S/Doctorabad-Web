"use client";
import { Apps } from "@repo/core/types/general";
import BackIcon from "../../assets/svg/back";
import style from "./PageHeader.module.scss";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  app?: Apps;
  className?: string;
  suffix?: React.ReactNode;
  children?: React.ReactNode;
  haveMargin?: boolean;
  onBack?: () => void;
  useBaseColor?: boolean;
}
const PageHeader: React.FC<Props> = ({
  title,
  suffix,
  onBack,
  children,
  haveMargin = true,
  className,
  app = Apps.BASE,
}) => {
  const router = useRouter();

  const OnBack = () => {
    if (onBack) {
      onBack();
    } else {
      const refferer = document.referrer;
      const historyLen = window.history.length;
      if (refferer && historyLen > 1) {
        router.back();
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div
      style={{ marginBottom: haveMargin ? 10 : 0 }}
      className={`${style.sidePanelHeaderContainer} ${className} ${style[app]}`}
    >
      <div className={`${style.sidePanelHeader}`}>
        <span>{title}</span>
        <div className={style.headerButtonContainer}>
          <button className={style.headerButton} onClick={OnBack}>
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
