import { api } from "@/api/Api";
import ExamHeader from "@/components/common/headers/ExamHeader";
import ExamTimer from "@/components/exam/timer";
import { Questions } from "@repo/apps_shared_components";
import { notFound } from "next/navigation";
import React from "react";
import {
  SharedFilters,
  ExamStatus,
} from "@repo/apps_shared_components/exam/types/filters.ts";
import ExamRecord from "@/components/exam/ExamRecord";

type Props = {
  searchParams: Record<string, string | undefined>;
};

async function SinglePage({ searchParams }: Props) {
  const {
    [SharedFilters.FIELD]: field,
    [SharedFilters.GRADE]: grade,
    [SharedFilters.LESSON]: lesson,
    [SharedFilters.DATE]: dates,
    [SharedFilters.PLACE]: places,
    [SharedFilters.TOPIC]: topics,
    [SharedFilters.BUDGETING]: budgeting,
    [SharedFilters.TIP]: tipId,
    [SharedFilters.RECORD]: record,
    [SharedFilters.MANUAL_QUESTIONS]: manualQuestions,
    [SharedFilters.MANUAL_TIME]: manualTime,
    ...params
  } = searchParams;

  if (!field) {
    return notFound();
  }

  try {
    const data = (
      await api.getQuestionMaker({
        field: Number(field),
        grade: Number(grade),
        lesson: lesson ? Number(lesson) : undefined,
        places: places?.split(",").map(Number),
        dates: dates?.split(",").map(Number),
        topics: topics?.split(",").map(Number),
        budgeting: budgeting ? Number(budgeting) : undefined,
        // limit: manualQuestions || 200,
        analyse: record ? 1 : undefined,
      })
    ).data;
    const status = (searchParams[SharedFilters.STATUS] ||
      ExamStatus.OBSERVING) as ExamStatus;

    console.log(data);

    return (
      <div>
        <ExamHeader title="آزمون ساز">
          {status !== ExamStatus.OBSERVING && (
            <ExamTimer totalQuestions={data.data.length} />
          )}
          {/* <ExamRecord lessons={data.lessons} /> */}
        </ExamHeader>
        <Questions questions={data.data} />
      </div>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export default SinglePage;
