"use client";
import BackIcon from "@/assets/svg/back";
import style from "./PageHeader.module.scss";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  className?: string;
  suffix?: React.ReactNode;
  children?: React.ReactNode;
  haveMargin?: boolean;
  onBack?: () => void;
}
const PageHeader: React.FC<Props> = ({
  title,
  suffix,
  onBack,
  children,
  haveMargin = true,
  className,
}) => {
  const router = useRouter();

  const OnBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/");

      // const refferer = document.referrer;
      // if (refferer) {
      //   router.back();
      // } else {
      //   router.push("/");
      // }
    }
  };

  return (
    <div
      style={{ marginBottom: haveMargin ? 10 : 0 }}
      className={`${style.sidePanelHeaderContainer} ${className}`}
    >
      <div className={style.sidePanelHeader}>
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
