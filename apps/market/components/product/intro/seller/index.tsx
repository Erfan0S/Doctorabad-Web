import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { SingleProduct } from "@repo/core/types/product";
import { generateSingleProviderUrlFromId } from "@repo/core/utils/UrlUtils";
import Image from "next/image";
import Link from "next/link";

// seller name is a Link when it has an id, a span otherwise - same look
const NAME_CLASS = "text-[15px] font-medium leading-[18px] text-orange";

interface Props {
  seller: SingleProduct["provider"];
}
const ProductSeller: React.FC<Props> = ({ seller }) => {
  const { pic_url, id, name } = seller;

  return (
    <div className="mb-4 flex items-center">
      <div className="relative me-3 aspect-video w-20 rounded-lg border-2 border-solid border-orange [&_img]:h-full [&_img]:w-full [&_img]:rounded-lg">
        <Image fill src={pic_url || placeHolderDataUrl} alt="sellerImage" />
      </div>
      <div className="flex flex-col">
        {name ? (
          <>
            <small className="leading-3 text-gray">فروشنده:</small>
            {id ? (
              <Link
                className={NAME_CLASS}
                href={generateSingleProviderUrlFromId(id)}
              >
                {name}
              </Link>
            ) : (
              <span className={NAME_CLASS}>{name}</span>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProductSeller;
