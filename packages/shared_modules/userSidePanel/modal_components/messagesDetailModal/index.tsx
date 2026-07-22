import Image from "next/image";
import { modalActions } from "@repo/core/modal/modals";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { Loading } from "@repo/shared_modules/components";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import sanitize from "@repo/core/utils/sanitize";
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
    <div className="bg-white w-[500px] max-h-[500px] py-[16px] px-[20px] max-w-full text-center rounded-[12px] flex flex-col items-center max-[512px]:w-[300px] max-[512px]:max-h-[400px]">
      {isLoading ? (
        <Loading size={15} />
      ) : (
        <>
          <div className="w-[100px] h-[100px] rounded-[16px] p-[2px] -mt-[60px] bg-white mb-[4px] shadow-[rgba(0,0,0,0.15)_0px_2px_8px]">
            <Image
              src={data?.pic_url || placeHolderDataUrl}
              width={100}
              height={100}
              alt="OrdersImage"
              className="w-full h-full rounded-[16px]"
            />
          </div>
          <div className="text-[18px] font-bold mb-[16px]">
            <span>{data?.title}</span>
          </div>
          <div className="overflow-scroll [direction:rtl] mb-[8px] pb-0 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar-thumb]:bg-[#b7b7b7]">
            <p
              className="text-right font-medium leading-[25px] text-[16px] mb-0"
              dangerouslySetInnerHTML={{ __html: sanitize(data!.body) }}
              style={{ whiteSpace: "pre-wrap" }}
            ></p>
          </div>
          <div className="mb-[12px] self-end">
            <span className="text-[16px] block font-normal text-[#b7b7b7] text-left">{toFullPersianDateString(data!.created_at)}</span>
          </div>
          <button onClick={handleCloseGetCode} className="bg-[var(--button-bg)] border-0 leading-[30px] text-white font-semibold text-[14px] cursor-pointer rounded-[8px] -mb-[32px] px-[40px] py-0 relative text-center w-[170px] shadow-[0_3px_10px_rgba(0,0,0,0.1)] focus:outline-none focus:shadow-none active:outline-none active:shadow-none">حله!</button>
        </>
      )}
    </div>
  );
};

export default MessagesDetail;
