"use client";
import React from "react";
import ExamHeader from "../common/headers/ExamHeader";
import PageTitle from "./PageTitle";
import { RoutePath } from "@/constants/routPaths";
import { FavoriteButton } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { ExamStatus } from "@repo/apps_shared_components/exam/types";
import ExamTimer from "../exam/timer";
import QuestionsLessonsFilter from "../questions/questionsLessonsFilter";
import { QuestionPageType } from "@/types/exam";
import { api } from "@repo/shared_modules/api";

function ExamSinglePageHeader({
  data,
  id,
  status,
}: {
  data: QuestionPageType;
  id: number;
  status: ExamStatus;
}) {
  return (
    <ExamHeader
      title={<PageTitle exam={data.exam} />}
      backUrl={RoutePath.single}
      suffix={
        <FavoriteButton
          action={async (isFavorite) => {
            await api.examSingleExamFavorite(id, !isFavorite);
          }}
          initialState={data.exam.favorite || false}
          app={Apps.EXAM}
        />
      }
    >
      {status !== ExamStatus.OBSERVING && (
        <ExamTimer totalQuestions={data.data.length} />
      )}
      <QuestionsLessonsFilter lessons={data.lessons} />
    </ExamHeader>
  );
}

export default ExamSinglePageHeader;
