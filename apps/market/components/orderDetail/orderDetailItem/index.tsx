import Image from 'next/image';
import style from './OrderDetailItem.module.scss';
import Link from 'next/link';
import { priceFormatter } from '@/utils/priceFormatter';
import { calcDiscountPercentage } from '@/utils/calcDiscountPercentage';
import { placeHolderDataUrl } from '@/constants/placeHolderDataUrl';
import { Order } from '@/types/cart';
import { generateSingleProductUrlFromId } from '@/utils/UrlUtils';
import { modalActions } from '@/states/modals';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

const OrderDetailItem = ({
  id,
  price_main,
  price_off,
  product_pic,
  product_title,
  quantity,
  product_id,
}: Order) => {
  const { push } = useRouter();

  const url = generateSingleProductUrlFromId(product_id);
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    modalActions.clearModals();
    push(url);
  };
  return (
    <div className={style.OrderDetailItem}>
      <div className={style.OrderDetailItemImage}>
        <a href={url} onClick={navigate}>
          <Image src={product_pic || placeHolderDataUrl} alt={product_title} width={75} height={75} />
        </a>
      </div>
      <div className={style.OrderDetailItemContent}>
        <div className={style.OrderDetailItemTitle}>
          <a onClick={navigate} href={url}>
            {product_title}
          </a>
        </div>
        <div className={style.OrderDetailItemFooter}>
          <div className={style.OrderDetailItemPrice}>
            {!!price_off && (
              <div className="off-price-wrapper">
                <small>٪{calcDiscountPercentage(price_main, price_off)}</small>
                <span>
                  {priceFormatter(price_main)}
                  <small>تومن</small>
                </span>
              </div>
            )}
            <div>
              {priceFormatter(price_off || price_main)}
              <small>تومن</small>
            </div>
          </div>
          <span className={style.OrderDetailItemFooterQuantity}>x {quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailItem;
