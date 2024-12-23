import { modalActions } from '@/states/modals';
import style from './SidePanelSingleGetCode.module.scss';
import CopyCode from '@/assets/svg/copyCode';
import { copyText } from '@/utils/copyText';
interface Props {
  title: string;
  code: string;
}
const ClubSingleGetCode: React.FC<Props> = ({ title, code }) => {
  const handleCloseGetCode = () => {
    modalActions.removeLastModal();
  };
  return (
    <div className={style.sidePanelClubSingleGetCode}>
      <h2>{title}</h2>
      <div className={style.sidePanelClubSingleGetCodeContent}>
        <span>کد تخفیف شما</span>
        <span>{code}</span>
        <button onClick={() => copyText(code, 'کد تخفیف کپی شد')}>
          <CopyCode width={13} height={13} /> کپی کردن
        </button>
      </div>
      <button onClick={handleCloseGetCode}>حله</button>
    </div>
  );
};

export default ClubSingleGetCode;
