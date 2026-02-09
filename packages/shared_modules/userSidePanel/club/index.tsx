import React, { useState } from "react";
import {
  SidePanelClubTab,
  SidePanelPageProps,
} from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";
import Image from "next/image";
import style from "./SidePanelClub.module.scss";
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
        <div className={style.sidePanelClub} id="clubListContainer">
          <div className={style.sidePanelClubHeader}>
            <div className={style.sidePanelClubHeaderImage}>
              <Image
                src={data?.data.data.club_state_pic_url || placeHolderDataUrl}
                alt="clubImage"
                width={90}
                height={90}
              />
            </div>
            <div className={style.sidePanelClubHeaderContent}>
              <span>{userCoinPoints?.data.data.point_sum} امتیاز</span>
              <span>
                {userCoinPoints?.data.data.coin_sum}
                <Image src={CoinIcon} alt="coin" width={20} height={20} />
              </span>
            </div>
          </div>
          <UserSidePanelTabsController
            tabData={clubTabsData}
            className={style.sidePanelClubContent}
          />
        </div>
      ) : (
        <Loading size={25} pageLoader />
      )}
    </>
  );
};

export default SidePanelClub;
