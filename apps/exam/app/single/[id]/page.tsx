import { api } from "@/api/Api";
import Questions from "@/components/questions";
import { notFound } from "next/navigation";
import React from "react";
import ExamRecord from "@/components/exam/ExamRecord";
import { PreventContext } from "@repo/shared_modules/components";
import { generateSingleExamMetaData } from "@/metadata/singleExam";
import {
  ExamStatus,
  SharedFilters,
} from "@repo/apps_shared_components/exam/types";
import ExamSinglePageHeader from "@/components/singleDetail/ExamSinglePageHeader";

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

    const haveRecord = !!Number(searchParams[SharedFilters.SHOW_RECORD]);

    return (
      <div contextMenu="none">
        <ExamSinglePageHeader
          data={data}
          id={Number(params.id)}
          status={status}
        />
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
