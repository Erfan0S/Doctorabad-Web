import style from "./examRecord.module.scss";

const PercentageBar = ({
  percentage,
  title,
  color,
}: {
  percentage: number | string;
  title: string;
  color?: "green" | "red" | "yellow";
}) => {
  return (
    <div className={style.percentageBarWrapper}>
      <div className={style.percentageBarTitle}>
        <span>{title}</span>
        <span>%{percentage}</span>
      </div>
      <div className={`${style.percentageBar} ${!!color ? style[color] : ""}`}>
        <div style={{ left: `${percentage}%` }} />
      </div>
    </div>
  );
};
export default PercentageBar;
