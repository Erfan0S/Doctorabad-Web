"use client";

import style from "../Sidebar.module.scss";
import Image from "next/image";
import coin from "../../../assets/img/coin.png";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import {
  authorizeClientAction,
  isUserLoggedIn,
} from "@repo/core/utils/authUtils";
import { useQuery } from "@tanstack/react-query";
import { api } from "@repo/shared_modules/api";
import { SidePanelPage } from "@repo/core/types/general";
import { HomeIcon, ChatIcon, QrScannerIcon } from "@repo/shared_modules/icons";

const SidebarFooter = () => {
  const { data, isSuccess } = useQuery({
    queryFn: api.getMessagesCount,
    queryKey: ["messages_count"],
    enabled: !!isUserLoggedIn(),
    retry: 1,
  });

  const { data: clubInfo, isSuccess: isClubInfoSuccess } = useQuery({
    queryFn: api.getUserClubInfo,
    queryKey: ["user_club_info"],
    enabled: !!isUserLoggedIn(),
    retry: 1,
  });

  const openSideMenu = (menu: SidePanelPage) => {
    return authorizeClientAction(() =>
      modalActions.addModal(ModalTypes.SIDE_PANEL, { initialPage: menu })
    );
  };

  return (
    <div className={style.sidebarFooter}>
      <button onClick={openSideMenu(SidePanelPage.MAIN)}>
        {/* <Image src={home} alt="home" width={20} height={20} /> */}
        <HomeIcon />
        {isSuccess && data.data.data.counter > 0 && (
          <span className={style.sidebarFooterNotification}>
            {data.data.data.counter}
          </span>
        )}
      </button>
      <button
        onClick={() =>
          modalActions.addModal(ModalTypes.SIDE_PANEL, {
            initialPage: SidePanelPage.SUPPORT,
          })
        }
      >
        <ChatIcon />
      </button>
      <button
        onClick={authorizeClientAction(() =>
          modalActions.addModal(ModalTypes.QR_CONTENTS)
        )}
      >
        <QrScannerIcon />
      </button>
      <button onClick={openSideMenu(SidePanelPage.CLUB)}>
        <Image src={coin} alt="coin" width={25} height={25} />
        <span>{isClubInfoSuccess ? clubInfo?.data?.data?.user_coin : ""}</span>
      </button>
    </div>
  );
};
export default SidebarFooter;
