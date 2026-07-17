import sanitize from "@repo/core/utils/sanitize";

interface Props {
  shortDescription: string;
}
const ProductShortDescription: React.FC<Props> = ({ shortDescription }) => {
  return (
    <div
      className="text-justify text-[13px] leading-[25px] [&_p]:mb-0"
      dangerouslySetInnerHTML={{ __html: sanitize(shortDescription) }}
    ></div>
  );
};

export default ProductShortDescription;
