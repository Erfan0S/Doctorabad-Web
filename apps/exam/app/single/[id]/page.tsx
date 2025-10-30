import { api } from "@/api/Api";
import ExamHeader from "@/components/common/headers/ExamHeader";
import ExamTimer from "@/components/exam/timer";
import PageTitle from "@/components/singleDetail/PageTitle";
import {
  SharedFilters,
  ExamStatus,
} from "@repo/apps_shared_components/exam/types/filters.ts";
import {
  Questions,
  QuestionsLessonsFilter,
} from "@repo/apps_shared_components";
import { notFound } from "next/navigation";
import React from "react";
import ExamRecord from "@/components/exam/ExamRecord";
import { RoutePath } from "@/constants/routPaths";
import { PreventContext } from "@repo/shared_modules/components";
import { generateSingleExamMetaData } from "@/metadata/singleExam";

export const generateMetadata = generateSingleExamMetaData;

type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

async function SinglePage({ params, searchParams }: Props) {
  try {
    const data = (await api.getExamDetail(Number(params.id))).data;
    const status = (searchParams[SharedFilters.STATUS] ||
      ExamStatus.OBSERVING) as ExamStatus;

    const haveRecord = searchParams[SharedFilters.SHOW_RECORD];

    return (
      <div contextMenu="none">
        <ExamHeader
          title={<PageTitle exam={data.exam} />}
          backUrl={RoutePath.single}
        >
          {status !== ExamStatus.OBSERVING && (
            <ExamTimer totalQuestions={data.data.length} />
          )}
          <QuestionsLessonsFilter lessons={data.lessons} />
        </ExamHeader>
        {!!haveRecord && status === ExamStatus.FINISHED && (
          <ExamRecord
            lessons={data.lessons}
            totalQuestions={data.data.length}
          />
        )}
        <PreventContext />
        <Questions questions={data.data} exam={data.exam} />
      </div>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export default SinglePage;
