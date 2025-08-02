import React from "react";
import Button from "../common/Button/Button";
import style from "./questionBank.module.scss";
import SelectFilters from "./SelectFilters";
import SearchInput from "@repo/shared_modules/ui/SearchInput/index";
import {Apps} from "@repo/core/types/general";

function QuestionBankFilter() {
  return (
    <div className={`${style.filterContainer} container`}>
      <div className={`card ${style.topButtons}`}>
        <Button>سوالات مورد علاقه‌من</Button>
        <Button disabled>آزمون‌های ساخته شده من</Button>
      </div>
      <div className={`card ${style.filtersBox}`}>
        <SelectFilters />
        <SearchInput app={Apps.EXAM} />
      </div>
    </div>
  );
}

export default QuestionBankFilter;
