import Image from 'next/image';
import { learningData } from './learning-data';
import style from './SidePanelOrdersLearning.module.scss';
import Link from 'next/link';
import Basket from '@/assets/svg/basket';
import Clock from '@/assets/svg/clock';
import Dollar from '@/assets/svg/dollar';
import { priceFormatter } from '@/utils/priceFormatter';
import { placeHolderDataUrl } from '@/constants/placeHolderDataUrl';

const SidePanelOrdersLearning: React.FC = () => {
  return (
    <div className={style.sidePanelOrdersLearning}>
      {learningData.map(({ id, image, language, cartId, date, href, price, title }) => (
        <div key={id} className={style.sidePanelOrdersLearningItem}>
          <div className={style.sidePanelOrdersLearningItemImage}>
            <Image src={image || placeHolderDataUrl} alt="OrdersImage" />
          </div>
          <div className={style.sidePanelOrdersLearningItemContent}>
            <div className={style.sidePanelOrdersLearningItemTitle}>
              <span>{title}</span>
            </div>
            <div className={style.sidePanelOrdersLearningItemCart}>
              <span>
                <Basket />
                {cartId}
              </span>
            </div>
            <div className={style.sidePanelOrdersLearningItemFooter}>
              <span>
                <Clock fill="#949494" /> {date}
              </span>
              <span>
                <Dollar stroke="#949494" /> {priceFormatter(price)} تومن
              </span>
              {/* <small>{language}</small> */}
            </div>
          </div>
          <Link href={href} />
        </div>
      ))}
    </div>
  );
};

export default SidePanelOrdersLearning;
