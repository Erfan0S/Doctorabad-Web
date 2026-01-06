import React, { useState } from "react";
import {
  SidePanelClubTab,
  SidePanelPageProps,
} from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";
import Image from "next/image";
import { clubTabsData } from "./tabs-data";
import SidePanelClubHistory from "./history";
import SidePanelClubDiscounts from "./discounts";
import style from "./SidePanelClub.module.scss";
import sidePanelStyle from "../sidePanel.module.scss";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import SidePanelClubSingle from "./singleShow";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Api";
import { Loading } from "@repo/shared_modules/components";
import { ClubOffer } from "../types/doctorClub";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import InfoIcon from "../../assets/svg/info";
import Missions from "./missions";
import SidePanelClubRanking from "./ranking";
// @ts-ignore
import CoinIcon from "../../assets/img/coin.png";

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

  const [currentTab, setCurrentTab] = useState(SidePanelClubTab.MISSIONS);
  const [tabData, setTabData] = useState(clubTabsData);

  const [singleOffer, setSingleOfferInfo] = useState<ClubOffer | null>(null);

  const onChangeTab = (content: SidePanelClubTab) => {
    setTabData((prev) =>
      prev.map((item) => ({ ...item, active: item.content === content }))
    );
    setCurrentTab(content);
  };

  const clubTabsComponents = {
    [SidePanelClubTab.MISSIONS]: Missions,
    [SidePanelClubTab.HISTORY]: SidePanelClubHistory,
    [SidePanelClubTab.RANK]: SidePanelClubRanking,
    [SidePanelClubTab.SUGGESTIONS]: SidePanelClubDiscounts,
  };

  const CurrentTabComponent = clubTabsComponents[currentTab];
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

  console.log(userCoinPoints);

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
                {userCoinPoints?.data.data.coin_sum}{" "}
                <Image src={CoinIcon} alt="coin" width={20} height={20} />
              </span>
            </div>
          </div>
          <div className={sidePanelStyle.sidePanelTabs}>
            <ul>
              {tabData.map(({ id, title, active, content }) => (
                <li
                  key={id}
                  className={active ? sidePanelStyle.active : ""}
                  onClick={() => onChangeTab(content)}
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>
          <div className={sidePanelStyle.sidePanelTabContents}>
            <CurrentTabComponent setSingleOfferInfo={setSingleOfferInfo} />
          </div>
        </div>
      ) : (
        <Loading size={25} pageLoader />
      )}
    </>
  );
};

export default SidePanelClub;
