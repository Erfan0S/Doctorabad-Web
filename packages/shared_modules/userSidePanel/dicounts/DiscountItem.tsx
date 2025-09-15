import { DiscountPlan } from "@repo/core/types/user";
import styles from "./Discounts.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { OrderType } from "@repo/core/types/cart";
import { AddToCartButton } from "../../common/components";

type Props = {
  data: DiscountPlan;
};

export const DiscountItem = ({ data }: Props) => {
  return (
    <div className={styles.discountItemWrapper}>
      <h3>{data?.title}</h3>
      <p>{data?.description}</p>
      <div>
        <span>{priceFormatter(data?.off_price || 0)} تومن</span>
        <span>{priceFormatter(data?.main_price || 0)} تومن</span>
      </div>
      <div className={styles.discountItemBtnWrapper}>
        <AddToCartButton
          id={data.id}
          type={OrderType.DiscountPlan}
          isColumn
          className={styles.DiscountItemBtn}
        />
      </div>
    </div>
  );
};
