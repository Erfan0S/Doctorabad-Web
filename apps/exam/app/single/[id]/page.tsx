import { api } from "@/api/Api";
import ExamHeader from "@/components/common/headers/ExamHeader";
import ExamTimer from "@/components/exam/timer";
import { ExamSearchParams, ExamStatus } from "@/types/exam";
import {
  Questions,
  QuestionsLessonsFilter,
} from "@repo/apps_shared_components";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

async function SinglePage({ params, searchParams }: Props) {
  try {
    const data = (await api.getExamDetail(Number(params.id))).data;
    const status = (searchParams[ExamSearchParams.STATUS] ||
      ExamStatus.OBSERVING) as ExamStatus;

    return (
      <div>
        <ExamHeader exam={data.exam}>
          {status !== ExamStatus.OBSERVING && (
            <ExamTimer totalQuestions={data.data.length} />
          )}
          <QuestionsLessonsFilter lessons={data.lessons} />
        </ExamHeader>
        <Questions questions={data.data} exam={data.exam} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}

export default SinglePage;
