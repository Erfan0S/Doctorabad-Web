import { modalActions } from "@repo/core/modal/modals";
import style from "./SidePanelSingleDesc.module.scss";
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
