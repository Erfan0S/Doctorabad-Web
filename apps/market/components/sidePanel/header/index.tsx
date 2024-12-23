import { SidePanelPage, SidePanelPageProps } from '@/types/sidePanel';
import backImage from '@/assets/img/back.png';
import style from './SidePanelHeader.module.scss';
import Image from 'next/image';
import BackIcon from '@/assets/svg/newIcons/back';

interface Props extends Partial<SidePanelPageProps> {
  title: string;
  suffix?: React.ReactNode;
  onBack?: () => void;
}
const SidePanelHeader: React.FC<Props> = ({ title, setPage, suffix, onBack }) => {
  return (
    <div className={style.sidePanelHeader}>
      <span>{title}</span>
      <div className={style.sidePanelHeaderSuffix}>
        <button onClick={() => (onBack ? onBack() : setPage!(SidePanelPage.MAIN))}>
          <BackIcon />
        </button>
        {suffix}
      </div>
    </div>
  );
};

export default SidePanelHeader;
