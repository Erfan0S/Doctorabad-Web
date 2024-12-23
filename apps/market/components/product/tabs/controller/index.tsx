'use client';
import { useEffect } from 'react';
import { ProductTabData } from '@/types/product';
import style from './ProductTabsController.module.scss';
import { elementStickyEventListener } from '@/utils/elementStickyEventListener';
import Item from './Item';
interface Props {
  tabData: ProductTabData[];
}
const ProductTabsController: React.FC<Props> = ({ tabData }) => {
  useEffect(() => {
    return elementStickyEventListener({
      selector: `.${style.productTabsController}`,
      top: 138,
      callback: (isSticky, el) => {
        el.classList[isSticky ? 'add' : 'remove'](style.sticky);
      },
    });
  }, []);

  return (
    <div className={style.productTabsController}>
      <ul>
        {tabData.map((data) => (
          <Item key={data.id} tabData={data} />
        ))}
      </ul>
    </div>
  );
};

export default ProductTabsController;
