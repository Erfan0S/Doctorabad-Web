const BAR_COLOR = {
  green: "[--percentage-bar-color:#4fcc4c]",
  yellow: "[--percentage-bar-color:#ffcc00]",
  red: "[--percentage-bar-color:#ed3152]",
};

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
    <div className="w-full flex flex-col items-center gap-[10px] my-[10px]">
      <div className="flex flex-row justify-between w-full px-[10px] font-semibold [font-size:small]">
        <span>{title}</span>
        <span>%{percentage}</span>
      </div>
      <div
        className={`w-full h-[10px] border border-solid border-[var(--percentage-bar-color)] rounded-[5px] overflow-hidden bg-[var(--percentage-bar-color)] relative ${!!color ? BAR_COLOR[color] : "[--percentage-bar-color:#a167d0]"}`}
      >
        {/* ponytail: physical left kept — inline style={{ left }} drives the fill */}
        <div
          className="absolute top-0 left-0 h-full w-full bg-white"
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
export default PercentageBar;
