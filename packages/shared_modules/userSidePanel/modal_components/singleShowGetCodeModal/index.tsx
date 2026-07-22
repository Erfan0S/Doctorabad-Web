import { modalActions } from "@repo/core/modal/modals";
import CopyCode from "../../../assets/svg/copyCode";
import { copyText } from "@repo/core/utils/copyText";
interface Props {
  title: string;
  code: string;
}
const ClubSingleGetCode: React.FC<Props> = ({ title, code }) => {
  const handleCloseGetCode = () => {
    modalActions.removeLastModal();
  };
  return (
    <div className="bg-white w-[250px] h-[230px] pt-[16px] px-[8px] pb-[16px] max-w-full text-center rounded-[12px] flex flex-col items-center">
      <h2 className="mb-[12px]">{title}</h2>
      <div className="flex items-center flex-col overflow-scroll [scrollbar-width:none] p-[16px] bg-[#dfdfdf] rounded-[8px] w-full mb-[12px]">
        <span className="block text-[#7d7d7d] text-[16px] font-bold mb-[12px]">کد تخفیف شما</span>
        <span className="block bg-white rounded-[4px] leading-[35px] shadow-[rgba(9,30,66,0.25)_0px_4px_8px_-2px,rgba(9,30,66,0.08)_0px_0px_0px_1px] font-medium mb-[16px] w-full text-[16px]">{code}</span>
        <button className="flex items-center bg-[#efefef] py-0 px-[8px] border-0 font-light cursor-pointer rounded-[4px] leading-[30px] shadow-[rgba(9,30,66,0.25)_0px_4px_8px_-2px,rgba(9,30,66,0.08)_0px_0px_0px_1px] active:outline-none focus:outline-none [&_svg]:me-[8px]" onClick={() => copyText(code, "کد تخفیف کپی شد")}>
          <CopyCode width={13} height={13} /> کپی کردن
        </button>
      </div>
      <button onClick={handleCloseGetCode} className="bg-[var(--button-bg)] border-0 leading-[30px] text-white font-semibold text-[14px] cursor-pointer rounded-[8px] -mb-[35px] px-[40px] py-0 relative text-center w-[170px] shadow-[0_3px_10px_rgba(0,0,0,0.1)] focus:outline-none focus:shadow-none active:outline-none active:shadow-none">حله</button>
    </div>
  );
};

export default ClubSingleGetCode;
