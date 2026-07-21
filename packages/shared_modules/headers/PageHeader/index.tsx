"use client";
import { Apps } from "@repo/core/types/general";
import BackIcon from "../../assets/svg/back";
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
      className={`sticky top-0 z-[1000] flex w-full flex-col items-center bg-white ${className} ${app}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="ms-auto flex w-full items-center justify-between bg-[var(--button-bg,var(--button-bg-red))] px-[10px] py-[5px]">
        <h1 className="max-w-[calc(100%-100px)] overflow-hidden text-ellipsis whitespace-nowrap font-black text-white">
          {title}
        </h1>
        <div className="header-buttons-container">
          <button className="w-[45px]" onClick={OnBack}>
            <BackIcon />
          </button>
          {suffix}
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default PageHeader;
