import Questions from "@/components/questions";
import QuestionsFilterButton from "@/components/questions/questionsFilter";
import { Apps } from "@repo/core/types/general";
import { PageHeader } from "@repo/shared_modules/headers";
import React from "react";

function QuestionsPage() {
  return (
    <div>
      <PageHeader
        app={Apps.EXAM}
        title="بانک سوال"
        suffix={<QuestionsFilterButton />}
      />
      <Questions />
    </div>
  );
}

export default QuestionsPage;
