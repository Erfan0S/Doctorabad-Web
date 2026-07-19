"use client";

import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
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
import PlansIcon from "../../../assets/svg/plans";
import ProTag from "../proTag";
import { useRouter } from "next/navigation";
import { cartActions, useCart } from "@repo/core/states/cart";
import { useEffect } from "react";
import { SidePanelPage } from "@repo/core/types/sidePanel";
import getCurrentAppName from "@repo/core/utils/getCurrentAppName";
import getCheckoutUrl from "@repo/core/utils/getCheckoutUrl";
import { isServerSide } from "@repo/core/constants/constants";
import { baseUrls, routePath } from "@repo/core/constants/routePath";
import DrClubIcon from "../../../assets/svg/drClub";
import HeadphoneIcon from "../../../assets/svg/headphone";

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

  const { data: activePlanData, isSuccess: isActivePlanSuccess } = useQuery({
    queryFn: () => api.getDrProActivePlan(),
    queryKey: ["active_plan"],
    enabled: !!isUserLoggedIn(),
    retry: 1,
  });
  const { data: userCoinPoints, isLoading: userCoinPointsLoading } = useQuery({
    queryFn: api.getUserCoinPoints,
    queryKey: ["user_coin_points"],
    enabled: !!isUserLoggedIn(),

    retry: 1,
  });

  const isPro =
    isActivePlanSuccess && (activePlanData?.data?.data?.left_days ?? 0) > 0;

  // const { data: clubInfo, isSuccess: isClubInfoSuccess } = useQuery({
  //   queryFn: api.getUserClubInfo,
  //   queryKey: ["user_club_info"],
  //   enabled: !!isUserLoggedIn(),
  //   retry: 1,
  // });

  const openSideMenu = (menu: SidePanelPage) =>
    authorizeClientAction(() =>
      modalActions.addModal(ModalTypes.SIDE_PANEL, { initialPage: menu }),
    );

  useEffect(() => {
    cartActions.getCartData();
  }, []);

  return (
    <div
      className={`flex w-full flex-row-reverse items-center justify-between py-[5px] ${type}`}
    >
      <div className="order-1 flex items-center gap-[8px]">
        <Logo />
        <ProTag active={isPro} />
      </div>
      <div className="order-2 flex [&_button]:relative [&_button]:mb-[8px] [&_button]:me-[8px] [&_button]:flex [&_button]:h-[32px] [&_button]:min-w-[32px] [&_button]:cursor-pointer [&_button]:items-center [&_button]:justify-center [&_button]:rounded-[8px] [&_button]:border-2 [&_button]:border-solid [&_button]:border-gray [&_button]:bg-white [&_button]:px-[4.8px] [&_button_svg]:h-[20px] [&_button_svg]:w-[20px] [&_button_img]:h-[20px] [&_button_img]:w-[20px] [&_button_span]:ms-[8px] [&_button_span]:font-semibold [&_button_span]:text-gray max-[375px]:[&_button]:h-[25px] max-[375px]:[&_button]:min-w-[25px] max-[375px]:[&_button]:me-[4px] max-[375px]:[&_button_svg]:h-[18px] max-[375px]:[&_button_svg]:w-[18px] max-[375px]:[&_button_img]:h-[18px] max-[375px]:[&_button_img]:w-[18px]">
        <button onClick={openSideMenu(SidePanelPage.MAIN)}>
          <HomeIcon />
          {isSuccess && data.data.data.counter > 0 && (
            <span className="absolute -start-[20px] -top-[6px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-red !text-white">
              {data.data.data.counter}
            </span>
          )}
        </button>
        {/* <button
          onClick={authorizeClientAction(() =>
            modalActions.addModal(ModalTypes.QR_CONTENTS),
          )}
        >
          <QrScannerIcon />
        </button> */}
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
        {/* <button onClick={openSideMenu(SidePanelPage.CLUB)}>
          <Image src={coin} alt="coin" width={25} height={25} />
          <span>
            {isClubInfoSuccess ? clubInfo?.data?.data?.user_coin : ""}
          </span>
        </button> */}
        <button
          onClick={authorizeClientAction(() => {
            if (!isServerSide) {
              window.open(getCheckoutUrl(true), "_self");
            }
          })}
        >
          <CartIcon />
          {cart.count > 0 && (
            <span className="absolute -end-[7px] -top-[7px] min-w-[20px] rounded-full border border-solid border-white bg-[#ff0000] p-[2px] pt-[4px] text-center text-[length:smaller] leading-[12px] !text-white">
              {cart.count}
            </span>
          )}
        </button>
        <button onClick={openSideMenu(SidePanelPage.CLUB)}>
          <DrClubIcon />
          <div className="text-[0.9rem] font-bold text-green-base">
            {userCoinPoints?.data.data.coin_sum}
          </div>
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;
