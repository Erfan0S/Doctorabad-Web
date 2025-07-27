"use client";
import style from "./ProductSidebarHeader.module.scss";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import FavoriteIcon from "@/components/common/favoriteIcon";
import { useToggleFavoriteProduct } from "@/hooks/useToggleFavoriteProduct";
import { api } from "@/api/Api";
import BugIcon from "@/assets/svg/newIcons/bug";
import ShareIcon from "@/assets/svg/newIcons/share";
import { FavoriteColors } from "@/components/marketHome/intro/orderInformation/enum";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { shareProduct } from "@repo/core/utils/shareProduct";

interface Props {
  id: number;
  isFavorite: boolean;
  sampleUrl: string | null;
}

const ProductSidebarHeader = ({
  isFavorite: initialFavoriteState,
  id,
  sampleUrl,
}: Props) => {
  const { isFavorite, isLoading, toggleFavorite } =
    useToggleFavoriteProduct(initialFavoriteState);

  const onShareProduct = async () => {
    shareProduct(async () => {
      const res = await api.shareProduct(id);
      return {
        title: res.data.data.title,
        description: res.data.data.description,
        url: res.data.data.product_url,
      };
    });
  };

  const toggleBugModal = () =>
    authorizeClientAction(() =>
      modalActions.addModal(ModalTypes.BUG_REPORT, { productId: id })
    );

  return (
    <div className={style.productSidebarHeader}>
      {/* <Link href="#">دانلود نمونه صفحات</Link> */}
      {sampleUrl && (
        <span className={style.productSidebarHeaderSampleButton}>
          <a href={sampleUrl} target="_blank">
            دانلود فایل نمونه
          </a>
        </span>
      )}
      <span onClick={toggleBugModal()}>
        <BugIcon />
      </span>
      <span onClick={onShareProduct}>
        <ShareIcon />
      </span>
      <span onClick={() => toggleFavorite(id)}>
        <FavoriteIcon
          loading={isLoading}
          isFavorite={isFavorite}
          color={FavoriteColors.ORANGE}
        />
      </span>
    </div>
  );
};

export default ProductSidebarHeader;
