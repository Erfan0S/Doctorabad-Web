import { SidePanelPageProps } from "../types/sidePanel";
import SidePanelHeader from "../header";
import style from "./SidePanelFriends.module.scss";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Api";
import Loading from "../../userSidePanel/loading";
import { copyText } from "@repo/core/utils";

const SidePanelFriends: React.FC<SidePanelPageProps> = ({ setPage }) => {
  const { isLoading, data } = useQuery({
    queryFn: api.shareInformation,
    queryKey: ["share"],
  });

  if (isLoading) return <Loading size={22} />;

  const { description, introduction_code, invite, title } = data!.data.data;

  return (
    <>
      <SidePanelHeader setPage={setPage} title="رفقای‌من" />
      <div className={style.sidePanelFriends}>
        <h3>{title}</h3>
        <p>{description}</p>
        <h4>{introduction_code}</h4>
        <div className={style.sidePanelFriendsMessage}>
          <textarea>{invite}</textarea>
          <button onClick={() => copyText(invite, "دعوتنامه کپی شد")}>
            اشتراک گذاری
          </button>
        </div>
      </div>
    </>
  );
};

export default SidePanelFriends;
