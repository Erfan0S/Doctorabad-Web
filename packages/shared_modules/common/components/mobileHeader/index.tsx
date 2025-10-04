"use client";

import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import style from "./MobileHeader.module.scss";
import {
  authorizeClientAction,
  isUserLoggedIn,
} from "@repo/core/utils/authUtils";
import { Apps } from "@repo/core/types/general";
import { useQuery } from "@tanstack/react-query";
import { api } from "@repo/shared_modules/api";
import Logo from "../logo";
import HomeIcon from "../../../assets/svg/home";
import ChatIcon from "../../../assets/svg/chat";
import QrScannerIcon from "../../../assets/svg/qrScanner";
import CartIcon from "../../../assets/svg/cart";
import { useRouter } from "next/navigation";
import { cartActions, useCart } from "@repo/core/states/cart";
import { useEffect } from "react";
import { SidePanelPage } from "@repo/core/types/sidePanel";
import getCurrentAppName from "@repo/core/utils/getCurrentAppName";
import getCheckoutUrl from "@repo/core/utils/getCheckoutUrl";

type Props = {
  type: Apps;
};

const MobileHeader = ({ type }: Props) => {
  const router = useRouter();
  const cart = useCart();

  const { data, isSuccess } = useQuery({
    queryFn: api.getMessagesCount,
    queryKey: ["messages_count"],
    enabled: !!isUserLoggedIn(),
    retry: 1,
  });

  // const { data: clubInfo, isSuccess: isClubInfoSuccess } = useQuery({
  //   queryFn: api.getUserClubInfo,
  //   queryKey: ["user_club_info"],
  //   enabled: !!isUserLoggedIn(),
  //   retry: 1,
  // });

  console.log(getCurrentAppName());
  const openSideMenu = (menu: SidePanelPage) =>
    authorizeClientAction(() =>
      modalActions.addModal(ModalTypes.SIDE_PANEL, { initialPage: menu })
    );

  useEffect(() => {
    cartActions.getCartData();
  }, []);

  return (
    <div className={`${style.mobileHeader} ${style[type]}`}>
      <Logo />
      <div className={style.buttons}>
        <button onClick={openSideMenu(SidePanelPage.MAIN)}>
          <HomeIcon />
          {isSuccess && data.data.data.counter > 0 && (
            <span className={style.buttonsBadge}>{data.data.data.counter}</span>
          )}
        </button>
        <button
          onClick={authorizeClientAction(() =>
            modalActions.addModal(ModalTypes.QR_CONTENTS)
          )}
        >
          <QrScannerIcon />
        </button>
        <button
          onClick={() =>
            modalActions.addModal(ModalTypes.SIDE_PANEL, {
              initialPage: SidePanelPage.SUPPORT,
              data: { fromHome: true },
            })
          }
        >
          <ChatIcon />
        </button>
        {/* <button onClick={openSideMenu(SidePanelPage.CLUB)}>
          <Image src={coin} alt="coin" width={25} height={25} />
          <span>
            {isClubInfoSuccess ? clubInfo?.data?.data?.user_coin : ""}
          </span>
        </button> */}
        <button
          onClick={authorizeClientAction(() =>
            window.open(getCheckoutUrl(true), "_self")
          )}
          className={style.cartButton}
        >
          <CartIcon />
          {cart.count > 0 && <span>{cart.count}</span>}
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;
