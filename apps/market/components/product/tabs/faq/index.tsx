import { SingleProductFaq } from "@repo/core/types/product";
import style from "./ProductFaq.module.scss";
interface Props {
  faq: SingleProductFaq[];
}
const ProductFaq: React.FC<Props> = ({ faq }) => {
  return (
    <>
      {faq.map(({ id, question, answer }) => (
        <div key={id} className={style.productFaq}>
          <div className={style.productFaqQuestion}>
            <span>سین:</span>
            <p>{question}</p>
          </div>
          <div className={style.productFaqAnswer}>
            <span>جیم:</span>
            <p>{answer}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductFaq;
