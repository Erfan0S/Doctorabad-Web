import { SingleProductFaq } from "@repo/core/types/product";
import sanitize from "@repo/core/utils/sanitize";

// question & answer rows share the same layout, only the label differs
const QA_CLASS =
  "flex text-gray [&_span]:me-1 [&_span]:font-medium [&_span]:text-red";

interface Props {
  faq: SingleProductFaq[];
}
const ProductFaq: React.FC<Props> = ({ faq }) => {
  return (
    <>
      {faq.map(({ question, answer }, index) => (
        <div
          key={index}
          className="mb-2 rounded-xl border-2 border-solid border-orange px-3 py-2 text-[13px] last-of-type:mb-0 [&_p]:m-0"
        >
          <div className={QA_CLASS}>
            <span>سوال:</span>
            <div dangerouslySetInnerHTML={{ __html: sanitize(question) }}></div>
          </div>
          <div className={QA_CLASS}>
            <span>پاسخ:</span>
            <div dangerouslySetInnerHTML={{ __html: sanitize(answer) }}></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductFaq;
