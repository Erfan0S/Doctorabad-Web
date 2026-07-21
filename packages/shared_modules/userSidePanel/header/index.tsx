import { SidePanelPage, SidePanelPageProps } from "@repo/core/types/sidePanel";
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
    <div className="sticky top-0 z-[100] flex items-center bg-green-base py-2 pe-2 ps-3">
      <span className="max-w-[calc(100%-100px)] overflow-hidden text-ellipsis whitespace-nowrap text-[20px] font-extrabold text-white">
        {title}
      </span>
      <div className="ms-auto flex flex-row-reverse items-center [&_button]:ms-2 [&_button]:flex [&_button]:h-[45px] [&_button]:w-[45px] [&_button]:cursor-pointer [&_button]:items-center [&_button]:justify-center [&_button]:rounded-lg [&_button]:border-none [&_button]:bg-white [&_button]:shadow-[0_0_5px_rgba(0,0,0,0.1)] [&_button]:outline-none [&_button:focus]:outline-none [&_button:active]:outline-none [&_button_img]:h-[30px] [&_button_img]:w-[30px] [&_button_svg]:h-[30px] [&_button_svg]:w-[30px]">
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
