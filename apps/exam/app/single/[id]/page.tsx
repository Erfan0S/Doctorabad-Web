import { api } from "@/api/Api";
import Questions from "@/components/questions";
import QuestionsLessonsFilter from "@/components/questions/questionsLessonsFilter";
import PageTitle from "@/components/singleDetail/PageTitle";
import { SingleLessonFilter } from "@/constants/filters";
import { Apps } from "@repo/core/types/general";
import { PageHeader } from "@repo/shared_modules/headers";
import React from "react";

type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

async function SinglePage({ params, searchParams }: Props) {
  const data = (await api.getExamDetail(Number(params.id))).data;
  const lessonFilter = searchParams[SingleLessonFilter];
  const questions = lessonFilter
    ? data.data.filter((question) => question.lesson == lessonFilter)
    : data.data;

  return (
    <div>
      <PageHeader title={<PageTitle exam={data.exam} />} app={Apps.EXAM}>
        <QuestionsLessonsFilter lessons={data.lessons} />
      </PageHeader>
      <Questions questions={questions} exam={data.exam} />
    </div>
  );
}

export default SinglePage;
