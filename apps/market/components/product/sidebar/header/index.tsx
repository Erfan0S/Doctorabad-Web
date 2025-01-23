"use client";
import style from "./ProductSidebarHeader.module.scss";
import { modalActions } from "@/states/modals";
import { ModalTypes } from "@/types/modals";
import FavoriteIcon from "@/components/common/favoriteIcon";
import { useToggleFavoriteProduct } from "@/hooks/useToggleFavoriteProduct";
import { api } from "@/api/Api";
import { copyText } from "@repo/core/utils";
import BugIcon from "@/assets/svg/newIcons/bug";
import ShareIcon from "@/assets/svg/newIcons/share";
import { FavoriteColors } from "@/components/marketHome/intro/orderInformation/enum";
import { authorizeClientAction } from "@repo/core/utils";

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

  const shareProduct = async () => {
    const res = await api.shareProduct(id);
    const url = res.data.data.product_url || window.location.toString();

    copyText(
      `${res.data.data.description} \n ${url}`,
      "متن اشتراک گذاری کپی شد"
    );
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
      <span onClick={shareProduct}>
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
