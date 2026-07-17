import starEmpty from '@/assets/img/star-empty.png';
import starFill from '@/assets/img/star-fill.png';
import Image from 'next/image';
import StarFillIcon from '@/assets/svg/newIcons/starFill';
import StarIcon from '@/assets/svg/newIcons/star';

interface Props {
  averageRating: number;
  totalRating: number;
}

const ProductCommentsHeader: React.FC<Props> = ({ averageRating, totalRating }) => {
  const fillWidth = `${(averageRating / 5) * 100}%`;
  return (
    <div className="mb-5 flex items-center">
      <span className="text-[13px] font-medium">
        {averageRating} از ۵ (امتیاز {totalRating} نفر)
      </span>
      <div className="relative ms-auto [&_svg]:h-[25px] [&_svg]:w-[25px]">
        <div className="flex flex-row-reverse items-center">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <StarIcon key={index} />
            ))}
        </div>
        {/* filled overlay clipped to the average rating via inline width */}
        <div
          className="absolute end-0 top-0 flex flex-row-reverse items-center overflow-hidden text-orange"
          style={{ width: fillWidth }}
        >
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
