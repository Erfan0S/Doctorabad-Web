import StarFillIcon from "@/assets/svg/starFill";
import StarIcon from "@/assets/svg/star";

interface Props {
  averageRating: number;
  totalRating: number;
}

const ProductCommentsHeader: React.FC<Props> = ({
  averageRating,
  totalRating,
}) => {
  const fillWidth = `${(averageRating / 5) * 100}%`;
  return (
    <div className="mb-5 flex items-center">
      <span className="text-[13px] font-medium">
        {averageRating} از ۵ (امتیاز {totalRating} نفر)
      </span>
      <div className="relative ms-auto [&_img]:h-[25px] [&_img]:w-[25px] [&_svg]:h-[25px] [&_svg]:w-[25px]">
        <div className="flex flex-row-reverse items-center">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <StarIcon key={index} />
            ))}
        </div>
        <div
          className="absolute inset-y-0 end-0 flex flex-row-reverse items-center overflow-hidden"
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
