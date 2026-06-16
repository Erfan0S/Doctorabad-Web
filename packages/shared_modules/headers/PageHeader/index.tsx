"use client";
import { Apps } from "@repo/core/types/general";
import BackIcon from "../../assets/svg/back";
import style from "./PageHeader.module.scss";
import { useNavigationHistory } from "@repo/core/hooks/useNavigationBack";
import { useTopLoader } from "nextjs-toploader";

interface Props {
  title: string | React.ReactNode;
  app?: Apps;
  className?: string;
  suffix?: React.ReactNode;
  children?: React.ReactNode;
  haveMargin?: boolean;
  onBack?: (callBack: () => void) => void;
  useBaseColor?: boolean;
  defaultBackUrl?: string;
}
const PageHeader: React.FC<Props> = ({
  title,
  suffix,
  onBack,
  children,
  haveMargin = true,
  className,
  app = Apps.BASE,
  defaultBackUrl,
}) => {
  const navHistory = useNavigationHistory();
  const topLoader = useTopLoader();

  const OnBack = () => {
    topLoader.start();
    if (onBack) {
      onBack(() => navHistory.goBack());
    } else {
      navHistory.goBack(defaultBackUrl);
    }
  };

  return (
    <div
      style={{ marginBottom: haveMargin ? 10 : 0 }}
      className={`${style.sidePanelHeaderContainer} ${className} ${style[app]}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className={`${style.sidePanelHeader}`}>
        <h1>{title}</h1>
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
