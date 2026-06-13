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
import Logo from "../../common/components/logo";
import HomeIcon from "../../assets/svg/home";
import CartIcon from "../../assets/svg/cart";
import ProTag from "../../common/components/proTag";
import { cartActions, useCart } from "@repo/core/states/cart";
import { useEffect } from "react";
import { SidePanelPage } from "@repo/core/types/sidePanel";
import getCheckoutUrl from "@repo/core/utils/getCheckoutUrl";
import { isServerSide } from "@repo/core/constants/constants";
import DrClubIcon from "../../assets/svg/drClub";
import HeadphoneIcon from "../../assets/svg/headphone";

type Props = {
  type: Apps;
  className?: string;
};

const MobileHeaderBase = ({ type, className }: Props) => {
  const cart = useCart();

  const { data, isSuccess } = useQuery({
    queryFn: api.getMessagesCount,
    queryKey: ["messages_count"],
    enabled: !!isUserLoggedIn(),
    retry: 1,
  });

  const { data: activePlanData, isSuccess: isActivePlanSuccess } = useQuery({
    queryFn: () => api.getDrProActivePlan(),
    queryKey: ["active_plan"],
    enabled: !!isUserLoggedIn(),
    retry: 1,
  });

  const { data: userCoinPoints } = useQuery({
    queryFn: api.getUserCoinPoints,
    queryKey: ["user_coin_points"],
    enabled: !!isUserLoggedIn(),
    retry: 1,
  });

  const isPro =
    isActivePlanSuccess && (activePlanData?.data?.data?.left_days ?? 0) > 0;

  const openSideMenu = (menu: SidePanelPage) =>
    authorizeClientAction(() =>
      modalActions.addModal(ModalTypes.SIDE_PANEL, { initialPage: menu }),
    );

  useEffect(() => {
    cartActions.getCartData();
  }, []);

  return (
    <div className={`${style.mobileHeader} ${style[type]} ${className ?? ""}`}>
      <div className={style.left}>
        <Logo />
        <ProTag active={isPro} />
      </div>
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
              data: { fromHome: true },
            })
          }
        >
          <HeadphoneIcon />
        </button>
        <button
          onClick={authorizeClientAction(() => {
            if (!isServerSide) {
              window.open(getCheckoutUrl(true), "_self");
            }
          })}
          className={style.cartButton}
        >
          <CartIcon />
          {cart.count > 0 && (
            <span className={style.buttonsBadge}>{cart.count}</span>
          )}
        </button>
        <button
          onClick={openSideMenu(SidePanelPage.CLUB)}
          className={style.cartButton}
        >
          <DrClubIcon />
          <div className={style.drClubPoints}>
            {userCoinPoints?.data.data.coin_sum}
          </div>
        </button>
      </div>
    </div>
  );
};

export default MobileHeaderBase;
