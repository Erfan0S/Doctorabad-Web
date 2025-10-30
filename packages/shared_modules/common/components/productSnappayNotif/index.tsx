import style from "./style.module.scss";

type Props = {
  text: number | string;
  className?: string;
};

function ProductSnappayNotif({ text, className }: Props) {
  return (
    <div className={`${className} ${style.snappayNotif}`}>
      <span>
        {typeof text === "string"
          ? text
          : `4 قسط ${text / 4} تومانی بدون کارمزد با اسنپ‌پی!`}
      </span>
    </div>
  );
}

export function ListProductSnappayNotif({ className }: Omit<Props, "text">) {
  return (
    <span className={`${className} ${style.listSnappayNotif}`}>
      خرید اقساطی
    </span>
  );
}

export default ProductSnappayNotif;
