import style from './ProductTitle.module.scss';
interface Props {
    title: string;
}
const ProductTitle: React.FC<Props> = ({ title }) => {
    return (
        <div className={style.productTitle}>
            <h1>{title}</h1>
        </div>
    );
};

export default ProductTitle;
