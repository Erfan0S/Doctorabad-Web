import { SidePanelPage, SidePanelPageProps } from "@repo/core/types/sidePanel";
import style from "./SidePanelHeader.module.scss";
import BackIcon from "../../assets/svg/back";
import { modalActions } from "@repo/core/modal/modals";

interface Props extends Partial<SidePanelPageProps> {
  title: string;
  suffix?: React.ReactNode;
  onBack?: () => void;
}
const SidePanelHeader: React.FC<Props> = ({
  title,
  setPage,
  suffix,
  onBack,
}) => {
  return (
    <div className={style.sidePanelHeader}>
      <span>{title}</span>
      <div className={style.sidePanelHeaderSuffix}>
        <button
          onClick={() => (onBack ? onBack() : modalActions.removeLastModal())}
        >
          <BackIcon />
        </button>
        {suffix}
      </div>
    </div>
  );
};

export default SidePanelHeader;
