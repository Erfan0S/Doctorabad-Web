import Image from "next/image";
import styles from "./MobileProductList.module.scss";
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
        return styles.productImageLandscape;
      case "portrait":
        return styles.productImagePortrait;
      case "square":
        return styles.productImageSquare;
      default:
        return styles.productImageAuto;
    }
  };

  return (
    <div className={`${styles.productCard} ${app && styles[app]}`}>
      {installmentPayment && (
        <ListProductSnappayNotif className={styles.installmentPayment} />
      )}
      <Image
        src={pic_url || placeHolderDataUrl}
        alt={title}
        width={0}
        height={0}
        sizes="100vh"
        className={`${styles.productImage} ${imageClassName()}`}
        placeholder={placeHolderDataUrl}
      />

      <div className={styles.productInfo}>
        <h3 className={styles.title}>{title}</h3>
        {providerTitle && (
          <span className={styles.providerTitle}>{providerTitle}</span>
        )}
        {!!attributes?.length && (
          <div className={styles.metadata}>
            <div className={styles.metadataItem}>
              {attributes && attributes[0] && attributes[0].value ? (
                <>
                  {attributes[0].icon}
                  <span>{attributes[0].value}</span>
                </>
              ) : (
                <span className={styles.metaEmpty} />
              )}
            </div>

            <div className={styles.metadataItem}>
              {attributes && attributes[1] && attributes[1].value ? (
                <>
                  {attributes[1].icon}
                  <span>{attributes[1].value}</span>
                </>
              ) : (
                <span className={styles.metaEmpty} />
              )}
            </div>

            <div className={styles.metadataItem}>
              {attributes && attributes[2] && attributes[2].value ? (
                <>
                  {attributes[2].icon}
                  <span>{attributes[2].value}</span>
                </>
              ) : (
                <span className={styles.metaEmpty} />
              )}
            </div>

            <div className={styles.metadataItem}>
              {attributes && attributes[3] && attributes[3].value ? (
                <>
                  {attributes[3].icon}
                  <span>{attributes[3].value}</span>
                </>
              ) : (
                <span className={styles.metaEmpty} />
              )}
            </div>
          </div>
        )}
        {price_main && haveStock && (
          <div className={styles.productPriceContainer}>
            <CoinIcon />
            <ProductPrice
              mainPrice={price_main}
              offPrice={price_off}
              app={app}
              className={styles.productPrice}
              size={15}
            />
          </div>
        )}
      </div>
      {!!lang ? <div className={styles.productLanguageTag}>{lang}</div> : null}
    </div>
  );
};

export default MobileProductListItem;
