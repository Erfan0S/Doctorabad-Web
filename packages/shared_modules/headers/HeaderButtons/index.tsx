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

type Props = {
  variant?: "header" | "sidebar";
};

const buttonClass =
  "relative flex h-8 min-w-[32px] cursor-pointer items-center justify-center rounded-lg border-2 border-solid border-[#AFAFAF] bg-white px-[4.8px] py-0 max-[375px]:h-[25px] max-[375px]:min-w-[25px] max-[375px]:ms-1 [&_img]:h-5 [&_img]:w-5 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:text-[#141F23] max-[375px]:[&_img]:h-[18px] max-[375px]:[&_img]:w-[18px] max-[375px]:[&_svg]:h-[18px] max-[375px]:[&_svg]:w-[18px]";

const badgeClass =
  "absolute -top-[6px] start-[10px] z-10 flex h-5 w-5 items-center justify-center rounded-full border border-solid border-white bg-[#ff0307] text-[10px] font-semibold text-white shadow-[0_0_3px_rgba(0,0,0,0.9)]";

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
    <div
      className={`flex gap-2 ${
        variant === "sidebar"
          ? "order-[initial] flex-wrap justify-center"
          : "order-2 justify-start"
      }`}
    >
      <button onClick={openSideMenu(SidePanelPage.MAIN)} className={buttonClass}>
        <HomeIcon />
        {isSuccess && data.data.data.counter > 0 && (
          <span className={badgeClass}>{data.data.data.counter}</span>
        )}
      </button>
      <button
        onClick={() =>
          modalActions.addModal(ModalTypes.SIDE_PANEL, {
            initialPage: SidePanelPage.SUPPORT,
            data: { fromHome: true },
          })
        }
        className={buttonClass}
      >
        <HeadphoneIcon />
      </button>
      <button
        onClick={authorizeClientAction(() => {
          if (!isServerSide) {
            window.open(getCheckoutUrl(true), "_self");
          }
        })}
        className={buttonClass}
      >
        <CartIcon />
        {cart.count > 0 && (
          <span className={badgeClass}>{cart.count}</span>
        )}
      </button>
      <button
        onClick={openSideMenu(SidePanelPage.CLUB)}
        className={`${buttonClass} ${variant === "sidebar" ? "w-[90px]" : ""}`}
      >
        <DrClubIcon />
        <div className="text-[0.9rem] font-bold text-green-base">
          {userCoinPoints?.data.data.coin_sum}
        </div>
      </button>
    </div>
  );
}

export default HeaderButtons;
