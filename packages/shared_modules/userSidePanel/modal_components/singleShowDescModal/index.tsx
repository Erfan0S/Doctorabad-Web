import { modalActions } from "@repo/core/modal/modals";
interface Props {
  title: string;
  description: string;
}
const ClubSingleDesc: React.FC<Props> = ({ title, description }) => {
  const handleCloseDesc = () => {
    modalActions.removeLastModal();
  };
  return (
    <div className="bg-white w-[250px] h-[230px] pt-[16px] px-[8px] pb-[16px] max-w-full text-center rounded-[12px] flex flex-col items-center">
      <h2 className="mb-[12px]">{title}</h2>
      <div className="flex items-center flex-col overflow-scroll [scrollbar-width:none] p-[16px] bg-[#dfdfdf] rounded-[8px] w-full mb-[12px] h-full">
        <p className="leading-[20px] text-black">{description}</p>
      </div>
      <button onClick={handleCloseDesc} className="bg-[var(--button-bg)] border-0 leading-[30px] text-white font-semibold text-[14px] cursor-pointer rounded-[8px] -mb-[35px] px-[40px] py-0 relative text-center w-[170px] shadow-[0_3px_10px_rgba(0,0,0,0.1)] focus:outline-none focus:shadow-none active:outline-none active:shadow-none">حله</button>
    </div>
  );
};

export default ClubSingleDesc;
