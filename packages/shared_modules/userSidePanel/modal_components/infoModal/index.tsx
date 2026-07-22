import { modalActions } from "@repo/core/modal/modals";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import Loading from "../../../common/components/loading";
import sanitize from "@repo/core/utils/sanitize";

interface Props {
  title: string;
}
const ClubInfo: React.FC<Props> = ({ title }) => {
  const { data, isLoading } = useQuery({
    queryFn: api.getClubHelpText,
    queryKey: ["getClubHelpText"],
    retry: 1,
    staleTime: Infinity,
  });

  const handleCloseInfo = () => {
    modalActions.removeLastModal();
  };

  return (
    <div className="bg-white w-[400px] h-[500px] pt-[20px] px-[12px] pb-[24px] max-w-full text-center rounded-[12px] flex flex-col items-center max-[578px]:w-auto max-[578px]:h-[400px] max-[578px]:my-auto max-[578px]:mx-[16px]">
      <h2 className="mb-[16px]">{title}</h2>
      {isLoading ? (
        <Loading size={25} />
      ) : (
        <>
          <div
            className="whitespace-break-spaces mb-[16px] overflow-scroll [scrollbar-width:none] py-[16px] px-[8px] bg-[#efefef] rounded-[8px] [&_p]:text-[16px] [&_p]:leading-[25px] max-[578px]:[&_p]:text-[14px]"
            dangerouslySetInnerHTML={{
              __html: sanitize(data!.data.data.help_text),
            }}
          ></div>
          <button onClick={handleCloseInfo} className="bg-[var(--button-bg)] border-0 leading-[35px] h-[35px] text-white font-semibold text-[14px] cursor-pointer rounded-[8px] -mb-[40px] px-[40px] py-0 relative text-center w-[200px] shadow-[0_3px_10px_rgba(0,0,0,0.1)] focus:outline-none focus:shadow-none active:outline-none active:shadow-none">حله</button>
        </>
      )}
    </div>
  );
};

export default ClubInfo;
