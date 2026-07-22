import Image from "next/image";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import {
  ListProductSnappayNotif,
  ProductPrice,
} from "@repo/shared_modules/components";
import { ProductListItemProps } from "@repo/core/types/props";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { CoinIcon } from "../../../../assets";

const MobileProductListItem = ({
  baseUrl,
  id,
  title,
  pic_url,
  attributes,
  installmentPayment = false,
  lang = null,
  providerTitle,
  price_main,
  price_off,
  app,
  imageType = "auto",
  haveStock = true,
}: ProductListItemProps) => {
  const imageClassName = () => {
    switch (imageType) {
      case "landscape":
        return "aspect-[16/9] h-[60px]";
      case "portrait":
        return "aspect-[3/4]";
      case "square":
        return "aspect-[1/1]";
      default:
        return undefined;
    }
  };

  return (
    <div
      className={`relative mb-4 flex items-center justify-between gap-4 rounded-2xl bg-white p-2 shadow-[0_2px_4px_rgba(0,0,0,0.1)] ${app}`}
    >
      {installmentPayment && (
        <ListProductSnappayNotif className="bottom-[7.5px] end-[7.5px] text-[9px]" />
      )}
      <Image
        src={pic_url || placeHolderDataUrl}
        alt={title}
        width={0}
        height={0}
        sizes="100vh"
        className={`h-[100px] w-auto rounded-lg object-cover shadow-[-1px_4px_10px_0px_rgba(0,0,0,0.36)] ${imageClassName()}`}
        placeholder={placeHolderDataUrl}
      />

      <div className="flex h-full min-h-[100px] flex-1 flex-col justify-between">
        <h3 className="mb-0 pe-[20px] text-sm font-semibold text-[#333]">
          {title}
        </h3>
        {providerTitle && (
          <span className="mb-2 text-[12px] font-medium text-[#666]">
            {providerTitle}
          </span>
        )}
        {!!attributes?.length && (
          <div className="grid w-[80%] grid-cols-[repeat(2,minmax(80px,1fr))] items-center text-sm text-[#666] max-md:text-[0.75rem] max-[425px]:text-[0.6rem]">
            <div className="flex min-w-0 items-center gap-1 py-[3px] text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
              {attributes && attributes[0] && attributes[0].value ? (
                <>
                  {attributes[0].icon}
                  <span>{attributes[0].value}</span>
                </>
              ) : (
                <span className="invisible inline-block h-4 w-full" />
              )}
            </div>

            <div className="flex min-w-0 items-center gap-1 py-[3px] text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
              {attributes && attributes[1] && attributes[1].value ? (
                <>
                  {attributes[1].icon}
                  <span>{attributes[1].value}</span>
                </>
              ) : (
                <span className="invisible inline-block h-4 w-full" />
              )}
            </div>

            <div className="flex min-w-0 items-center gap-1 py-[3px] text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
              {attributes && attributes[2] && attributes[2].value ? (
                <>
                  {attributes[2].icon}
                  <span>{attributes[2].value}</span>
                </>
              ) : (
                <span className="invisible inline-block h-4 w-full" />
              )}
            </div>

            <div className="flex min-w-0 items-center gap-1 py-[3px] text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
              {attributes && attributes[3] && attributes[3].value ? (
                <>
                  {attributes[3].icon}
                  <span>{attributes[3].value}</span>
                </>
              ) : (
                <span className="invisible inline-block h-4 w-full" />
              )}
            </div>
          </div>
        )}
        {price_main && haveStock && (
          <div className="flex flex-row items-center gap-[5px] [&>svg]:text-[#8b8b8b]">
            <CoinIcon />
            <div className="w-fit">
              <ProductPrice
                mainPrice={price_main ?? 0}
                offPrice={price_off}
                app={app}
                className="[&>div]:justify-start"
                size={15}
              />
            </div>
          </div>
        )}
      </div>
      {!!lang ? (
        <div className="absolute end-2 top-2 w-[20px] rounded-[5px] bg-[#c2c2c2] px-0 py-[2px] text-center text-white">
          {lang}
        </div>
      ) : null}
    </div>
  );
};

export default MobileProductListItem;
