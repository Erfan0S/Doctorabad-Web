import { api } from "../../api/Api";
import { Loading } from "@repo/shared_modules/components";
import { useQuery } from "@tanstack/react-query";
import style from "./SidePanelMessages.module.scss";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";

type Props = { id: number };

const SingleMessage = ({ id }: Props) => {
  const { isLoading, data } = useQuery({
    queryFn: () => api.getSingleMessage(id),
    queryKey: ["message", id],
  });

  if (isLoading) return <Loading size={22} />;

  return (
    <div className={style.singleMessage}>
      <h3>{data!.data.data.title}</h3>
      <span>{toFullPersianDateString(data!.data.data.created_at)}</span>
      <p dangerouslySetInnerHTML={{ __html: data!.data.data.body }}></p>
    </div>
  );
};

export default SingleMessage;
