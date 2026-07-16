import React from "react";
import SelectFilters from "../common/SelectFilters/SelectFilters";

function SingleFilters() {
  return (
    <div className="pt-[15px] sticky top-[105px] max-[400px]:top-[95px] bg-white w-full z-[100] after:content-[''] after:absolute after:top-0 after:left-0 after:-translate-y-1/2 after:w-full after:h-[10px] after:bg-white [&>div]:px-[15px] [&>div]:py-[10px]">
      <div className="card">
        <SelectFilters page="exams" isExamList={true} />
      </div>
    </div>
  );
}

export default SingleFilters;
