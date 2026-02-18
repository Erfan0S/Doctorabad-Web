import Image from "next/image";
import styles from "./MobileProductList.module.scss";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { ListProductSnappayNotif } from "@repo/shared_modules/components";
import { ProductListItemProps } from "@repo/core/types/props";
import { priceFormatter } from "@repo/core/utils/priceFormatter";

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
}: ProductListItemProps) => {
  return (
    <div className={`${styles.productCard} ${app && styles[app]}`}>
      {installmentPayment && (
        <ListProductSnappayNotif className={styles.installmentPayment} />
      )}
      {pic_url ? (
        <Image
          src={pic_url || placeHolderDataUrl}
          alt={title}
          width={0}
          height={0}
          sizes="100vh"
          className={styles.productImage}
          placeholder={placeHolderDataUrl}
        />
      ) : (
        <div className={styles.productImage} />
      )}
      <div className={styles.productInfo}>
        <h3 className={styles.title}>{title}</h3>
        {providerTitle && <span>{providerTitle}</span>}
        <div className={styles.metadata}>
          <div className={styles.metadataWrapper}>
            {attributes?.map(({ value, icon }) => {
              if (!value) return null;
              return (
                <div className={styles.metadataItem}>
                  {icon && icon}
                  <span>{value}</span>
                </div>
              );
            })}
          </div>
        </div>
        {price_main && (
          <div className={styles.productPrice}>
            <div className={styles.productPriceRegular}>
              {!!price_off && (
                <>
                  <span>{priceFormatter(price_main)} تومن</span>
                </>
              )}
            </div>
            <span className={styles.productPriceSale}>
              {priceFormatter(price_off || price_main)} تومن
            </span>
          </div>
        )}
      </div>
      {!!lang ? <div className={styles.productLanguageTag}>{lang}</div> : null}
    </div>
  );
};

export default MobileProductListItem;
