import { SingleProduct } from '@/types/product';
import style from './ProductSpecifications.module.scss';
interface Props {
  productData: SingleProduct;
}
const ProductSpecifications: React.FC<Props> = ({ productData }) => {
  return (
    <div className={style.productSpecifications}>
      <table>
        <thead>
          <tr>
            <th>شناسه محصول</th>
            <th>{productData.sku_code}</th>
          </tr>
        </thead>
        <tbody>
          {!!productData.product_type.length && (
            <tr>
              <td>نوع</td>
              <td>
                {productData.product_type.map((e) => (
                  <span key={e.id}>{e.title}</span>
                ))}
              </td>
            </tr>
          )}
          {!!productData.fields.length && (
            <tr>
              <td>رشته</td>
              <td>
                {productData.fields.map((e) => (
                  <span key={e.id}>{e.title}</span>
                ))}
              </td>
            </tr>
          )}
          {!!productData.grades.length && (
            <tr>
              <td>مقطع</td>
              <td>
                {productData.grades.map((e) => (
                  <span key={e.id}>{e.title}</span>
                ))}
              </td>
            </tr>
          )}
          {productData.options.map(({ key, value }) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecifications;
