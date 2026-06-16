import { useEffect } from "react";
import { CartIcon, HomeIcon } from "../../assets";
import { cartActions, useCart } from "@repo/core/states/cart";
import { useQuery } from "@tanstack/react-query";
import {
  authorizeClientAction,
  isUserLoggedIn,
} from "@repo/core/utils/authUtils";
import { api } from "../../api/Api";
import { SidePanelPage } from "@repo/core/types/sidePanel";
import { ModalTypes } from "../../common/modal/modalsTypes";
import { modalActions } from "@repo/core/modal/modals";
import HeadphoneIcon from "../../assets/svg/headphone";
import { isServerSide } from "@repo/core/constants/constants";
import getCheckoutUrl from "@repo/core/utils/getCheckoutUrl";
import DrClubIcon from "../../assets/svg/drClub";
import style from "./HeaderButtons.module.scss";

type Props = {
  variant?: "header" | "sidebar";
};

function HeaderButtons({ variant = "header" }: Props) {
  const cart = useCart();

  const { data, isSuccess } = useQuery({
    queryFn: api.getMessagesCount,
    queryKey: ["messages_count"],
    enabled: !!isUserLoggedIn(),
    retry: 1,
  });

  const { data: userCoinPoints } = useQuery({
    queryFn: api.getUserCoinPoints,
    queryKey: ["user_coin_points"],
    enabled: !!isUserLoggedIn(),
    retry: 1,
  });

  const openSideMenu = (menu: SidePanelPage) =>
    authorizeClientAction(() =>
      modalActions.addModal(ModalTypes.SIDE_PANEL, { initialPage: menu }),
    );

  useEffect(() => {
    cartActions.getCartData();
  }, []);

  return (
    <div className={`${style.buttons} ${style[variant]}`}>
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
  );
}

export default HeaderButtons;
