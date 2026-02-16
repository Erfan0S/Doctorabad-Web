import Image from "next/image";
import styles from "./MobileProductList.module.scss";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { ListProductSnappayNotif } from "@repo/shared_modules/components";
import { ProductListItemProps } from "@repo/core/types/props";

const MobileProductListItem = ({
  baseUrl,
  id,
  title,
  pic_url,
  attributes,
  installmentPayment = false,
  lang = null,
  providerTitle,
}: ProductListItemProps) => {
  return (
    <div className={styles.courseCard}>
      {installmentPayment && (
        <ListProductSnappayNotif className={styles.installmentPayment} />
      )}
      {pic_url ? (
        <Image
          src={pic_url || placeHolderDataUrl}
          alt={title}
          width={115}
          height={65}
          className={styles.courseImage}
          placeholder={placeHolderDataUrl}
        />
      ) : (
        <div className={styles.courseImage} />
      )}
      <div className={styles.courseInfo}>
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
      </div>
      {!!lang ? <div className={styles.courseLanguageTag}>{lang}</div> : null}
    </div>
  );
};

export default MobileProductListItem;
