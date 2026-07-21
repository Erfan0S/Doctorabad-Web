import React from "react";
import SidePanelHeader from "../../header";
import Image from "next/image";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { ClubOffer, OfferType } from "../../types/doctorClub";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { Loading } from "@repo/shared_modules/components";

interface Props {
  offer: ClubOffer;
  onBack: () => void;
}

const SidePanelClubSingle: React.FC<Props> = ({ offer, onBack }) => {
  const {
    coins,
    description,
    expired_at,
    id,
    pic_url,
    response_description,
    title,
    type,
  } = offer;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => api.buyOffer(id),
    onSuccess: (data) => {
      queryClient.setQueryData(["user_club_info"], (oldData: any) => {
        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: {
              ...oldData.data.data,
              user_coin: oldData.data.data.user_coin - coins,
            },
          },
        };
      });
      onBack();

      if (type === OfferType.DISCOUNT) {
        modalActions.addModal(ModalTypes.CLUB_SINGLE_GET_CODE, {
          code: data.data.data.code,
        });
      } else {
        modalActions.addModal(ModalTypes.CLUB_SINGLE_SHOW_DESC, {
          description: response_description!,
        });
      }
    },
  });

  return (
    <>
      <SidePanelHeader title="دکترکلاب" onBack={onBack} />
      <div></div>
      <div className="relative flex items-center bg-white px-3 py-4 before:absolute before:inset-x-0 before:top-0 before:z-[1] before:h-[45%] before:bg-green-base before:content-['']">
        <div className="relative z-[2] flex h-[90px] w-[90px] flex-[0_0_90px] items-center justify-center rounded-2xl border-2 border-solid border-white bg-white shadow-[0_5px_15px_rgba(0,0,0,0.15)] [&_img]:max-h-full [&_img]:max-w-full [&_img]:rounded-2xl">
          <Image
            width={75}
            height={75}
            src={pic_url || placeHolderDataUrl}
            alt="clubImage"
          />
        </div>
        <div className="relative z-[2] flex flex-[0_0_calc(100%-90px)] flex-col ps-3 [&_span]:leading-5 [&_span:first-of-type]:mb-2 [&_span:first-of-type]:text-lg [&_span:first-of-type]:font-semibold [&_span:first-of-type]:text-white [&_span:nth-last-of-type(2)]:mt-[13px] [&_span:nth-last-of-type(2)]:text-lg [&_span:nth-last-of-type(2)]:font-bold [&_span:nth-last-of-type(2)]:text-green-base [&_span:last-child]:text-[#bababa]">
          <span>{title}</span>
          <span>{coins} سکه</span>
          <span>تاریخ انقضا: {toFullPersianDateString(expired_at)}</span>
        </div>
      </div>
      <div className="mx-4 mb-4 mt-1 flex h-screen items-center justify-center rounded-lg p-4 shadow-[rgba(0,0,0,0.3)_0px_2px_5px]">
        <p>{description}</p>
      </div>
      <div className="[&_button]:h-10 [&_button]:w-full [&_button]:cursor-pointer [&_button]:border-0 [&_button]:bg-green-base [&_button]:text-center [&_button]:text-base [&_button]:font-semibold [&_button]:leading-10 [&_button]:text-white">
        <button onClick={() => mutate()}>
          {isPending ? <Loading size={12} /> : "دریافت"}
        </button>
      </div>
    </>
  );
};

export default SidePanelClubSingle;
