import { modalActions } from "@repo/core/modal/modals";
import style from "./SidePanelClubInfo.module.scss";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import Loading from "../../../common/components/loading";
interface Props {
  title: string;
}
const ClubInfo: React.FC<Props> = ({ title }) => {
  const { data, isLoading } = useQuery({
    queryFn: api.getClubHelpText,
    queryKey: ["getClubHelpText"],
    retry: 1,
    staleTime: Infinity,
  });

  const handleCloseInfo = () => {
    modalActions.removeLastModal();
  };

  return (
    <div className={style.sidePanelClubInfo}>
      <h2>{title}</h2>
      {isLoading ? (
        <Loading size={25} />
      ) : (
        <>
          <div
            className={style.sidePanelClubInfoContent}
            dangerouslySetInnerHTML={{ __html: data!.data.data.help_text }}
          ></div>
          <button onClick={handleCloseInfo}>حله</button>
        </>
      )}
    </div>
  );
};

export default ClubInfo;
