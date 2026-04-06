"use client";
import style from "./courseHeader.module.scss";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { useShareProduct } from "@repo/core/hooks/useShareProduct";
import { Apps } from "@repo/core/types/general";
import { FavoriteHeartIcon, Loading } from "@repo/shared_modules/components";
import { BugIcon, ShareIcon } from "../../assets";
import { useToggleFavoriteProduct } from "@repo/core/hooks/useToggleFavoriteProduct";
import { ShareProductAction } from "@repo/core/types/product";

interface Button {
  icon: React.ReactNode;
  onClick: () => void;
}

type Props = {
  id: number;
  initialFavorite: boolean;
  app: Apps;
  shareAction: ShareProductAction;
  favoriteAction: (isFavorite: boolean) => Promise<any>;
};

const MobileHeaderBaseSiffix = ({
  id,
  app,
  initialFavorite,
  shareAction,
  favoriteAction,
}: Props) => {
  const {
    isFavorite,
    toggleFavorite,
    isLoading: favoriteLoading,
  } = useToggleFavoriteProduct({
    initialState: initialFavorite,
    action: favoriteAction,
  });

  const { shareProduct, isLoading: shareLoading } = useShareProduct(
    async () => {
      const res = await shareAction();

      return {
        title: res.title,
        description: res.description,
        url: res.url,
      };
    },
  );

  const onShareProduct = async () => {
    if (shareLoading) return;
    shareProduct();
  };

  const favoriteOnClick = () => {
    toggleFavorite(id);
  };

  const buttons: Button[] = [
    {
      icon: (
        <FavoriteHeartIcon
          isFavorite={isFavorite}
          loading={favoriteLoading}
          app={app}
        />
      ),
      onClick: favoriteOnClick,
    },
    {
      icon: shareLoading ? <Loading size={24} app={app} /> : <ShareIcon />,
      onClick: onShareProduct,
    },
    {
      icon: <BugIcon />,
      onClick: () =>
        modalActions.addModal(ModalTypes.BUG_REPORT, {
          productId: id,
          app: app,
        }),
    },
  ];
  return (
    <>
      {buttons.map((button, i) => (
        <button className={style.headerButton} onClick={button.onClick} key={i}>
          {button.icon}
        </button>
      ))}
    </>
  );
};

export default MobileHeaderBaseSiffix;
