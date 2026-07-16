import CircleChartIcon from "@/assets/svg/circleChart";
import { BudgetingType } from "@/types/exam";
import React from "react";
import PercentageBar from "../ExamRecord/PercentageBar";

type Props = {
  budgets: BudgetingType[];
  title: string;
};

function BudgetingRecord({ budgets, title }: Props) {
  const total = budgets.reduce((a, b) => a + b.questions_count, 0);
  return (
    <div className="flex flex-col overflow-hidden w-[95%] mx-auto mb-5 z-[-1] [&_div]:z-[-1] card">
      <h3 className="w-full bg-purple text-white flex items-center px-[15px] py-[10px] gap-[5px] [font-size:larger] font-bold [&_svg]:fill-white [&_svg]:w-[25px] [&_svg]:h-[25px]">
        <CircleChartIcon /> بودجه بندی سوالات {title}
      </h3>
      <div className="flex flex-col px-[30px] py-[10px]">
        {budgets.map((budget) => (
          <PercentageBar
            percentage={((budget.questions_count / total) * 100).toFixed(1)}
            title={budget.title}
            color="green"
            key={budget.id}
          />
        ))}
      </div>
    </div>
  );
}

export default BudgetingRecord;
