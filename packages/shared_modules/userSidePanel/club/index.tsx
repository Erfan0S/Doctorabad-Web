import { useState } from 'react';
import { SidePanelClubTab, SidePanelPage, SidePanelPageProps } from '@/types/sidePanel';
import SidePanelHeader from '../header';
import infoImage from '@/assets/img/info.png';
import Image from 'next/image';
import { clubTabsData } from './tabs-data';
import SidePanelClubHistory from './history';
import SidePanelClubDiscounts from './discounts';
import style from './SidePanelClub.module.scss';
import sidePanelStyle from '../sidePanel.module.scss';
import { modalActions } from '@/states/modals';
import { ModalTypes } from '@/types/modals';
import SidePanelClubSingle from './singleShow';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/Api';
import Loading from '@/components/common/loading';
import { ClubOffer } from '@/types/doctorClub';
import { placeHolderDataUrl } from '@/constants/placeHolderDataUrl';
import InfoIcon from '@/assets/svg/newIcons/info';

const SidePanelClub: React.FC<SidePanelPageProps> = ({ setPage }) => {
  const { data, isLoading } = useQuery({
    queryFn: api.getUserClubInfo,
    queryKey: ['user_club_info'],
    retry: 1,
  });

  const [currentTab, setCurrentTab] = useState(SidePanelClubTab.DISCOUNTS);
  const [tabData, setTabData] = useState(clubTabsData);

  const [singleOffer, setSingleOfferInfo] = useState<ClubOffer | null>(null);

  const onChangeTab = (content: SidePanelClubTab) => {
    setTabData((prev) => prev.map((item) => ({ ...item, active: item.content === content })));
    setCurrentTab(content);
  };

  const clubTabsComponents = {
    [SidePanelClubTab.DISCOUNTS]: SidePanelClubDiscounts,
    [SidePanelClubTab.HISTORY]: SidePanelClubHistory,
  };

  const CurrentTabComponent = clubTabsComponents[currentTab];
  const handleClubInfo = () => {
    modalActions.addModal(ModalTypes.CLUB_INFO);
  };

  if (singleOffer) {
    return <SidePanelClubSingle offer={singleOffer} onBack={() => setSingleOfferInfo(null)} />;
  }

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
      {!isLoading ? (
        <div className={style.sidePanelClub} id="clubListContainer">
          <div className={style.sidePanelClubHeader}>
            <div className={style.sidePanelClubHeaderImage}>
              <Image
                src={data!.data.data.club_state_pic_url || placeHolderDataUrl}
                alt="clubImage"
                width={90}
                height={90}
              />
            </div>
            <div className={style.sidePanelClubHeaderContent}>
              <span>{data?.data.data.user_coin} سکه</span>
              <span>{data?.data.data.club_state_title}</span>
            </div>
          </div>
          <div className={sidePanelStyle.sidePanelTabs}>
            <ul>
              {tabData.map(({ id, title, active, content }) => (
                <li
                  key={id}
                  className={active ? sidePanelStyle.active : ''}
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
        <Loading size={25} />
      )}
    </>
  );
};

export default SidePanelClub;
