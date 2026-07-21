import {SidePanelPageProps} from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";
import {useQuery} from "@tanstack/react-query";
import {api} from "../../api/Api";
import {Loading} from "@repo/shared_modules/components";
import {copyText} from "@repo/core/utils/copyText";

const SidePanelFriends: React.FC<SidePanelPageProps> = ({setPage}) => {
  const {isLoading, data} = useQuery({
    queryFn: api.shareInformation,
    queryKey: ["share"],
  });

  if (isLoading) return <Loading size={22} />;

  const {description, introduction_code, invite, title} = data!.data.data;

const inviteText = invite.replace(
  /:\s*\n+/,
  `:\n${introduction_code}\n`
);

  return (
    <>
      <SidePanelHeader setPage={setPage} title="رفقای‌من" />
      <div className="p-5 text-center">
        <h3 className="mb-2 text-[20px] font-semibold">{title}</h3>
        <p className="mb-2 text-[13px] font-semibold leading-[28px]">{description}</p>
        <h4 className="mb-2 text-[28px] text-green">{introduction_code}</h4>
        <div className="h-[250px] rounded-2xl border-2 border-solid border-green p-3 pb-[34px]">
          <textarea className="block h-full w-full resize-none border-none text-[13px] font-semibold leading-[28px] focus:outline-none">{inviteText}</textarea>
          <button
            className="relative -bottom-3 h-[45px] min-w-[175px] cursor-pointer rounded-lg border-none bg-green-base px-10 text-center text-[14px] font-semibold leading-[45px] text-white shadow-[0_3px_10px_rgba(0,0,0,0.1)] focus:shadow-none focus:outline-none active:shadow-none active:outline-none"
            onClick={() => copyText(inviteText, "دعوتنامه کپی شد")}>
            اشتراک گذاری
          </button>
        </div>
      </div>
    </>
  );
};

export default SidePanelFriends;
