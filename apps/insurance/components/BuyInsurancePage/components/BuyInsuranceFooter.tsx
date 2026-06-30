import DiscountIcon from "@/assets/svg/discount_icon";
import Loading from "@/components/common/loading";
import { AddToCartButton } from "@repo/shared_modules/components";
import { OrderType } from "@repo/core/types/cart";
import styles from "../BuyInsurancePage.module.scss";

interface BuyInsuranceFooterProps {
  insurerId: number | null;
  mainPrice: number;
  finalPrice: number;
  discountPercent: number;
  isLoading: boolean;
  onAddToCart: () => void;
}

export const BuyInsuranceFooter = ({
  insurerId,
  mainPrice,
  finalPrice,
  discountPercent,
  isLoading,
  onAddToCart,
}: BuyInsuranceFooterProps) => {
  const priceContent = (
    <div className={styles.btnContent}>
      <div className={styles.priceContainer}>
        {mainPrice > finalPrice && (
          <span className={styles.oldPrice}>
            {mainPrice.toLocaleString("fa-IR")} تومان
          </span>
        )}
        <span className={styles.newPrice}>
          {finalPrice.toLocaleString("fa-IR")} تومان
        </span>
      </div>
      <div className={styles.verticalLine}></div>
      <span className={styles.btnText}>افزودن به سبد خرید</span>
    </div>
  );

  return (
    <div className={styles.footer}>
      {discountPercent > 0 && (
        <div className={styles.discountBadge}>
          <DiscountIcon />
          <span>٪{discountPercent}</span>
        </div>
      )}

      {insurerId ? (
        <AddToCartButton
          id={insurerId}
          type={OrderType.Insurance}
          className={styles.submitBtn}
          onClick={onAddToCart}
        >
          {isLoading ? <Loading size={22} /> : priceContent}
        </AddToCartButton>
      ) : (
        <button className={styles.submitBtn} disabled>
          {priceContent}
        </button>
      )}
    </div>
  );
};
