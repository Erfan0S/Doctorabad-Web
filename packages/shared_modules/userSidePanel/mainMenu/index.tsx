import { SidePanelPage, SidePanelPageProps } from "@repo/core/types/sidePanel";
import { sidePanelMenuData } from "./menu-data";
import Image from "next/image";
import style from "./SidePanelMainMenu.module.scss";
// @ts-ignore
import footerImage from "../../assets/img/DA-Success.png";
import footerImageOpen from "../../assets/img/DA-Open.png";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Api";
import SidePanelHeader from "../header";
// @ts-ignore
import avatarImage from "../../assets/img/avatars/01.png";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { modalActions } from "@repo/core/modal/modals";
import { Loading } from "@repo/shared_modules/components";
import { ModalTypes } from "../../common/modal/modalsTypes";
import { useState } from "react";

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

  const [imageSrc, setImageSrc] = useState(footerImage);
  const toggleImageSrc = () => {
    if (imageSrc == footerImage) {
      setImageSrc(footerImageOpen);
    } else setImageSrc(footerImage);
  };

  if (isLoading)
    return (
      <div style= {{display: "flex", height: "100vh", alignItems: "center" }}>
        <Loading size={32} />
      </div>
    );

  const userInfo = profile?.data.data;

  return (
    <div className={style.sidePanelMainMenu}>
      <SidePanelHeader setPage={setPage} title="کلبه من" />

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
          <span>کیف‌پول‌من : {priceFormatter(userInfo?.credit || 0)}تومن!</span>
        </div>
      </div>

      {/* ناحیه‌ی اسکرول‌شونده: لیست + فوتر */}
      <div className={style.sidePanelMainMenuScroll}>
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
                onClick={() =>
                  action
                    ? action()
                    : modalActions.addModal(ModalTypes.SIDE_PANEL, {
                        initialPage: href,
                      })
                }
              >
                {/* سمت راست: آیکون + عنوان */}
                <div className={style.sidePanelMainMenuWrapperItemContent}>
                  <span className={style.sidePanelMainMenuWrapperItemIcon}>
                    <Icon />
                    {notifications}
                  </span>
                  <span className={style.sidePanelMainMenuWrapperItemTitle}>
                    {title}
                  </span>
                </div>

                {/* سمت چپ: فلش جهت */}
                <span className={style.sidePanelMainMenuWrapperItemArrow}>
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1L2 8L8 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            );
          })}
        </div>

        <div className={style.sidePanelMainMenuImage}>
          <Image onClick={toggleImageSrc} src={imageSrc} alt="footerImage" />
        </div>
      </div>
    </div>
  );
};

export default SidePanelMainMenu;