import React from "react";
import SelectFilters from "../common/SelectFilters/SelectFilters";
import style from "./sinlgesList.module.scss";

function SingleFilters() {
  return (
    <div className={style.filtersWrapper}>
      <div className="card">
        <SelectFilters page="exams" isExamList={true} />
      </div>
    </div>
  );
}

export default SingleFilters;
