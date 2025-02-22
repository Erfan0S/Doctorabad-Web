import Image from "next/image";
import style from "./SidePanelMessagesDetail.module.scss";
import { modalActions } from "@repo/core/modal/modals";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import Loading from "../../loading";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
type Props = {
  id: number;
};

const MessagesDetail: React.FC<Props> = ({ id }: Props) => {
  const { data, isLoading } = useQuery({
    queryFn: () => api.getSingleMessage(id).then((res) => res.data.data),
    queryKey: ["message_detail", id],
    retry: 1,
  });

  const handleCloseGetCode = () => {
    modalActions.removeLastModal();
  };
  return (
    <div className={style.sidePanelMessagesDetial}>
      {isLoading ? (
        <Loading size={15} />
      ) : (
        <>
          <div className={style.sidePanelMessagesDetialImage}>
            <Image
              src={data?.pic_url || placeHolderDataUrl}
              width={100}
              height={100}
              alt="OrdersImage"
            />
          </div>
          <div className={style.sidePanelMessagesDetialTitle}>
            <span>{data?.title}</span>
          </div>
          <div className={style.sidePanelMessagesDetialContent}>
            <p
              dangerouslySetInnerHTML={{ __html: data!.body }}
              style={{ whiteSpace: "pre-wrap" }}
            ></p>
          </div>
          <div className={style.sidePanelMessagesDetialDate}>
            <span>{toFullPersianDateString(data!.created_at)}</span>
          </div>
          <button onClick={handleCloseGetCode}>حله!</button>
        </>
      )}
    </div>
  );
};

export default MessagesDetail;
