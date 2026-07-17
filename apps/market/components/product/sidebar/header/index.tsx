"use client";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { useToggleFavoriteProduct } from "@/hooks/useToggleFavoriteProduct";
import { api } from "@/api/Api";
import BugIcon from "@/assets/svg/newIcons/bug";
import ShareIcon from "@/assets/svg/newIcons/share";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useShareProduct } from "@repo/core/hooks/useShareProduct";
import Loading from "@/components/common/loading";
import { Apps } from "@repo/core/types/general";
import { FavoriteHeartIcon } from "@repo/shared_modules/components";

// 35px square orange-bordered icon buttons
const ICON_SPAN =
  "ms-1 flex h-[35px] w-[35px] flex-[0_0_35px] cursor-pointer items-center justify-center rounded-lg border-2 border-solid border-orange transition duration-150 hover:bg-orange hover:text-white [&_svg]:transition [&_svg]:duration-150 hover:[&_svg]:!text-white";
// sample-file button stretches to fill the remaining row width
const SAMPLE_SPAN =
  "ms-1 flex h-[35px] flex-1 cursor-pointer items-center justify-center rounded-lg border-2 border-solid border-orange transition duration-150 hover:bg-orange [&_a]:text-center [&_a]:transition [&_a]:duration-150 hover:[&_a]:!text-white [@media(max-width:400px)]:[&_a]:text-[length:small]";

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

  const { isLoading: shareLoading, shareProduct } = useShareProduct(
    async () => {
      const res = await api.shareProduct(id);
      return {
        title: res.data.data.title,
        description: res.data.data.description,
        url: res.data.data.product_url,
      };
    }
  );

  const onShareProduct = async () => {
    shareProduct();
  };

  const toggleBugModal = () =>
    authorizeClientAction(() =>
      modalActions.addModal(ModalTypes.BUG_REPORT, {
        productId: id,
        app: Apps.MARKET,
      })
    );

  return (
    <div className="mb-5 flex items-center justify-end">
      {/* <Link href="#">دانلود نمونه صفحات</Link> */}
      {sampleUrl && (
        <span className={SAMPLE_SPAN}>
          <a href={sampleUrl} target="_blank">
            دانلود فایل نمونه
          </a>
        </span>
      )}
      <span className={ICON_SPAN} onClick={toggleBugModal()}>
        <BugIcon />
      </span>
      <span className={ICON_SPAN} onClick={onShareProduct}>
        {shareLoading ? <Loading /> : <ShareIcon />}
      </span>
      <span className={ICON_SPAN} onClick={() => toggleFavorite(id)}>
        <FavoriteHeartIcon
          loading={isLoading}
          isFavorite={isFavorite}
          app={Apps.MARKET}
        />
      </span>
    </div>
  );
};

export default ProductSidebarHeader;
