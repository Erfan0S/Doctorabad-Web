import { priceFormatter } from "@repo/core/utils/priceFormatter";
import CartCheckIcon from "../../../../assets/svg/cartCheck";
import CardCheck from "../../../../assets/svg/cardCheck";
import CalenderCheck from "../../../../assets/svg/calenderCheck";
import styles from "./OrderMetaData.module.scss";
import { OrderMetaData } from "../../../types/orders";
import { formatTimeJ } from "@repo/core/utils/formatTime";

const OrderMetaData = ({ order }: { order: OrderMetaData }) => {
  return (
    <div className={styles.metadata}>
      <div className={styles.metadataWrapper}>
        <div className={styles.metadataItem}>
          <CartCheckIcon fontSize={16} />
          <span>{order.order_code}</span>
        </div>
        <div className={styles.metadataItem}>
          <CalenderCheck fontSize={16} />
          <span>{formatTimeJ(order.created_at)}</span>
        </div>
      </div>
      <div className={styles.metadataWrapper}>
        <div className={styles.metadataItem}>
          <CardCheck fontSize={16} />
          <div className={styles.coursePrice}>
            <span
              style={{
                textDecoration: order.price_off ? "line-through" : "",
              }}
            >
              {priceFormatter(order.price_main)} تومن
            </span>
            {order.price_off ? (
              <span>{priceFormatter(order.price_off)} تومن</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderMetaData;
