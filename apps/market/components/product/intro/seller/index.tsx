import style from "./ProductSeller.module.scss";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { SingleProduct } from "@repo/core/types/product";
import { generateSingleProviderUrlFromId } from "@repo/core/utils/urlutils";
import Image from "next/image";
import Link from "next/link";
interface Props {
  seller: SingleProduct["provider"];
}
const ProductSeller: React.FC<Props> = ({ seller }) => {
  const { pic_url, id, name } = seller;

  return (
    <div className={style.productSeller}>
      <div className={style.productSellerImage}>
        <Image fill src={pic_url || placeHolderDataUrl} alt="sellerImage" />
      </div>
      <div className={style.productSellerContent}>
        <small>فروشنده:</small>
        <Link href={generateSingleProviderUrlFromId(id)}>{name}</Link>
      </div>
    </div>
  );
};

export default ProductSeller;
