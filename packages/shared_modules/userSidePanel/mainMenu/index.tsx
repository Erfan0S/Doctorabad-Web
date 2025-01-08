import { SidePanelPage, SidePanelPageProps } from "../types/sidePanel";
import { sidePanelMenuData } from "./menu-data";
import Image from "next/image";
import style from "./SidePanelMainMenu.module.scss";
import footerImage from "../../assets/img/login.jpg";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Api";
import SidePanelHeader from "../header";
import Loading from "../loading";
import avatarImage from "../../assets/img/avatars/01.png";
import { priceFormatter } from "../utils/priceFormatter";
import { modalActions } from "@repo/core";

const SidePanelMainMenu: React.FC<SidePanelPageProps> = ({ setPage }) => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: api.getUser,
    staleTime: Infinity,
  });

  const { data, isSuccess } = useQuery({
    queryFn: api.getMessagesCount,
    queryKey: ["messages_count"],
    retry: 1,
  });

  if (isLoading)
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center" }}>
        <Loading size={32} />
      </div>
    );

  const userInfo = profile?.data.data;

  return (
    <div className={style.sidePanelMainMenu}>
      <SidePanelHeader
        setPage={setPage}
        title="کلبه من"
        onBack={() => modalActions.removeLastModal()}
      />
      <div
        className={style.sidePanelMainMenuHeader}
        onClick={() => setPage(SidePanelPage.PROFILE)}
      >
        <div className={style.sidePanelMainMenuHeaderImage}>
          <Image
            src={userInfo?.avatar || avatarImage}
            alt="clubImage"
            width={90}
            height={90}
          />
        </div>
        <div className={style.sidePanelMainMenuHeaderContent}>
          <span>
            {userInfo?.name || userInfo?.nickname || userInfo?.mobile}
          </span>
          <span>اعتبار من : {priceFormatter(userInfo?.credit || 0)}تومن!</span>
        </div>
      </div>
      <div className={style.sidePanelMainMenuWrapper}>
        {sidePanelMenuData.map(({ id, href, Icon, title, action }) => {
          const notifications = id === 6 &&
            isSuccess &&
            data.data.data.counter > 0 && (
              <span className={style.sidePanelMainMenuWrapperNotification}>
                {data.data.data.counter}
              </span>
            );
          return (
            <div
              key={id}
              onClick={() => (action ? action() : href && setPage(href))}
            >
              <Icon />
              <span>{title}</span>
              {notifications}
            </div>
          );
        })}
      </div>
      <div className={style.sidePanelMainMenuImage}>
        <Image src={footerImage} alt="footerImage" />
      </div>
    </div>
  );
};

export default SidePanelMainMenu;
