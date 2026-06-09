import {SidePanelPageProps} from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";
import style from "./SidePanelFriends.module.scss";
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
      <div className={style.sidePanelFriends}>
        <h3>{title}</h3>
        <p>{description}</p>
        <h4>{introduction_code}</h4>
        <div className={style.sidePanelFriendsMessage}>
          <textarea>{inviteText}</textarea>
          <button onClick={() => copyText(inviteText, "دعوتنامه کپی شد")}>
            اشتراک گذاری
          </button>
        </div>
      </div>
    </>
  );
};

export default SidePanelFriends;
