import React, { useState } from "react";
import {
  SidePanelClubTab,
  SidePanelPageProps,
} from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";
import Image from "next/image";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import SidePanelClubSingle from "./singleShow";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Api";
import { Loading } from "@repo/shared_modules/components";
import { ClubOffer } from "../types/doctorClub";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import InfoIcon from "../../assets/svg/info";
// @ts-ignore
import CoinIcon from "../../assets/img/coin.png";
import UserSidePanelTabsController from "../common/tabsController";
import { TabDataType } from "../types/general";
import Missions from "./missions";
import SidePanelClubDiscounts from "./discounts";
import SidePanelClubRanking from "./ranking";
import SidePanelClubHistory from "./history";

const SidePanelClub: React.FC<SidePanelPageProps> = ({ setPage }) => {
  const { data, isLoading } = useQuery({
    queryFn: api.getUserClubInfo,
    queryKey: ["user_club_info"],
    retry: 1,
  });

  const { data: userCoinPoints, isLoading: userCoinPointsLoading } = useQuery({
    queryFn: api.getUserCoinPoints,
    queryKey: ["user_coin_points"],
    retry: 1,
  });

  const [singleOffer, setSingleOfferInfo] = useState<ClubOffer | null>(null);
  const handleClubInfo = () => {
    modalActions.addModal(ModalTypes.CLUB_INFO);
  };

  if (singleOffer) {
    return (
      <SidePanelClubSingle
        offer={singleOffer}
        onBack={() => setSingleOfferInfo(null)}
      />
    );
  }

  const clubTabsData: TabDataType = {
    [SidePanelClubTab.MISSIONS]: {
      title: "ماموریت‌های من",
      content: <Missions />,
    },
    [SidePanelClubTab.SUGGESTIONS]: {
      title: "پیشنهاد‌های من",
      content: (
        <SidePanelClubDiscounts setSingleOfferInfo={setSingleOfferInfo} />
      ),
    },
    [SidePanelClubTab.RANK]: {
      title: "رتبه‌من",
      content: <SidePanelClubRanking />,
    },
    [SidePanelClubTab.HISTORY]: {
      title: "تاریخچه‌من",
      content: <SidePanelClubHistory />,
    },
  };

  return (
    <>
      <SidePanelHeader
        setPage={setPage}
        title="دکترکلاب"
        suffix={
          <button onClick={handleClubInfo}>
            <InfoIcon />
          </button>
        }
      />
      {!isLoading && !userCoinPointsLoading ? (
        <div className="!max-h-[calc(100%-62px)] !flex-[0_0_calc(100%-62px)] overflow-y-auto overflow-x-hidden bg-header-bg" id="clubListContainer">
          <div className="relative flex items-center bg-white px-3 py-4 before:absolute before:inset-x-0 before:top-0 before:z-[1] before:h-1/2 before:bg-green-base before:content-['']">
            <div className="relative z-[2] flex h-[90px] w-[90px] flex-[0_0_90px] items-center justify-center rounded-2xl border-2 border-solid border-white bg-white shadow-[0_5px_15px_rgba(0,0,0,0.15)] [&_img]:max-h-full [&_img]:max-w-full [&_img]:rounded-2xl">
              <Image
                src={data?.data.data.club_state_pic_url || placeHolderDataUrl}
                alt="clubImage"
                width={90}
                height={90}
              />
            </div>
            <div className="relative z-[2] flex flex-[0_0_calc(100%-90px)] flex-col ps-3 [&_span]:leading-[30px] [&_span:first-of-type]:mb-1 [&_span:first-of-type]:text-xl [&_span:first-of-type]:font-extrabold [&_span:first-of-type]:text-white [&_span:last-of-type]:text-lg [&_span:last-of-type]:font-bold [&_span:last-of-type]:text-green-base">
              <span>{userCoinPoints?.data.data.point_sum} امتیاز</span>
              <span>
                {userCoinPoints?.data.data.coin_sum}
                <Image src={CoinIcon} alt="coin" width={20} height={20} />
              </span>
            </div>
          </div>
          <UserSidePanelTabsController
            tabData={clubTabsData}
            className="!max-h-[calc(100%-122px)] !flex-[0_0_calc(100%-122px)] [&>div]:p-0"
          />
        </div>
      ) : (
        <Loading size={25} pageLoader />
      )}
    </>
  );
};

export default SidePanelClub;
