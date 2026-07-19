import { priceFormatter } from "@repo/core/utils/priceFormatter";

type Props = {
  text: number | string;
  className?: string;
};

function ProductSnappayNotif({ text, className }: Props) {
  return (
    <div
      className={`${className} mb-[10px] w-full rounded-[4px] bg-[#afdcf754] px-[10px] py-[3px] text-blue-dark`}
    >
      <span className="inline-block w-full text-center">
        {typeof text === "string"
          ? text
          : `4 قسط${priceFormatter(text / 4)} تومانی بدون کارمزد با اسنپ‌پی!`}
      </span>
    </div>
  );
}

export function ListProductSnappayNotif({ className }: Omit<Props, "text">) {
  return (
    <span
      className={`${className} absolute z-[1] w-fit rounded-[4px] bg-[#afdcf754] px-[5px] py-[2px] text-[11px] text-blue-dark`}
    >
      خرید اقساطی
    </span>
  );
}

export default ProductSnappayNotif;
