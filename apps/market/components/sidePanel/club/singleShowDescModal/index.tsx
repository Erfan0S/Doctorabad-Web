import { modalActions } from '@/states/modals';
import style from './SidePanelSingleDesc.module.scss';
import CopyCode from '@/assets/svg/copyCode';
interface Props {
  title: string;
  description: string;
}
const ClubSingleDesc: React.FC<Props> = ({ title, description }) => {
  const handleCloseDesc = () => {
    modalActions.removeLastModal();
  };
  return (
    <div className={style.sidePanelClubSingleDesc}>
      <h2>{title}</h2>
      <div className={style.sidePanelClubSingleDescContent}>
        <p>{description}</p>
      </div>
      <button onClick={handleCloseDesc}>حله</button>
    </div>
  );
};

export default ClubSingleDesc;
