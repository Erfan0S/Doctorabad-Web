interface Props {
    title: string;
}
const ProductTitle: React.FC<Props> = ({ title }) => {
    return (
        <div className="mb-4">
            <h1 className="text-xl max-sm:text-base">{title}</h1>
        </div>
    );
};

export default ProductTitle;
