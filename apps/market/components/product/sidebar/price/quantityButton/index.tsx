import RecycleBin from '@/assets/svg/recycleBin';
import style from './QuantityProductButton.module.scss';
import React, { Dispatch, SetStateAction } from 'react';
import { cartActions } from '@/states/cart';

export interface Props {
  id: number;
  quantity: number;
  cardActionsLoadingHandler: (fn: () => Promise<any>) => () => void;
}
const QuantityProductButton: React.FC<Props> = ({ id, quantity, cardActionsLoadingHandler }) => {
  return (
    <>
      <div className={style.quantityProductButton}>
        <button
          onClick={cardActionsLoadingHandler(() =>
            quantity > 1 ? cartActions.decreaseQuantity(id) : cartActions.removeFromCart(id)
          )}
        >
          {quantity > 1 ? '-' : <RecycleBin height={20} width={20} />}
        </button>
        <span>{quantity}</span>
        <button onClick={cardActionsLoadingHandler(() => cartActions.increaseQuantity(id))}>+</button>
      </div>
    </>
  );
};
export default QuantityProductButton;
