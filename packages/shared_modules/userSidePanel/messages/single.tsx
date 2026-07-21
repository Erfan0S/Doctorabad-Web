import { api } from "../../api/Api";
import { Loading } from "@repo/shared_modules/components";
import { useQuery } from "@tanstack/react-query";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import sanitize from "@repo/core/utils/sanitize";

type Props = { id: number };

const SingleMessage = ({ id }: Props) => {
  const { isLoading, data } = useQuery({
    queryFn: () => api.getSingleMessage(id),
    queryKey: ["message", id],
  });

  if (isLoading) return <Loading size={22} />;

  return (
    <div className="p-5">
      <h3 className="mb-0.5">{data!.data.data.title}</h3>
      <span className="text-[#676767]">
        {toFullPersianDateString(data!.data.data.created_at)}
      </span>
      <p
        className="mt-5 text-[14px]"
        dangerouslySetInnerHTML={{ __html: sanitize(data!.data.data.body) }}
      ></p>
    </div>
  );
};

export default SingleMessage;
