import starEmpty from '@/assets/img/star-empty.png';
import starFill from '@/assets/img/star-fill.png';
import Image from 'next/image';
import style from './ProductCommentsHeader.module.scss';
import StarFillIcon from '@/assets/svg/newIcons/starFill';
import StarIcon from '@/assets/svg/newIcons/star';

interface Props {
  averageRating: number;
  totalRating: number;
}

const ProductCommentsHeader: React.FC<Props> = ({ averageRating, totalRating }) => {
  const fillWidth = `${(averageRating / 5) * 100}%`;
  return (
    <div className={style.productCommentsHeader}>
      <span>
        {averageRating} از ۵ (امتیاز {totalRating} نفر)
      </span>
      <div className={style.productCommentsHeaderRating}>
        <div>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <StarIcon key={index} />
            ))}
        </div>
        <div style={{ width: fillWidth }}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <StarFillIcon key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCommentsHeader;
