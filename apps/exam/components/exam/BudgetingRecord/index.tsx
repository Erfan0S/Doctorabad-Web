import CircleChartIcon from "@/assets/svg/circleChart";
import { BudgetingType } from "@/types/exam";
import React from "react";
import PercentageBar from "../ExamRecord/PercentageBar";
import style from "./budgeting.module.scss";

type Props = {
  budgets: BudgetingType[];
  total: number;
  title: string;
};

function BudgetingRecord({ budgets, total, title }: Props) {
  return (
    <div className={`${style.budgetingRecordWrapper} card`}>
      <h3>
        <CircleChartIcon /> بودجه بندی سوالات {title}
      </h3>
      <div className={style.percentageBars}>
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
