import React from "react";
import SidePanelHeader from "../../header";
import style from "./SidePanelClubSingle.module.scss";
import Image from "next/image";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { ClubOffer, OfferType } from "../../types/doctorClub";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import Loading from "../../loading";

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
      <div className={style.sidePanelClubSingle}></div>
      <div className={style.sidePanelClubSingleHeader}>
        <div className={style.sidePanelClubSingleHeaderImage}>
          <Image
            width={75}
            height={75}
            src={pic_url || placeHolderDataUrl}
            alt="clubImage"
          />
        </div>
        <div className={style.sidePanelClubSingleHeaderContent}>
          <span>{title}</span>
          <span>{coins} سکه</span>
          <span>تاریخ انقضا: {toFullPersianDateString(expired_at)}</span>
        </div>
      </div>
      <div className={style.sidePanelClubSingleBody}>
        <p>{description}</p>
      </div>
      <div className={style.sidePanelClubSingleFooter}>
        <button onClick={() => mutate()}>
          {isPending ? <Loading size={12} /> : "دریافت"}
        </button>
      </div>
    </>
  );
};

export default SidePanelClubSingle;
