import React from 'react';
import style from './productsPlaceholder.module.scss';

const ProductPlaceHolder = () => {
  return (
    <div className={style.product}>
      <div className={style.productImage}></div>

      <div className={style.productContent}>
        <div className={style.productContentText}></div>
        <div className={style.productContentPrice}></div>
      </div>

      <div className={style.productButtons}>
        <div className={style.productAddToCart}></div>

        <div className={style.productAddToFavorite}></div>
      </div>
    </div>
  );
};

export default ProductPlaceHolder;
