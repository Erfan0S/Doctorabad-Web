import sanitize from "@repo/core/utils/sanitize";

interface Props {
  description: string;
}
const ProductDescription: React.FC<Props> = ({ description }) => {
  return (
    <div
      className="text-justify text-[13px] leading-[25px]"
      dangerouslySetInnerHTML={{ __html: sanitize(description) }}
    ></div>
  );
};

export default ProductDescription;
