import { api } from "@/api/Api";
import PageTitle from "@/components/singleDetail/PageTitle";
import {
  Questions,
  QuestionsLessonsFilter,
} from "@repo/apps_shared_components";
import { Apps } from "@repo/core/types/general";
import { PageHeader } from "@repo/shared_modules/headers";
import React from "react";

type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

async function SinglePage({ params }: Props) {
  const data = (await api.getExamDetail(Number(params.id))).data;

  return (
    <div>
      <PageHeader title={<PageTitle exam={data.exam} />} app={Apps.EXAM}>
        <QuestionsLessonsFilter lessons={data.lessons} />
      </PageHeader>
      <Questions questions={data.data} exam={data.exam} />
    </div>
  );
}

export default SinglePage;
