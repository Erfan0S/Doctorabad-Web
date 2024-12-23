'use client';
import { useCart } from '@/states/cart';
import CartItem from './item';
import style from './Cart.module.scss';
import Link from 'next/link';
import { routePath } from '@/constants/routePath';

const Cart = () => {
  const { data: cartItems, count } = useCart();

  return (
    <div className={style.cart}>
      <div className={style.cartTitle}>
        <span>سبدخرید</span>
        <small>{count} عدد کالا</small>
      </div>
      <div>
        {cartItems.length ? (
          cartItems.map((cartItem) => {
            const cartItemProps = {
              ...cartItem,
            };
            return <CartItem key={cartItem.id} {...cartItemProps} />;
          })
        ) : (
          <Link href={routePath.archive} className={style.cartEmpty}>
            مشاهده محصولات
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
