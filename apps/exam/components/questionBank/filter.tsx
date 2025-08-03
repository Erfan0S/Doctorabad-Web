"use client";
import React from "react";
import Button from "../common/Button/Button";
import style from "./questionBank.module.scss";
import SelectFilters from "./SelectFilters";
import SearchInput from "@repo/shared_modules/ui/SearchInput/index";
import {Apps, SidePanelPage} from "@repo/core/types/general";
import {OptionSwitch} from "@repo/shared_modules/components";
import {QuesTionFilters} from "@/types/filters";
import {useSearchParams} from "next/navigation";
import {toast} from "react-toastify";
import QuestionSearchInpt from "./QuestionSearchInpt";
import {modalActions} from "@repo/core/modal/modals";
import {ModalTypes} from "@repo/shared_modules/modalsTypes";
import {SidePanelFavoriteTab} from "@repo/core/types/sidePanel";

function QuestionBankFilter() {
  const searchParams = useSearchParams();

  return (
    <div className={`${style.filterContainer} container`}>
      <div className={`card ${style.topButtons}`}>
        <Button
          onClick={() =>
            modalActions.addModal(ModalTypes.SIDE_PANEL, {
              initialPage: SidePanelPage.FAVORITES,
              data: {
                initialTab: SidePanelFavoriteTab.LEARNING_CENTER,
              },
            })
          }
        >
          سوالات مورد علاقه‌من
        </Button>
        <Button disabled>آزمون‌های ساخته شده من</Button>
      </div>
      <div className={`card ${style.filtersWrapper}`}>
        <SelectFilters />
        <QuestionSearchInpt />
        <OptionSwitch
          name={QuesTionFilters.EXPLANATION}
          title="نمایش تشریحی سوالات!"
          app={Apps.EXAM}
          addToQuery
        />
        <OptionSwitch
          name={QuesTionFilters.BUDGETING}
          title="نمایش بودجه‌بندی سوالات!"
          app={Apps.EXAM}
          isActive={!!searchParams?.get(QuesTionFilters.LESSON)}
          onClick={() => {
            !!searchParams?.get(QuesTionFilters.LESSON) ||
              toast.error("حتما درس باید انتخاب شده باشد!");
          }}
          addToQuery
        />
        <OptionSwitch
          name={QuesTionFilters.TIP}
          title="فقط نمایش سوالات تیپ دار!"
          app={Apps.EXAM}
          addToQuery
        />

        <Button className={style.submitBtn} type="submit">
          فیلتر‌کن و نشون‌بده!
        </Button>
      </div>
    </div>
  );
}

export default QuestionBankFilter;
