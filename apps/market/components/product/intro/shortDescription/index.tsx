import style from './ProductShortDescription.module.scss';
interface Props {
  shortDescription: string;
}
const ProductShortDescription: React.FC<Props> = ({ shortDescription }) => {
  return (
    <div
      className={style.productShortDescription}
      dangerouslySetInnerHTML={{ __html: shortDescription }}
    ></div>
  );
};

export default ProductShortDescription;
