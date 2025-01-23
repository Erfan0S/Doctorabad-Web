"use client";

import coin from "@/assets/img/coin.png";

import Image from "next/image";
import { modalActions } from "@/states/modals";
import { ModalTypes } from "@/types/modals";
import style from "./MobileHeader.module.scss";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { authorizeClientAction, isUserLoggedIn } from "@repo/core/utils";
import { SidePanelPage } from "@repo/core/types";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { useClientComponentInitiated } from "@/hooks/useClientComponentInitiated";
import Logo from "../logo";
import HomeIcon from "@/assets/svg/newIcons/home";
import ChatIcon from "@/assets/svg/newIcons/chat";
import QrScannerIcon from "@/assets/svg/newIcons/qrScanner";

const MobileHeader = () => {
  const shouldRender = useClientComponentInitiated();
  const isMobile = useMediaQuery("max-width:768px");

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

  const openSideMenu = (menu: SidePanelPage) =>
    authorizeClientAction(() =>
      modalActions.addModal(ModalTypes.SIDE_PANEL, { initialPage: menu })
    );

  if (!isMobile || !shouldRender) return;
  return (
    <div className={style.mobileHeader}>
      <Logo />
      <div className={style.buttons}>
        <button onClick={openSideMenu(SidePanelPage.MAIN)}>
          <HomeIcon />
          {isSuccess && data.data.data.counter > 0 && (
            <span className={style.buttonsBadge}>{data.data.data.counter}</span>
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
          <span>
            {isClubInfoSuccess ? clubInfo?.data?.data?.user_coin : ""}
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;
